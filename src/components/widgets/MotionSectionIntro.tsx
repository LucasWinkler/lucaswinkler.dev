import { motion, useReducedMotion } from 'motion/react';

import type { ReactNode } from 'react';

type MotionSectionIntroProps = {
  children: ReactNode;
};

const fadeEase = [0.23, 1, 0.32, 1] as const;
const noMotion = { duration: 0 };

export function MotionSectionIntro({ children }: MotionSectionIntroProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={shouldReduceMotion ? noMotion : { duration: 0.45, ease: fadeEase }}
      style={{ backfaceVisibility: 'hidden' }}>
      {children}
    </motion.div>
  );
}
