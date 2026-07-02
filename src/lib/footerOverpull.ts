import { animate, type AnimationPlaybackControls, type MotionValue } from 'motion/react';

const OVERPULL_CHARGE_MS = 800;
const OVERPULL_IMPULSE_BUMP_MS = 160;
const OVERPULL_DECAY_RATE = 0.4;
const OVERPULL_STRETCH_RATIO = 0.45;
const OVERPULL_HOLD_RATIO = 0.85;
const OVERPULL_LATCH_STRETCH_RATIO = 0.62;
const OVERPULL_CREEP_MAX_PX = 4;
const OVERPULL_CREEP_SPEED = 0.0045;
const OVERPULL_CREEP_DECAY_SPEED = 0.012;
const OVERPULL_CAP_HOLD_MS = 48;
const OVERPULL_MIN_RELEASE_HOLD_MS = 48;
const OVERPULL_PULL_IDLE_MS = 72;
const OVERPULL_COAST_IDLE_MS = 55;
const OVERPULL_COAST_DELTA_MAX = 6;
const OVERPULL_LATCH_SILENCE_MS = 100;
const OVERPULL_LATCH_MAX_MS = 3500;
const OVERPULL_LAUNCH_SCROLL_START_RATIO = 0.72;
const OVERPULL_LAUNCH_SCROLL_EASE = [0.22, 1, 0.36, 1] as const;
const OVERPULL_LAUNCH_SCROLL_MIN_MS = 1200;
const OVERPULL_LAUNCH_SCROLL_MAX_MS = 1850;

const OVERPULL_LATCH_ENTER_CHARGE_MS = OVERPULL_CHARGE_MS * 0.2;
const OVERPULL_LATCH_RELEASE_CHARGE_MS = OVERPULL_CHARGE_MS * 0.55;
const OVERPULL_PULL_DELTA_MIN = 3;
const OVERPULL_LAUNCH_INTERRUPT_DELTA = 8;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function launchCompressSpring(intensity: number, launchStretch: number) {
  const t = clamp(intensity, 0.35, 1);
  return {
    type: 'spring' as const,
    stiffness: 195 + t * 75,
    damping: 16,
    mass: 0.9,
    bounce: 0.18,
    velocity: -Math.min(launchStretch * 10, 880),
  };
}

function launchScrollDurationMs(intensity: number): number {
  const t = clamp(intensity, 0.35, 1);
  return OVERPULL_LAUNCH_SCROLL_MAX_MS - t * (OVERPULL_LAUNCH_SCROLL_MAX_MS - OVERPULL_LAUNCH_SCROLL_MIN_MS);
}

export type FooterOverpullPullState = {
  rawPull: { current: number };
  velocity: { current: number };
  isPulling: { current: boolean };
  isReleasing: { current: boolean };
};

export type FooterOverpullCallbacks = {
  clearReleaseTimer: () => void;
  scheduleReleaseTimer: (fn: () => void, delayMs: number) => void;
  stopAnimations: () => void;
  resetPullState: () => void;
  springToRest: () => void;
};

export type CreateFooterOverpullOptions = {
  stretchPx: MotionValue<number>;
  maxStretchPx: number;
  stretchFromRawPull: (rawPull: number) => number;
  pull: FooterOverpullPullState;
  callbacks: FooterOverpullCallbacks;
  wakeChargeLoop: () => void;
};

export type FooterOverpull = {
  isLaunching: () => boolean;
  isCharging: () => boolean;
  clearLatch: () => void;
  clearPull: () => void;
  markPull: (delta: number) => void;
  addImpulse: (stretch: number) => void;
  noteWheelDelta: (delta: number) => void;
  noteTouchMove: () => void;
  noteTouchStart: () => void;
  noteTouchEnd: () => void;
  isWheelMomentumCoast: (delta: number, inertiaDelta: number, discrete: boolean) => boolean;
  handleWheelDuringLaunch: (delta: number) => boolean;
  handleTouchEnd: (stretch: number) => 'latched' | 'continue';
  scheduleRelease: (release: () => void, delayMs: number, atCap?: boolean, touch?: boolean) => void;
  tick: (now: number) => void;
  shouldRunChargeLoop: () => boolean;
  stopLaunch: () => void;
  dispose: () => void;
};

