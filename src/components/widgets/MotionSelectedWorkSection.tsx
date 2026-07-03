import { motion, useReducedMotion } from 'motion/react';

import { MotionWorkList } from '@/components/widgets/MotionWorkList/MotionWorkList';
import { fadeEase, noMotion, revealSectionDuration } from '@/lib/motion';

import type { SelectedWorkItem } from '@/types/work';

type MotionSelectedWorkSectionProps = {
  title: string;
  items: SelectedWorkItem[];
};

export function MotionSelectedWorkSection({ title, items }: MotionSelectedWorkSectionProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <>
      <motion.div
        className='mb-(--space-section-header)'
        initial={shouldReduceMotion ? false : { opacity: 0, y: '0.75rem' }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={shouldReduceMotion ? noMotion : { duration: revealSectionDuration, ease: fadeEase }}
        style={{ backfaceVisibility: 'hidden' }}>
        <header>
          <h2 id='selected-work-heading' className='scroll-anchor type-section-title m-0 max-w-[12ch] text-balance'>
            {title}
          </h2>
        </header>
      </motion.div>

      <MotionWorkList items={items} />
    </>
  );
}
