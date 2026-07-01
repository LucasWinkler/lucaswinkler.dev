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
const STRAIN_GAIN = 0.14;
const MAX_STRAIN_BUMP_PX = 14;
const VELOCITY_ALPHA = 0.38;
const VELOCITY_STRAIN_SCALE = 0.004;
const KINETIC_OVERSHOOT_GAIN = 0.1;
const MAX_KINETIC_OVERSHOOT_PX = 20;
const MAX_WHEEL_DELTA = 20;
const DISCRETE_WHEEL_PULL_PX = 34;
const WHEEL_LINE_HEIGHT = 16;
const WHEEL_RELEASE_DISCRETE_MS = 240;
const SPRING = { type: 'spring' as const, stiffness: 480, damping: 34, mass: 0.7, bounce: 0 };
const WHEEL_SMOOTH_SPRING = { type: 'spring' as const, stiffness: 500, damping: 36, mass: 0.55, bounce: 0 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function stretchFromRawPull(rawPull: number): number {
  return MAX_STRETCH_PX * (1 - Math.exp(-rawPull / RESISTANCE));
}

function pullResistanceFactor(stretch: number): number {
  const t = Math.min(Math.max(stretch / MAX_STRETCH_PX, 0), 1);
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

function isAtPageBottom(): boolean {
  return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
}

function isCapInertiaDelta(delta: number, atCap: boolean): boolean {
  return atCap && delta > 0 && delta < CAP_INERTIA_DELTA;
}

function getWheelPullDelta(event: WheelEvent): { delta: number; discrete: boolean } {
  let deltaPx = event.deltaY;
  const discrete = event.deltaMode === WheelEvent.DOM_DELTA_LINE || event.deltaMode === WheelEvent.DOM_DELTA_PAGE;

  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    deltaPx *= WHEEL_LINE_HEIGHT;
  } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    deltaPx *= window.innerHeight;
  }

  return {
    delta: clamp(deltaPx, -MAX_WHEEL_DELTA, MAX_WHEEL_DELTA),
    discrete: discrete || Math.abs(deltaPx) > 40,
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
        rawPullRef.current += DISCRETE_WHEEL_PULL_PX * factor;
      } else if (isPullingRef.current) {
        rawPullRef.current = Math.max(0, rawPullRef.current - DISCRETE_WHEEL_PULL_PX * 0.75);
        if (rawPullRef.current === 0) {
          springToRest();
          return;
        }
      } else {
        return;
      }

      syncStretchToRawPull(true);
    };

    const applyPull = (delta: number) => {
      if (isReleasingRef.current) {
        return;
      }

      if (Math.abs(stretchPx.getVelocity()) > 0.5) {
        stopAnimations();
      }

      velocityRef.current = updateVelocity(velocityRef.current, delta);

      if (delta > 0) {
        isPullingRef.current = true;
        const currentStretch = stretchFromRawPull(rawPullRef.current);
        rawPullRef.current += delta * pullResistanceFactor(currentStretch);
      } else if (isPullingRef.current) {
        velocityRef.current *= 0.5;
        rawPullRef.current = Math.max(0, rawPullRef.current + delta);
        if (rawPullRef.current === 0) {
          springToRest();
          return;
        }
      } else {
        return;
      }

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      stretchPx.set(stretchWithStrain(baseStretch, delta, velocityRef.current));
    };

    const onWheel = (event: WheelEvent) => {
      const { delta, discrete } = getWheelPullDelta(event);

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

      if (isCapInertiaDelta(delta, atCap)) {
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

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isReleasingRef.current) {
        return;
      }

      if (!isAtPageBottom() && !isPullingRef.current) {
        return;
      }

      const touchY = event.touches[0]?.clientY ?? touchStartY;
      const delta = (touchStartY - touchY) * TOUCH_GAIN;
      touchStartY = touchY;

      if (delta !== 0) {
        applyPull(delta);
      }
    };

    const onTouchEnd = () => {
      if (isAtCap(stretchFromRawPull(rawPullRef.current))) {
        releaseFromCap();
        return;
      }

      springToRest();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      clearReleaseTimer();
      setFooterStretch(0);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
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