export function createFooterOverpull(options: CreateFooterOverpullOptions): FooterOverpull {
  const { stretchPx, maxStretchPx, stretchFromRawPull, pull, callbacks, wakeChargeLoop } = options;
  const stretchThreshold = maxStretchPx * OVERPULL_STRETCH_RATIO;
  const holdThreshold = maxStretchPx * OVERPULL_HOLD_RATIO;
  const latchStretchThreshold = maxStretchPx * OVERPULL_LATCH_STRETCH_RATIO;

  let charge = 0;
  let lastTick = performance.now();
  let launching = false;
  let pulling = false;
  let fingerDown = false;
  let lastPullAt = 0;
  let latched = false;
  let latchedAt = 0;
  let lastWheelAt = 0;
  let lastTouchMoveAt = 0;
  let creepOffset = 0;
  let compressControl: AnimationPlaybackControls | null = null;
  let scrollControl: AnimationPlaybackControls | null = null;

  const clearLatch = () => {
    latched = false;
    latchedAt = 0;
  };

  const clearPull = () => {
    pulling = false;
  };

  const stopLaunch = () => {
    compressControl?.stop();
    compressControl = null;
    scrollControl?.stop();
    scrollControl = null;
    stretchPx.stop();
    launching = false;
    pull.isReleasing.current = false;
    charge = 0;
    creepOffset = 0;
    clearLatch();
    clearPull();
  };

  const tryTriggerLaunch = () => {
    if (charge >= OVERPULL_CHARGE_MS) {
      triggerLaunch();
    }
  };

  const triggerLaunch = () => {
    if (launching) {
      return;
    }

    const launchStretch = Math.max(0, stretchPx.get());
    const baseStretch = stretchFromRawPull(pull.rawPull.current);
    const scrollY = window.scrollY;

    if (scrollY <= 0 || launchStretch <= 0) {
      charge = 0;
      return;
    }

    const stretchIntensity = clamp(launchStretch / maxStretchPx, 0, 1);
    const chargeIntensity = clamp(charge / OVERPULL_CHARGE_MS, 0.35, 1);
    const launchIntensity = clamp(chargeIntensity * 0.65 + stretchIntensity * 0.35, 0.35, 1);

    launching = true;
    charge = 0;
    clearPull();
    clearLatch();
    callbacks.clearReleaseTimer();
    callbacks.stopAnimations();

    stretchPx.set(Math.min(launchStretch, baseStretch));
    callbacks.resetPullState();
    pull.isReleasing.current = true;

    let scrollPhaseStarted = false;

    const finishLaunch = () => {
      stretchPx.set(0);
      pull.isReleasing.current = false;
      launching = false;
      scrollControl = null;
      compressControl = null;
    };

    const tryStartScrollPhase = (stretch: number) => {
      if (scrollPhaseStarted) {
        return;
      }
      const compressProgress = 1 - stretch / launchStretch;
      if (compressProgress < OVERPULL_LAUNCH_SCROLL_START_RATIO) {
        return;
      }
      startScrollPhase();
    };

    const startScrollPhase = () => {
      if (scrollPhaseStarted) {
        return;
      }
      scrollPhaseStarted = true;

      const popStartY = window.scrollY;
      const scrollDurationMs = launchScrollDurationMs(launchIntensity);

      if (popStartY <= 0) {
        finishLaunch();
        return;
      }

      scrollControl = animate(0, 1, {
        type: 'tween',
        ease: OVERPULL_LAUNCH_SCROLL_EASE,
        duration: scrollDurationMs / 1000,
        onUpdate: progress => {
          window.scrollTo(0, Math.max(0, popStartY * (1 - progress)));
        },
        onComplete: () => {
          window.scrollTo(0, 0);
          finishLaunch();
        },
      });
    };

    compressControl = animate(stretchPx, 0, {
      ...launchCompressSpring(launchIntensity, launchStretch),
      onUpdate: latest => {
        stretchPx.set(latest);
        tryStartScrollPhase(latest);
      },
      onComplete: () => {
        stretchPx.set(0);
        tryStartScrollPhase(0);
      },
    });
  };

  const tryEnterLatch = (now: number, stretch: number) => {
    if (latched || stretch < latchStretchThreshold || !pull.isPulling.current) {
      return;
    }

    const msSinceWheel = now - lastWheelAt;
    const msSinceTouch = now - lastTouchMoveAt;
    const wheelSilent = lastWheelAt > 0 && msSinceWheel >= OVERPULL_LATCH_SILENCE_MS;
    const touchSilent = lastTouchMoveAt > 0 && msSinceTouch >= OVERPULL_LATCH_SILENCE_MS;

    if (!wheelSilent && !touchSilent) {
      return;
    }

    latched = true;
    latchedAt = now;
    callbacks.clearReleaseTimer();
    pull.velocity.current = 0;
    wakeChargeLoop();
  };

  const isCharging = () => charge > 0 || latched;

  const shouldRunChargeLoop = () => {
    if (launching || latched || charge > 0) {
      return true;
    }
    return pull.isPulling.current && stretchPx.get() >= stretchThreshold;
  };

  const scheduleRelease = (release: () => void, delayMs: number, atCap = false, touch = false) => {
    if (latched && !atCap) {
      return;
    }

    if (atCap && latched && charge < OVERPULL_LATCH_RELEASE_CHARGE_MS) {
      clearLatch();
    }

    callbacks.clearReleaseTimer();

    if (isCharging() && !atCap) {
      callbacks.scheduleReleaseTimer(() => {
        if (isCharging()) {
          scheduleRelease(release, delayMs, atCap, touch);
          return;
        }
        clearPull();
        release();
      }, OVERPULL_CAP_HOLD_MS);
      return;
    }

    const holdDelay = atCap ? delayMs : Math.max(delayMs, OVERPULL_MIN_RELEASE_HOLD_MS);

    const tryRelease = () => {
      const now = performance.now();
      let msSinceInput: number;
      if (touch) {
        msSinceInput = lastTouchMoveAt > 0 ? now - lastTouchMoveAt : delayMs;
      } else if (lastWheelAt > 0) {
        msSinceInput = now - lastWheelAt;
      } else {
        msSinceInput = OVERPULL_MIN_RELEASE_HOLD_MS;
      }
      const inputIdleMs = touch || atCap ? delayMs : OVERPULL_MIN_RELEASE_HOLD_MS;
      if (msSinceInput < inputIdleMs) {
        callbacks.scheduleReleaseTimer(tryRelease, inputIdleMs - msSinceInput);
        return;
      }
      clearPull();
      release();
    };

    callbacks.scheduleReleaseTimer(tryRelease, holdDelay);
  };

  return {
    isLaunching: () => launching,
    isCharging,
    clearLatch,
    clearPull,
    markPull: (delta: number) => {
      if (delta < OVERPULL_PULL_DELTA_MIN) {
        return;
      }
      pulling = true;
      lastPullAt = performance.now();
      clearLatch();
      wakeChargeLoop();
    },
    addImpulse: (stretch: number) => {
      if (launching) {
        return;
      }
      if (stretch < stretchThreshold) {
        return;
      }
      charge += OVERPULL_IMPULSE_BUMP_MS;
      tryTriggerLaunch();
      wakeChargeLoop();
    },
    noteWheelDelta: (delta: number) => {
      if (delta < -OVERPULL_PULL_DELTA_MIN) {
        clearLatch();
        lastWheelAt = performance.now();
        wakeChargeLoop();
        return;
      }
      if (delta > 0) {
        lastWheelAt = performance.now();
        wakeChargeLoop();
      }
    },
    noteTouchMove: () => {
      fingerDown = true;
      lastTouchMoveAt = performance.now();
      wakeChargeLoop();
    },
    noteTouchStart: () => {
      fingerDown = true;
    },
    noteTouchEnd: () => {
      fingerDown = false;
    },
    isWheelMomentumCoast: (delta: number, inertiaDelta: number, discrete: boolean) => {
      if (discrete || delta <= 0) {
        return false;
      }
      const msSinceIntentionalPull = performance.now() - lastPullAt;
      return msSinceIntentionalPull > OVERPULL_COAST_IDLE_MS && Math.abs(inertiaDelta) < OVERPULL_COAST_DELTA_MAX;
    },
    handleWheelDuringLaunch: (delta: number) => {
      if (!launching) {
        return false;
      }
      if (delta < -OVERPULL_LAUNCH_INTERRUPT_DELTA) {
        stopLaunch();
        callbacks.springToRest();
      }
      return true;
    },
    handleTouchEnd: (stretch: number) => {
      const willLatch = stretch >= stretchThreshold && charge >= OVERPULL_LATCH_ENTER_CHARGE_MS;

      if (willLatch) {
        latched = true;
        latchedAt = performance.now();
        callbacks.clearReleaseTimer();
        wakeChargeLoop();
        return 'latched';
      }
      clearLatch();
      return 'continue';
    },
    scheduleRelease,
    tick: (now: number) => {
      if (launching) {
        return;
      }

      const dt = now - lastTick;
      lastTick = now;
      const stretch = stretchPx.get();
      const isAboveStretchThreshold = stretch >= stretchThreshold;
      const isNearMax = stretch >= holdThreshold;
      const pullRecently = pulling && now - lastPullAt < OVERPULL_PULL_IDLE_MS;
      const touchHolding =
        fingerDown &&
        pull.isPulling.current &&
        lastTouchMoveAt > 0 &&
        now - lastTouchMoveAt >= OVERPULL_LATCH_SILENCE_MS &&
        isAboveStretchThreshold;

      tryEnterLatch(now, stretch);

      if (latched && now - latchedAt > OVERPULL_LATCH_MAX_MS) {
        clearLatch();
        callbacks.springToRest();
        return;
      }

      const isChargingStretch = latched || touchHolding || ((isNearMax || isAboveStretchThreshold) && pullRecently);

      if (isChargingStretch) {
        charge += dt;
        if (stretch >= stretchThreshold) {
          const chargeT = clamp(charge / OVERPULL_CHARGE_MS, 0, 1);
          const easedT = chargeT * chargeT * chargeT;
          const targetCreep = easedT * OVERPULL_CREEP_MAX_PX;
          if (targetCreep > creepOffset) {
            creepOffset = Math.min(targetCreep, creepOffset + OVERPULL_CREEP_SPEED * dt);
          } else {
            creepOffset = Math.max(targetCreep, creepOffset - OVERPULL_CREEP_DECAY_SPEED * dt);
          }
          const base = stretchFromRawPull(pull.rawPull.current);
          const withCreep = base + creepOffset;
          if (withCreep > stretch) {
            stretchPx.set(withCreep);
          }
        }
        tryTriggerLaunch();
      } else {
        creepOffset = Math.max(0, creepOffset - OVERPULL_CREEP_DECAY_SPEED * dt);
        charge = Math.max(0, charge - dt * OVERPULL_DECAY_RATE);
      }

      if (!pullRecently) {
        pulling = false;
      }
    },
    shouldRunChargeLoop,
    stopLaunch,
    dispose: () => {
      stopLaunch();
    },
  };
}
