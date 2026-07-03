import { motion, useReducedMotion } from 'motion/react';

import { MotionExperienceList } from '@/components/widgets/MotionExperienceList';
import { fadeEase, noMotion, revealSectionDuration } from '@/lib/motion';

import type { EducationItem, ExperienceItem } from '@/types/experience';

type MotionExperienceSectionProps = {
  title: string;
  experience: ExperienceItem[];
  education?: EducationItem[];
};

export function MotionExperienceSection({ title, experience, education }: MotionExperienceSectionProps) {
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
          <h2 id='experience-heading' className='scroll-anchor type-section-title m-0 text-balance'>
            {title}
          </h2>
        </header>
      </motion.div>

      <MotionExperienceList experience={experience} education={education} />
    </>
  );
}
