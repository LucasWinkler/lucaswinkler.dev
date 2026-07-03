import { motion } from 'motion/react';

import { fadeEase, revealGridDuration, revealGridStagger } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

import type { ApproachItem } from '@/data/approach';

type MotionApproachBridgeProps = {
  items: ApproachItem[];
};

type MotionApproachCardProps = {
  item: ApproachItem;
  index: number;
};

function MotionApproachCard({ item, index }: MotionApproachCardProps) {
  const reveal = useScrollReveal<HTMLDivElement>({
    y: '0.625rem',
    transition: { duration: revealGridDuration, ease: fadeEase, delay: index * revealGridStagger },
  });

  return (
    <motion.div
      ref={reveal.ref}
      className='flex flex-col gap-2'
      initial={reveal.initial}
      animate={reveal.animate}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={reveal.transition}
      onViewportEnter={reveal.onViewportEnter}
      style={{ backfaceVisibility: 'hidden' }}>
      <h3 className='type-eyebrow-label m-0 text-text-muted'>{item.label}</h3>
      <p className='type-ui m-0 text-pretty text-text'>{item.line}</p>
    </motion.div>
  );
}

export function MotionApproachBridge({ items }: MotionApproachBridgeProps) {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10'>
      {items.map((item, index) => (
        <MotionApproachCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
