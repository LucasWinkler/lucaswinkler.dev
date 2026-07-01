import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';

import { fadeEase } from '@/lib/motion';
import { useMediaQuery } from '@/lib/useMediaQuery';

const WAVE_DURATION = 0.8;
const WAVE_STAGGER = 0.09;
const WEIGHT_REST = 400;
const WEIGHT_PEAK = 700;

type LetterWaveTiming = {
  times: [number, number, number, number];
  ease: [typeof fadeEase, 'linear', typeof fadeEase];
};

function getLetterWaveTiming(index: number, count: number): LetterWaveTiming {
  const center = (count - 1) / 2;
  const maxDistance = Math.max(center, count - 1 - center);
  const distance = Math.abs(index - center);
  const normalizedDistance = maxDistance === 0 ? 0 : distance / maxDistance;
  const holdWidth = 0.22 - normalizedDistance * 0.08;
  const riseEnd = (1 - holdWidth) / 2;
  const holdEnd = riseEnd + holdWidth;

  return {
    times: [0, riseEnd, holdEnd, 1],
    ease: [fadeEase, 'linear', fadeEase],
  };
}

type HeroHeadlineAccentProps = {
  word: string;
};

export function HeroHeadlineAccent({ word }: HeroHeadlineAccentProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [waveActive, setWaveActive] = useState(false);
  const waveRunningRef = useRef(false);
  const letters = [...word];
  const canAnimateWave = canHover && !shouldReduceMotion;
  const lastIndex = letters.length - 1;

  const startWave = () => {
    if (!canAnimateWave || waveRunningRef.current) {
      return;
    }

    waveRunningRef.current = true;
    setWaveActive(true);
  };

  const finishWave = () => {
    waveRunningRef.current = false;
    setWaveActive(false);
  };

  return (
    <span className='type-hero-accent hero-headline-accent' aria-label={word} onMouseEnter={startWave}>
      <span className='hero-headline-accent__sizer' aria-hidden='true'>
        {letters.map((letter, index) => (
          <span key={`sizer-${index}-${letter}`} className='hero-headline-accent__letter'>
            {letter}
          </span>
        ))}
      </span>
      <span className='hero-headline-accent__letters' aria-hidden='true'>
        {letters.map((letter, index) => {
          const waveTiming = getLetterWaveTiming(index, letters.length);

          return (
            <motion.span
              key={`${index}-${letter}`}
              className='hero-headline-accent__letter'
              initial={false}
              animate={{
                fontVariationSettings: waveActive
                  ? [`"wght" ${WEIGHT_REST}`, `"wght" ${WEIGHT_PEAK}`, `"wght" ${WEIGHT_PEAK}`, `"wght" ${WEIGHT_REST}`]
                  : `"wght" ${WEIGHT_REST}`,
              }}
              transition={
                waveActive
                  ? {
                      duration: WAVE_DURATION,
                      delay: index * WAVE_STAGGER,
                      times: waveTiming.times,
                      ease: waveTiming.ease,
                    }
                  : { duration: 0.2, ease: fadeEase }
              }
              onAnimationComplete={() => {
                if (waveActive && index === lastIndex) {
                  finishWave();
                }
              }}>
              {letter}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
