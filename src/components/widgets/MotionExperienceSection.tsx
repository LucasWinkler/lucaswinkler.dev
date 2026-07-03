import { motion } from 'motion/react';

import { MotionExperienceList } from '@/components/widgets/MotionExperienceList';
import { fadeEase, revealSectionDuration } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

import type { EducationItem, ExperienceItem } from '@/types/experience';

type MotionExperienceSectionProps = {
  title: string;
  experience: ExperienceItem[];
  education?: EducationItem[];
};

export function MotionExperienceSection({ title, experience, education }: MotionExperienceSectionProps) {
  const headerReveal = useScrollReveal<HTMLDivElement>({
    y: '0.75rem',
    transition: { duration: revealSectionDuration, ease: fadeEase },
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
          <h2 id='experience-heading' className='scroll-anchor type-section-title m-0 text-balance'>
            {title}
          </h2>
        </header>
      </motion.div>

      <MotionExperienceList experience={experience} education={education} />
    </>
  );
}
