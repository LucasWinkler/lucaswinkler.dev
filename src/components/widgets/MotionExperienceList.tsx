import { motion, useReducedMotion } from 'motion/react';

import { formatDateRange, sortReverseChronological } from '@/lib/experience';
import { fadeEase, noMotion } from '@/lib/motion';

import type { EducationItem, ExperienceItem } from '@/types/experience';
import type { ReactNode } from 'react';

type MotionExperienceListProps = {
  experience: ExperienceItem[];
  education?: EducationItem[];
};

const eyebrowClass = 'type-eyebrow-label m-0 border-b border-border pb-4 text-text-muted';

type RowProps = {
  index: number;
  left: string;
  leftDatetime?: string;
  title: string;
  subtitle: string;
  detail?: string;
  hasTopBorder: boolean;
  shouldReduceMotion: boolean;
};

function ExperienceRow({
  index,
  left,
  leftDatetime,
  title,
  subtitle,
  detail,
  hasTopBorder,
  shouldReduceMotion,
}: RowProps) {
  const leftContent = leftDatetime ? (
    <time
      dateTime={leftDatetime}
      className='type-caption m-0 w-[min(100%,10.5rem)] shrink-0 text-text-muted tabular-nums'>
      {left}
    </time>
  ) : (
    <span className='type-caption m-0 w-[min(100%,10.5rem)] shrink-0 text-text-muted'>{left}</span>
  );

  return (
    <motion.li
      className={`flex items-baseline justify-between gap-8 py-(--space-row-y) ${hasTopBorder ? 'border-t border-border' : ''}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={shouldReduceMotion ? noMotion : { duration: 0.55, ease: fadeEase, delay: index * 0.08 }}
      style={{ backfaceVisibility: 'hidden' }}>
      {leftContent}
      <div className='min-w-0 flex-1 text-right'>
        <p className='type-list-title m-0 text-text'>{title}</p>
        <p className='type-caption m-0 mt-1 text-text-muted'>{subtitle}</p>
        {detail ? <p className='type-caption m-0 mt-0.5 text-text-muted opacity-80'>{detail}</p> : null}
      </div>
    </motion.li>
  );
}

type SectionProps = {
  label: string;
  isFirst?: boolean;
  children: ReactNode;
};

function ExperienceSection({ label, isFirst = false, children }: SectionProps) {
  return (
    <section className={isFirst ? undefined : 'mt-(--space-section-gap)'}>
      <h3 className={eyebrowClass}>{label}</h3>
      <ul className='m-0 flex list-none flex-col p-0'>{children}</ul>
    </section>
  );
}

export function MotionExperienceList({ experience, education = [] }: MotionExperienceListProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const orderedExperience = sortReverseChronological(experience);
  const hasEducation = education.length > 0;

  return (
    <div className='flex flex-col'>
      <ExperienceSection label='Work' isFirst>
        {orderedExperience.map((item, index) => (
          <ExperienceRow
            key={item.id}
            index={index}
            hasTopBorder={index > 0}
            left={formatDateRange(item.start, item.end)}
            leftDatetime={`${item.start}/${item.end ?? ''}`}
            title={item.company}
            subtitle={item.role}
            detail={item.location}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </ExperienceSection>

      {hasEducation ? (
        <ExperienceSection label='Education'>
          {education.map((item, index) => (
            <ExperienceRow
              key={item.id}
              index={orderedExperience.length + index}
              hasTopBorder={index > 0}
              left={item.location}
              title={item.institution}
              subtitle={item.credential}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </ExperienceSection>
      ) : null}
    </div>
  );
}
