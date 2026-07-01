import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

import { FooterWordmarkSvg } from '@/components/widgets/FooterWordmarkSvg';

const MAX_STRETCH_PX = 112;
const RESISTANCE = 240;
const CAP_RATIO = 0.96;
const TENSION_POWER = 2.5;
const WHEEL_RELEASE_MS = 120;
const CAP_IDLE_MS = 28;
const CAP_INERTIA_DELTA = 4;
const TOUCH_GAIN = 1.4;
const TOUCH_GAIN_COARSE = 2;
const MAX_TOUCH_DELTA = 12;
const STRAIN_GAIN = 0.14;
const MAX_STRAIN_BUMP_PX = 14;
const VELOCITY_ALPHA = 0.38;
const VELOCITY_STRAIN_SCALE = 0.004;
const KINETIC_OVERSHOOT_GAIN = 0.1;
const MAX_KINETIC_OVERSHOOT_PX = 20;
const MAX_WHEEL_DELTA = 26;
const DISCRETE_WHEEL_PULL_PX = 40;
const WHEEL_PULL_GAIN = 1.35;
const WHEEL_LINE_HEIGHT = 16;
const WHEEL_RELEASE_DISCRETE_MS = 240;
const BOTTOM_HYSTERESIS_PX = 24;
const BOTTOM_LATCH_ENTER_COARSE_PX = 80;
const VIEWPORT_SETTLE_MS = 120;
const SPRING = { type: 'spring' as const, stiffness: 480, damping: 34, mass: 0.7, bounce: 0 };
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
    Math.abs(deltaPx) > 40;
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

    const isAtPageBottom = (): boolean => {
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

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      stretchPx.set(Math.min(stretchPx.get(), baseStretch));

      resetPullState();
      isReleasingRef.current = true;

      void animate(stretchPx, 0, SPRING).then(() => {
        isReleasingRef.current = false;
      });
    };

    const springToRest = () => startRelease();
    const releaseFromCap = () => startRelease();

    const scheduleRelease = (stretch: number, discrete = false) => {
      clearReleaseTimer();
      const delay = isAtCap(stretch) ? CAP_IDLE_MS : discrete ? WHEEL_RELEASE_DISCRETE_MS : WHEEL_RELEASE_MS;
      const release = isAtCap(stretch) ? releaseFromCap : springToRest;
      releaseTimerRef.current = setTimeout(release, delay);
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
      stretchPx.set(stretchWithStrain(baseStretch, effectiveDelta, velocityRef.current));
    };

    const onWheel = (event: WheelEvent) => {
      const { delta, discrete, inertiaDelta } = getWheelPullDelta(event);

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

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      const atCap = isAtCap(baseStretch);

      if (isCapInertiaDelta(inertiaDelta, atCap)) {
        if (releaseTimerRef.current !== undefined) {
          clearReleaseTimer();
          releaseFromCap();
        }
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
      if (isPullingRef.current) {
        return;
      }

      clearReleaseTimer();
      stopAnimations();
      isReleasingRef.current = false;
      resetPullState();
      stretchPx.set(0);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
      lastTouchY = touchStartY;
    };

    const onTouchMove = (event: TouchEvent) => {
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
        applyPull(delta, isCoarsePointer);
      }
    };

    const onTouchEnd = () => {
      if (isAtCap(stretchFromRawPull(rawPullRef.current))) {
        releaseFromCap();
        return;
      }

      springToRest();
    };

    const onViewportChange = () => {
      touchStartY = lastTouchY;

      if (!isPullingRef.current) {
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

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    if (isCoarsePointer) {
      window.visualViewport?.addEventListener('resize', onViewportChange);
      window.visualViewport?.addEventListener('scroll', onViewportChange);
    }

    return () => {
      clearReleaseTimer();
      if (viewportSettleTimer !== undefined) {
        clearTimeout(viewportSettleTimer);
      }
      setFooterStretch(0);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
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
