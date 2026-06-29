import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

import { FooterWordmarkSvg } from '@/components/widgets/FooterWordmarkSvg';

const MAX_STRETCH_PX = 112;
const RESISTANCE = 240;
const CAP_RATIO = 0.96;
const WHEEL_RELEASE_MS = 160;
const CAP_IDLE_MS = 44;
const CAP_INERTIA_DELTA = 4;
const TOUCH_GAIN = 1.4;
const STRAIN_GAIN = 0.12;
const MAX_STRAIN_BUMP_PX = 10;
const VELOCITY_ALPHA = 0.38;
const VELOCITY_STRAIN_SCALE = 0.004;
const KINETIC_OVERSHOOT_GAIN = 0.09;
const MAX_KINETIC_OVERSHOOT_PX = 16;
const SPRING = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.8, bounce: 0 };
const CAP_RELEASE_SPRING = { type: 'spring' as const, stiffness: 360, damping: 28, mass: 0.85, bounce: 0 };

function stretchFromRawPull(rawPull: number): number {
  return MAX_STRETCH_PX * (1 - Math.exp(-rawPull / RESISTANCE));
}

function isAtCap(stretch: number): boolean {
  return stretch >= MAX_STRETCH_PX * CAP_RATIO;
}

function updateVelocity(current: number, delta: number): number {
  return current * (1 - VELOCITY_ALPHA) + Math.abs(delta) * VELOCITY_ALPHA;
}

function stretchWithStrain(baseStretch: number, delta: number, velocity: number): number {
  if (!isAtCap(baseStretch)) {
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
        window.clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = undefined;
      }
    };

    const resetPullState = () => {
      isPullingRef.current = false;
      rawPullRef.current = 0;
      velocityRef.current = 0;
    };

    const startRelease = (spring: typeof SPRING) => {
      if (isReleasingRef.current) {
        return;
      }

      clearReleaseTimer();
      stopAnimations();
      resetPullState();
      isReleasingRef.current = true;

      void animate(stretchPx, 0, spring).then(() => {
        isReleasingRef.current = false;
      });
    };

    const springToRest = () => startRelease(SPRING);
    const releaseFromCap = () => startRelease(CAP_RELEASE_SPRING);

    const scheduleRelease = (stretch: number) => {
      clearReleaseTimer();
      const delay = isAtCap(stretch) ? CAP_IDLE_MS : WHEEL_RELEASE_MS;
      const release = isAtCap(stretch) ? releaseFromCap : springToRest;
      releaseTimerRef.current = window.setTimeout(release, delay);
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
        rawPullRef.current += delta;
      } else if (isPullingRef.current) {
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
      if (isReleasingRef.current) {
        return;
      }

      const atBottom = isAtPageBottom();
      const canPull = atBottom || isPullingRef.current;

      if (!canPull || (!atBottom && event.deltaY > 0) || event.deltaY === 0) {
        return;
      }

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      const atCap = isAtCap(baseStretch);

      if (isCapInertiaDelta(event.deltaY, atCap)) {
        if (releaseTimerRef.current !== undefined) {
          clearReleaseTimer();
          releaseFromCap();
        }
        return;
      }

      applyPull(event.deltaY);
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
      <div className='w-full text-text' aria-hidden='true'>
        <FooterWordmarkSvg />
      </div>
    );
  }

  return (
    <motion.div
      ref={wordmarkRef}
      className='pointer-events-none w-full text-text'
      style={{
        scaleY,
        transformOrigin: 'bottom center',
      }}
      aria-hidden='true'>
      <FooterWordmarkSvg />
    </motion.div>
  );
}
