import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

import { FooterWordmarkSvg } from '@/components/widgets/FooterWordmarkSvg';
import { createFooterOverpull } from '@/lib/footerOverpull';

const MAX_STRETCH_PX = 112;
const RESISTANCE = 240;
const CAP_RATIO = 0.96;
const TENSION_POWER = 2.5;
const WHEEL_RELEASE_MS = 56;
const CAP_IDLE_MS = 14;
const CAP_INERTIA_DELTA = 6;
const TOUCH_GAIN = 1.4;
const TOUCH_GAIN_COARSE = 2;
const MAX_TOUCH_DELTA = 12;
const STRAIN_GAIN = 0.09;
const MAX_STRAIN_BUMP_PX = 8;
const VELOCITY_ALPHA = 0.38;
const VELOCITY_STRAIN_SCALE = 0.004;
const KINETIC_OVERSHOOT_GAIN = 0.06;
const MAX_KINETIC_OVERSHOOT_PX = 10;
const MAX_WHEEL_DELTA = 26;
const DISCRETE_WHEEL_PULL_PX = 40;
const WHEEL_PULL_GAIN = 1.35;
const WHEEL_LINE_HEIGHT = 16;
const WHEEL_RELEASE_DISCRETE_MS = 120;
const TOUCH_RELEASE_MS = 36;
const TOUCH_CAP_IDLE_MS = 24;
const BOTTOM_HYSTERESIS_PX = 24;
const BOTTOM_LATCH_ENTER_COARSE_PX = 80;
const OVERSCROLL_LOCK_ARM_PX = 48;
const OVERSCROLL_LOCK_LOOKAHEAD_MS = 120;
const OVERSCROLL_LOCK_VELOCITY_ALPHA = 0.5;
const VIEWPORT_SETTLE_MS = 120;
const MOMENTUM_VELOCITY_PX = 180;
const RELEASE_SPRING = { type: 'spring' as const, stiffness: 480, damping: 34, mass: 0.7, bounce: 0 };
const RELEASE_MOMENTUM_SPRING = { type: 'spring' as const, stiffness: 420, damping: 26, mass: 0.75, bounce: 0.18 };
const WHEEL_SMOOTH_SPRING = { type: 'spring' as const, stiffness: 500, damping: 36, mass: 0.55, bounce: 0 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getScrollBottom(): number {
  const vv = window.visualViewport;
  if (vv) {
    return window.scrollY + vv.height + vv.offsetTop;
  }
  return window.scrollY + window.innerHeight;
}

function getRemainingScroll(): number {
  return document.documentElement.scrollHeight - getScrollBottom();
}

function stretchFromRawPull(rawPull: number): number {
  return MAX_STRETCH_PX * (1 - Math.exp(-rawPull / RESISTANCE));
}

function pullResistanceFactor(stretch: number): number {
  const t = clamp(stretch / MAX_STRETCH_PX, 0, 1);
  return (1 - t) ** TENSION_POWER;
}

function isAtCap(stretch: number): boolean {
  return stretch >= MAX_STRETCH_PX * CAP_RATIO;
}

function updateVelocity(current: number, delta: number): number {
  return current * (1 - VELOCITY_ALPHA * 1.4) + Math.abs(delta) * VELOCITY_ALPHA;
}

function stretchWithStrain(baseStretch: number, delta: number, velocity: number): number {
  if (!isAtCap(baseStretch)) {
    return baseStretch;
  }

  if (delta <= 0) {
    return baseStretch;
  }

  const velocityBoost = 1 + Math.min(velocity * VELOCITY_STRAIN_SCALE, 1.4);
  const impulseStrain =
    delta > 0 ? Math.min(delta * STRAIN_GAIN * velocityBoost, MAX_STRAIN_BUMP_PX * velocityBoost) : 0;
  const kineticOvershoot = Math.min(velocity * KINETIC_OVERSHOOT_GAIN, MAX_KINETIC_OVERSHOOT_PX);

  return baseStretch + impulseStrain + kineticOvershoot;
}

function isCapInertiaDelta(delta: number, atCap: boolean): boolean {
  return atCap && delta > 0 && delta < CAP_INERTIA_DELTA;
}

function getWheelPullDelta(event: WheelEvent): { delta: number; discrete: boolean; inertiaDelta: number } {
  let deltaPx = event.deltaY;

  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    deltaPx *= WHEEL_LINE_HEIGHT;
  } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    deltaPx *= window.innerHeight;
  }

  const discrete =
    event.deltaMode === WheelEvent.DOM_DELTA_LINE ||
    event.deltaMode === WheelEvent.DOM_DELTA_PAGE ||
    (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL && Math.abs(deltaPx) > 80);
  const normalized = clamp(deltaPx, -MAX_WHEEL_DELTA, MAX_WHEEL_DELTA);

  return {
    delta: discrete ? normalized : normalized * WHEEL_PULL_GAIN,
    discrete,
    inertiaDelta: normalized,
  };
}

