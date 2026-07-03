import { motion, useReducedMotion } from 'motion/react';

import { fadeEase, noMotion, revealGridDuration, revealGridStagger } from '@/lib/motion';

import type { ApproachItem } from '@/data/approach';

type MotionApproachBridgeProps = {
  items: ApproachItem[];
};

export function MotionApproachBridge({ items }: MotionApproachBridgeProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10'>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className='flex flex-col gap-2'
          initial={shouldReduceMotion ? false : { opacity: 0, y: '0.625rem' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={
            shouldReduceMotion
              ? noMotion
              : { duration: revealGridDuration, ease: fadeEase, delay: index * revealGridStagger }
          }
          style={{ backfaceVisibility: 'hidden' }}>
          <h3 className='type-eyebrow-label m-0 text-text-muted'>{item.label}</h3>
          <p className='type-ui m-0 text-pretty text-text'>{item.line}</p>
        </motion.div>
      ))}
    </div>
  );
}
