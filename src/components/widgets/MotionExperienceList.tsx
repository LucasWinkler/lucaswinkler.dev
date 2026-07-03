import { motion } from 'motion/react';

import { formatDateRangeParts, sortReverseChronological, toIsoDate } from '@/lib/experience';
import { fadeEase, revealItemDuration, revealItemStagger } from '@/lib/motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

import type { EducationItem, ExperienceItem } from '@/types/experience';
import type { ReactNode } from 'react';

type MotionExperienceListProps = {
  experience: ExperienceItem[];
  education?: EducationItem[];
};

const eyebrowClass = 'type-eyebrow-label m-0 border-b border-border pb-4 text-text-muted';

type RowProps = {
  index: number;
  left?: string;
  leftStart?: string;
  leftEnd?: string;
  leftStartDatetime?: string;
  leftEndDatetime?: string;
  title: string;
  subtitle: string;
  detail?: string;
  hasTopBorder: boolean;
};

function ExperienceRow({
  index,
  left,
  leftStart,
  leftEnd,
  leftStartDatetime,
  leftEndDatetime,
  title,
  subtitle,
  detail,
  hasTopBorder,
}: RowProps) {
  const reveal = useScrollReveal<HTMLLIElement>({
    y: '1rem',
    transition: { duration: revealItemDuration, ease: fadeEase, delay: index * revealItemStagger },
  });

  const leftClassName = 'type-caption m-0 max-w-42 shrink-0 whitespace-nowrap text-text-muted tabular-nums';

  const leftContent =
    leftStartDatetime && leftStart && leftEnd ? (
      <span className={leftClassName}>
        <time dateTime={leftStartDatetime}>{leftStart}</time>
        {' – '}
        {leftEndDatetime ? <time dateTime={leftEndDatetime}>{leftEnd}</time> : leftEnd}
      </span>
    ) : left ? (
      <span className='type-caption m-0 max-w-42 shrink-0 text-text-muted'>{left}</span>
    ) : null;

  return (
    <motion.li
      ref={reveal.ref}
      className={`flex items-baseline justify-between gap-10 py-(--space-row-y) ${hasTopBorder ? 'border-t border-border' : ''}`}
      initial={reveal.initial}
      animate={reveal.animate}
      whileInView={reveal.whileInView}
      viewport={reveal.viewport}
      transition={reveal.transition}
      onViewportEnter={reveal.onViewportEnter}
      style={{ backfaceVisibility: 'hidden' }}>
      {leftContent}
      <div className='min-w-0 flex-1 text-right'>
        <p className='type-list-title m-0 text-pretty text-text'>{title}</p>
        <p className='type-caption m-0 mt-1 text-text-muted'>{subtitle}</p>
        {detail ? <p className='type-caption m-0 mt-0.5 text-text-muted'>{detail}</p> : null}
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
  const orderedExperience = sortReverseChronological(experience);
  const hasEducation = education.length > 0;

  return (
    <div className='flex flex-col'>
      <ExperienceSection label='Work' isFirst>
        {orderedExperience.map((item, index) => {
          const { start, end } = formatDateRangeParts(item.start, item.end);

          return (
            <ExperienceRow
              key={item.id}
              index={index}
              hasTopBorder={index > 0}
              leftStart={start}
              leftEnd={end}
              leftStartDatetime={toIsoDate(item.start)}
              leftEndDatetime={item.end ? toIsoDate(item.end) : undefined}
              title={item.company}
              subtitle={item.role}
              detail={item.location}
            />
          );
        })}
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
            />
          ))}
        </ExperienceSection>
      ) : null}
    </div>
  );
}
