import { motion, useReducedMotion } from 'motion/react';

import { fadeEase, noMotion } from '@/lib/motion';

import type { ReactNode } from 'react';

type MotionSectionIntroProps = {
  children: ReactNode;
};

export function MotionSectionIntro({ children }: MotionSectionIntroProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={shouldReduceMotion ? noMotion : { duration: 0.65, ease: fadeEase }}
      style={{ backfaceVisibility: 'hidden' }}>
      {children}
    </motion.div>
  );
}