function setFooterStretch(stretch: number) {
  document.documentElement.style.setProperty('--footer-stretch', `${stretch}px`);
}

export function MotionFooterWordmark() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const baseHeightRef = useRef(93.65);
  const stretchPx = useMotionValue(0);
  const scaleY = useTransform(stretchPx, stretch => 1 + stretch / baseHeightRef.current);
  const rawPullRef = useRef(0);
  const velocityRef = useRef(0);
  const isPullingRef = useRef(false);
  const isReleasingRef = useRef(false);
  const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useMotionValueEvent(stretchPx, 'change', latest => {
    setFooterStretch(latest);
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (wordmarkRef.current) {
      baseHeightRef.current = wordmarkRef.current.offsetHeight;
    }

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let atBottomLatched = false;
    let overpullRafId = 0;
    let overscrollLocked = false;
    let overscrollArmed = false;
    let overscrollLockVelocity = 0;
    let lastOverscrollSampleY: number | undefined;
    let lastOverscrollSampleTime = 0;

    // Native overscroll bounce fights the hand-rolled stretch below, so it's only
    // suppressed while we're at the footer and re-enabled everywhere else (e.g. page top).
    // Armed well before the exact bottom (not just once atBottom is true): passive wheel/touch
    // listeners let the browser scroll immediately while this style mutation still has to clear
    // a style-recalc + compositor round trip, so a fast trackpad burst can outrun a lock that
    // only engages exactly at the edge.
    const setOverscrollLock = (locked: boolean) => {
      if (locked === overscrollLocked) {
        return;
      }
      overscrollLocked = locked;
      document.documentElement.style.overscrollBehaviorY = locked ? 'none' : '';
    };

    const syncOverscrollLock = () => {
      const now = performance.now();
      const currentY = window.scrollY;

      if (lastOverscrollSampleY !== undefined) {
        const dt = now - lastOverscrollSampleTime;
        if (dt > 0) {
          const instantVelocity = Math.abs(currentY - lastOverscrollSampleY) / dt;
          overscrollLockVelocity =
            overscrollLockVelocity * (1 - OVERSCROLL_LOCK_VELOCITY_ALPHA) +
            instantVelocity * OVERSCROLL_LOCK_VELOCITY_ALPHA;
        }
      }
      lastOverscrollSampleY = currentY;
      lastOverscrollSampleTime = now;

      // A fast fling covers more ground per frame than a slow one, so the "how far ahead do we
      // need to arm" distance scales with current speed instead of staying a fixed pixel count.
      const armDistance = Math.max(OVERSCROLL_LOCK_ARM_PX, overscrollLockVelocity * OVERSCROLL_LOCK_LOOKAHEAD_MS);
      const disarmDistance = armDistance + BOTTOM_HYSTERESIS_PX;

      const remaining = getRemainingScroll();
      if (remaining <= armDistance) {
        overscrollArmed = true;
      } else if (remaining > disarmDistance) {
        overscrollArmed = false;
      }
      setOverscrollLock(overscrollArmed);
    };

    const isAtPageBottom = (): boolean => {
      syncOverscrollLock();

      if (!isCoarsePointer) {
        return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      }

      const remaining = getRemainingScroll();
      if (remaining <= BOTTOM_LATCH_ENTER_COARSE_PX) {
        atBottomLatched = true;
      } else if (remaining > BOTTOM_LATCH_ENTER_COARSE_PX + BOTTOM_HYSTERESIS_PX) {
        atBottomLatched = false;
      }
      return atBottomLatched;
    };

    const stopAnimations = () => {
      stretchPx.stop();
    };

    const clearReleaseTimer = () => {
      if (releaseTimerRef.current !== undefined) {
        clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = undefined;
      }
    };

    const scheduleReleaseTimer = (fn: () => void, delayMs: number) => {
      releaseTimerRef.current = setTimeout(fn, delayMs);
    };

    const resetPullState = () => {
      isPullingRef.current = false;
      rawPullRef.current = 0;
      velocityRef.current = 0;
    };

    const startRelease = () => {
      if (isReleasingRef.current) {
        return;
      }

      clearReleaseTimer();
      stopAnimations();
      overpull.clearLatch();

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      const releaseVelocity = stretchPx.getVelocity();
      const gestureVelocity = velocityRef.current;
      stretchPx.set(Math.min(stretchPx.get(), baseStretch));

      resetPullState();
      isReleasingRef.current = true;
      overpull.clearPull();

      const hasMomentum = Math.abs(releaseVelocity) > MOMENTUM_VELOCITY_PX || gestureVelocity > MOMENTUM_VELOCITY_PX;
      const spring = hasMomentum ? RELEASE_MOMENTUM_SPRING : RELEASE_SPRING;

      void animate(stretchPx, 0, {
        ...spring,
        velocity: releaseVelocity,
      }).then(() => {
        isReleasingRef.current = false;
      });
    };

    const springToRest = () => startRelease();
    const releaseFromCap = () => startRelease();

    const wakeOverpullChargeLoop = () => {
      if (overpullRafId !== 0) {
        return;
      }
      overpullRafId = requestAnimationFrame(runOverpullChargeLoop);
    };

    const runOverpullChargeLoop = (now: number) => {
      overpullRafId = 0;
      overpull.tick(now);
      if (overpull.shouldRunChargeLoop()) {
        overpullRafId = requestAnimationFrame(runOverpullChargeLoop);
      }
    };

    const overpull = createFooterOverpull({
      stretchPx,
      maxStretchPx: MAX_STRETCH_PX,
      stretchFromRawPull,
      pull: {
        rawPull: rawPullRef,
        velocity: velocityRef,
        isPulling: isPullingRef,
        isReleasing: isReleasingRef,
      },
      callbacks: {
        clearReleaseTimer,
        scheduleReleaseTimer,
        stopAnimations,
        resetPullState,
        springToRest,
      },
      wakeChargeLoop: wakeOverpullChargeLoop,
    });

    const scheduleRelease = (stretch: number, discrete = false, touch = false) => {
      const atCap = isAtCap(stretch);
      let delay: number;
      if (touch) {
        delay = atCap ? TOUCH_CAP_IDLE_MS : TOUCH_RELEASE_MS;
      } else if (atCap) {
        delay = CAP_IDLE_MS;
      } else if (discrete) {
        delay = WHEEL_RELEASE_DISCRETE_MS;
      } else {
        delay = WHEEL_RELEASE_MS;
      }
      overpull.scheduleRelease(atCap ? releaseFromCap : springToRest, delay, atCap, touch, discrete);
    };

    const syncStretchToRawPull = (smooth: boolean) => {
      const target = stretchFromRawPull(rawPullRef.current);
      if (smooth) {
        stopAnimations();
        void animate(stretchPx, target, WHEEL_SMOOTH_SPRING);
        return;
      }
      stretchPx.set(target);
    };

    const applyDiscreteWheelPull = (direction: 1 | -1) => {
      if (isReleasingRef.current) {
        return;
      }

      if (direction > 0) {
        isPullingRef.current = true;
        overpull.markPull(DISCRETE_WHEEL_PULL_PX);
        const factor = pullResistanceFactor(stretchFromRawPull(rawPullRef.current));
        rawPullRef.current += DISCRETE_WHEEL_PULL_PX * WHEEL_PULL_GAIN * factor;
      } else if (isPullingRef.current) {
        rawPullRef.current = Math.max(0, rawPullRef.current - DISCRETE_WHEEL_PULL_PX * WHEEL_PULL_GAIN * 0.75);
        if (rawPullRef.current === 0) {
          springToRest();
          return;
        }
      } else {
        return;
      }

      syncStretchToRawPull(true);
    };

    const applyPull = (delta: number, capDelta = false) => {
      if (isReleasingRef.current) {
        return;
      }

      const effectiveDelta = capDelta ? clamp(delta, -MAX_TOUCH_DELTA, MAX_TOUCH_DELTA) : delta;

      if (Math.abs(stretchPx.getVelocity()) > 0.5) {
        stopAnimations();
      }

      velocityRef.current = updateVelocity(velocityRef.current, effectiveDelta);

      if (effectiveDelta > 0) {
        isPullingRef.current = true;
        overpull.markPull(Math.abs(effectiveDelta));
        const currentStretch = stretchFromRawPull(rawPullRef.current);
        rawPullRef.current += effectiveDelta * pullResistanceFactor(currentStretch);
      } else if (isPullingRef.current) {
        velocityRef.current *= 0.5;
        rawPullRef.current = Math.max(0, rawPullRef.current + effectiveDelta);
        if (rawPullRef.current === 0) {
          springToRest();
          return;
        }
      } else {
        return;
      }

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      const nextStretch = stretchWithStrain(baseStretch, effectiveDelta, velocityRef.current);
      stretchPx.set(nextStretch);
    };

    const onWheel = (event: WheelEvent) => {
      const { delta, discrete, inertiaDelta } = getWheelPullDelta(event);

      if (overpull.handleWheelDuringLaunch(delta)) {
        return;
      }

      if (isReleasingRef.current) {
        if (delta < 0 && stretchPx.get() > 0) {
          isReleasingRef.current = false;
          stopAnimations();
          clearReleaseTimer();
        } else {
          return;
        }
      }

      const atBottom = isAtPageBottom();
      const canPull = atBottom || isPullingRef.current;

      if (!canPull || (!atBottom && delta > 0) || delta === 0) {
        return;
      }

      overpull.noteWheelDelta(delta);

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      const atCap = isAtCap(baseStretch);

      if (overpull.isWheelMomentumCoast(delta, inertiaDelta, discrete)) {
        velocityRef.current *= 0.4;
        if (atCap) {
          scheduleRelease(baseStretch);
        }
        return;
      }

      if (isCapInertiaDelta(inertiaDelta, atCap) && !isPullingRef.current) {
        scheduleRelease(baseStretch);
        return;
      }

      if (discrete) {
        applyDiscreteWheelPull(delta > 0 ? 1 : -1);
        scheduleRelease(stretchFromRawPull(rawPullRef.current), true);
        return;
      }

      applyPull(delta);
      scheduleRelease(stretchFromRawPull(rawPullRef.current) || baseStretch);
    };

    let touchStartY = 0;
    let lastTouchY = 0;
    let ignorePullUntil = 0;
    let viewportSettleTimer: ReturnType<typeof setTimeout> | undefined;

    const clearStretchFromViewportChange = () => {
      if (isPullingRef.current || overpull.isLaunching()) {
        return;
      }

      if (overpullRafId !== 0) {
        cancelAnimationFrame(overpullRafId);
        overpullRafId = 0;
      }
      overpull.stopLaunch();
      clearReleaseTimer();
      stopAnimations();
      isReleasingRef.current = false;
      resetPullState();
      stretchPx.set(0);
    };

    const onTouchStart = (event: TouchEvent) => {
      overpull.noteTouchStart();
      touchStartY = event.touches[0]?.clientY ?? 0;
      lastTouchY = touchStartY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (overpull.isLaunching()) {
        return;
      }

      if (isReleasingRef.current || (isCoarsePointer && performance.now() < ignorePullUntil)) {
        return;
      }

      if (!isAtPageBottom() && !isPullingRef.current) {
        return;
      }

      const touchY = event.touches[0]?.clientY ?? touchStartY;
      const touchGain = isCoarsePointer ? TOUCH_GAIN_COARSE : TOUCH_GAIN;
      const delta = (touchStartY - touchY) * touchGain;
      lastTouchY = touchY;
      touchStartY = touchY;

      if (delta !== 0) {
        overpull.noteTouchMove();
        applyPull(delta, isCoarsePointer);
      }
    };

    const finishTouch = () => {
      overpull.noteTouchEnd();
      const stretch = stretchFromRawPull(rawPullRef.current);
      const touchEndResult = overpull.handleTouchEnd(stretch);

      if (touchEndResult === 'latched') {
        return;
      }

      scheduleRelease(stretch, false, true);
    };

    const onTouchEnd = () => finishTouch();
    const onTouchCancel = () => finishTouch();

    const onViewportChange = () => {
      touchStartY = lastTouchY;

      if (!isPullingRef.current && !overpull.isLaunching()) {
        ignorePullUntil = performance.now() + VIEWPORT_SETTLE_MS;
        clearStretchFromViewportChange();
      }

      if (viewportSettleTimer !== undefined) {
        clearTimeout(viewportSettleTimer);
      }
      viewportSettleTimer = setTimeout(() => {
        viewportSettleTimer = undefined;
        isAtPageBottom();
      }, VIEWPORT_SETTLE_MS);
    };

    const onScroll = () => {
      isAtPageBottom();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchCancel, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    if (isCoarsePointer) {
      window.visualViewport?.addEventListener('resize', onViewportChange);
      window.visualViewport?.addEventListener('scroll', onViewportChange);
    }

    isAtPageBottom();

    return () => {
      if (overpullRafId !== 0) {
        cancelAnimationFrame(overpullRafId);
      }
      clearReleaseTimer();
      overpull.dispose();
      if (viewportSettleTimer !== undefined) {
        clearTimeout(viewportSettleTimer);
      }
      setFooterStretch(0);
      setOverscrollLock(false);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchCancel);
      window.removeEventListener('scroll', onScroll);
      if (isCoarsePointer) {
        window.visualViewport?.removeEventListener('resize', onViewportChange);
        window.visualViewport?.removeEventListener('scroll', onViewportChange);
      }
    };
  }, [stretchPx, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className='w-full select-none text-text' aria-hidden='true'>
        <FooterWordmarkSvg />
      </div>
    );
  }

  return (
    <motion.div
      ref={wordmarkRef}
      className='pointer-events-none w-full select-none text-text'
      style={{
        scaleY,
        transformOrigin: 'bottom center',
      }}
      aria-hidden='true'>
      <FooterWordmarkSvg />
    </motion.div>
  );
}
