import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

import { MotionWorkList } from '@/components/widgets/MotionWorkList/MotionWorkList';
import { fadeEase, noMotion } from '@/lib/motion';

import type { SelectedWorkItem } from '@/types/work';

type MotionSelectedWorkSectionProps = {
  title: string;
  intro: string;
  items: SelectedWorkItem[];
};

export function MotionSelectedWorkSection({ title, intro, items }: MotionSelectedWorkSectionProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  return (
    <>
      <motion.div
        className='mb-(--space-section-header) flex flex-col gap-4'
        initial={canAnimate && !shouldReduceMotion ? { opacity: 0, y: '0.75rem' } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={shouldReduceMotion ? noMotion : { duration: 0.65, ease: fadeEase }}
        style={{ backfaceVisibility: 'hidden' }}>
        <header className='flex flex-col gap-4'>
          <h2 id='selected-work-heading' className='scroll-anchor type-section-title m-0 max-w-[12ch] text-balance'>
            {title}
          </h2>
          <p className='type-section-lead m-0 max-w-[44ch] text-balance text-text-muted'>{intro}</p>
        </header>
      </motion.div>

      <MotionWorkList items={items} />
    </>
  );
}
