import { motion } from 'motion/react';

import { MotionWorkList } from '@/components/widgets/MotionWorkList/MotionWorkList';
import { springReveal } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

import type { SelectedWorkItem } from '@/types/work';

type MotionSelectedWorkSectionProps = {
  title: string;
  items: SelectedWorkItem[];
};

export function MotionSelectedWorkSection({ title, items }: MotionSelectedWorkSectionProps) {
  const headerReveal = useScrollReveal<HTMLDivElement>({
    y: '0.75rem',
    transition: springReveal,
  });

  return (
    <>
      <motion.div
        ref={headerReveal.ref}
        className='mb-(--space-section-header)'
        initial={headerReveal.initial}
        animate={headerReveal.animate}
        whileInView={headerReveal.whileInView}
        viewport={headerReveal.viewport}
        transition={headerReveal.transition}
        onViewportEnter={headerReveal.onViewportEnter}
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
