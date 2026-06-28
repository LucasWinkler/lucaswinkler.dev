import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

import { FooterWordmarkSvg } from '@/components/widgets/FooterWordmarkSvg';

const MAX_STRETCH_PX = 112;
const RESISTANCE = 240;
const WHEEL_RELEASE_MS = 160;
const WHEEL_RELEASE_AT_CAP_MS = 70;
const CAP_RATIO = 0.96;
const STRAIN_GAIN = 0.1;
const MAX_STRAIN_BUMP_PX = 8;
const TOUCH_GAIN = 1.4;
const SPRING = { type: 'spring' as const, stiffness: 420, damping: 32, mass: 0.8 };

function stretchFromRawPull(rawPull: number): number {
  return MAX_STRETCH_PX * (1 - Math.exp(-rawPull / RESISTANCE));
}

function isAtCap(stretch: number): boolean {
  return stretch >= MAX_STRETCH_PX * CAP_RATIO;
}

function stretchWithStrain(baseStretch: number, delta: number): number {
  if (delta <= 0 || !isAtCap(baseStretch)) {
    return baseStretch;
  }

  return baseStretch + Math.min(delta * STRAIN_GAIN, MAX_STRAIN_BUMP_PX);
}

function isAtPageBottom(): boolean {
  return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
}

export function MotionFooterWordmark() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const scaleY = useMotionValue(1);
  const stretchPx = useMotionValue(0);
  const rawPullRef = useRef(0);
  const isPullingRef = useRef(false);
  const isReleasingRef = useRef(false);
  const wheelReleaseTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const applyVisuals = (stretch: number) => {
      const baseHeight = wordmarkRef.current?.offsetHeight ?? 96;
      scaleY.set(1 + stretch / baseHeight);
      stretchPx.set(stretch);
    };

    const stopAnimations = () => {
      scaleY.stop();
      stretchPx.stop();
    };

    const springToRest = () => {
      if (isReleasingRef.current) {
        return;
      }

      window.clearTimeout(wheelReleaseTimerRef.current);
      stopAnimations();

      isPullingRef.current = false;
      rawPullRef.current = 0;
      isReleasingRef.current = true;

      void Promise.all([animate(scaleY, 1, SPRING), animate(stretchPx, 0, SPRING)]).then(() => {
        isReleasingRef.current = false;
      });
    };

    const release = () => {
      const hasStretch = stretchPx.get() > 0.5 || scaleY.get() > 1.005;

      if (!hasStretch && !isPullingRef.current) {
        return;
      }

      const baseStretch = stretchFromRawPull(rawPullRef.current);
      if (isAtCap(baseStretch)) {
        applyVisuals(baseStretch);
      }

      springToRest();
    };

    const scheduleRelease = (stretch: number) => {
      window.clearTimeout(wheelReleaseTimerRef.current);
      const delay = isAtCap(stretch) ? WHEEL_RELEASE_AT_CAP_MS : WHEEL_RELEASE_MS;
      wheelReleaseTimerRef.current = window.setTimeout(release, delay);
    };

    const applyPull = (delta: number) => {
      if (isReleasingRef.current) {
        if (delta <= 0) {
          return;
        }

        isReleasingRef.current = false;
      }

      stopAnimations();

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
      applyVisuals(stretchWithStrain(baseStretch, delta));
    };

    const onWheel = (event: WheelEvent) => {
      if (isReleasingRef.current && event.deltaY <= 0) {
        return;
      }

      const atBottom = isAtPageBottom();
      const canPull = atBottom || isPullingRef.current;

      if (!canPull || (!atBottom && event.deltaY > 0) || event.deltaY === 0) {
        return;
      }

      const stretchBefore = stretchFromRawPull(rawPullRef.current);
      applyPull(event.deltaY);
      scheduleRelease(stretchFromRawPull(rawPullRef.current) || stretchBefore);
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
      release();
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.clearTimeout(wheelReleaseTimerRef.current);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [scaleY, stretchPx, shouldReduceMotion]);

  return (
    <div className='pointer-events-none overflow-visible' aria-hidden='true'>
      <div className='translate-y-[13px] lg:translate-y-10'>
        <motion.div
          ref={wordmarkRef}
          className='relative w-full text-text'
          style={{
            scaleY,
            transformOrigin: 'top center',
          }}>
          <FooterWordmarkSvg />
        </motion.div>
      </div>
      <motion.div className='w-full' style={{ height: stretchPx }} />
    </div>
  );
}
