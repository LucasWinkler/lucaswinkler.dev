import { motion, useReducedMotion } from 'motion/react';
import {
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';
import type { SelectedWorkItem } from '@/types/work';

type MotionWorkListProps = {
  items: SelectedWorkItem[];
};

type WorkPanelProps = {
  item: SelectedWorkItem;
  flexGrow: number;
  isActive: boolean;
  isHovered: boolean;
  shouldReduceMotion: boolean;
  onActivate: () => void;
  onPointerEnter: (event: PointerEvent<HTMLElement>) => void;
};

const fadeEase = [0.23, 1, 0.32, 1] as const;
const panelTransition = { duration: 0.4, ease: fadeEase };
const overlayTransition = { duration: 0.28, ease: fadeEase, delay: 0.05 };
const mediaTransition = { duration: 0.35, ease: fadeEase };
const noMotion = { duration: 0 };
const selectedPeak = 3;
const activeShare = 0.5;
const hoverBoost = 1.14;
const distanceDecay = 0.58;
const minWeight = 0.32;

const panelClass =
  'relative min-w-0 overflow-hidden rounded-(--radius-panel) shadow-(--shadow-panel) max-[640px]:flex-[0_0_min(72vw,18rem)] max-[640px]:snap-start';

const listClass =
  '@container flex h-[clamp(18rem,52vh,34rem)] w-full gap-2 max-[900px]:h-[clamp(16rem,44vh,22rem)] max-[640px]:snap-x max-[640px]:snap-mandatory max-[640px]:overflow-x-auto max-[640px]:[-webkit-overflow-scrolling:touch] max-[640px]:[scrollbar-width:none] max-[640px]:[&::-webkit-scrollbar]:hidden';

function getPanelFlexWeights(
  activeIndex: number,
  hoveredIndex: number,
  itemCount: number,
): number[] {
  let inactiveSum = 0;
  const rawInactive = Array.from({ length: itemCount }, () => 0);

  for (let index = 0; index < itemCount; index += 1) {
    if (index === activeIndex) {
      continue;
    }

    const distance = Math.abs(index - activeIndex);
    let weight = Math.max(minWeight, selectedPeak * distanceDecay ** distance);

    if (hoveredIndex >= 0 && index === hoveredIndex) {
      weight *= hoverBoost;
    }

    rawInactive[index] = weight;
    inactiveSum += weight;
  }

  if (inactiveSum === 0) {
    return Array.from({ length: itemCount }, (_, index) =>
      index === activeIndex ? 1 : 0,
    );
  }

  const inactiveScale =
    (selectedPeak * (1 - activeShare)) / (activeShare * inactiveSum);

  return Array.from({ length: itemCount }, (_, index) => {
    if (index === activeIndex) {
      return selectedPeak;
    }

    return rawInactive[index] * inactiveScale;
  });
}

function getMediaScale(isActive: boolean, isHovered: boolean): number {
  if (isActive) {
    return 1.045;
  }

  if (isHovered) {
    return 1.025;
  }

  return 1;
}

function WorkPanel({
  item,
  flexGrow,
  isActive,
  isHovered,
  shouldReduceMotion,
  onActivate,
  onPointerEnter,
}: WorkPanelProps) {
  const mediaScale = getMediaScale(isActive, isHovered);
  const panelTransitionValue = shouldReduceMotion ? noMotion : panelTransition;
  const overlayTransitionValue = shouldReduceMotion ? noMotion : overlayTransition;
  const mediaTransitionValue = shouldReduceMotion ? noMotion : mediaTransition;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        flexGrow,
        opacity: isActive ? 1 : 0.76,
      }}
      transition={panelTransitionValue}
      style={{ flexShrink: 1, flexBasis: 0 }}
      onPointerEnter={onPointerEnter}
      onClick={isActive ? undefined : onActivate}
      onKeyDown={isActive ? undefined : handleKeyDown}
      role={isActive ? 'region' : 'button'}
      tabIndex={isActive ? undefined : 0}
      aria-expanded={isActive}
      aria-labelledby={isActive ? `work-${item.id}-title` : undefined}
      aria-label={isActive ? undefined : `Show ${item.brand} details`}
      className={`${panelClass} outline-none focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)] ${isActive ? 'cursor-default select-text' : 'cursor-pointer'}`}>
      <div className='relative h-full w-full overflow-hidden'>
        <motion.div
          className='pointer-events-none absolute inset-0 origin-center'
          initial={false}
          animate={{ scale: mediaScale }}
          transition={mediaTransitionValue}
          aria-hidden='true'>
          <div
            className='absolute -inset-[5%] bg-cover bg-center'
            style={{
              backgroundImage: `linear-gradient(145deg, ${item.posterFrom} 0%, ${item.posterTo} 100%)`,
            }}
          />

          {item.image ? (
            <img
              className='absolute -inset-[5%] h-[110%] w-[110%] max-w-none object-cover outline -outline-offset-1 outline-black/10'
              src={item.image}
              alt=''
              loading='lazy'
              decoding='async'
              onError={event => {
                event.currentTarget.style.display = 'none';
              }}
            />
          ) : null}
        </motion.div>

        <div
          className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/6 via-transparent to-black/28'
          aria-hidden='true'
        />

        <div
          className='texture-noise-overlay absolute inset-0 z-[1]'
          aria-hidden='true'
        />

        <motion.div
          className={`absolute inset-0 z-2 flex flex-col justify-between p-4 max-[640px]:p-3.5 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={overlayTransitionValue}
          aria-hidden={!isActive}
          inert={!isActive}>
          <div
            className='pointer-events-none absolute inset-x-0 top-0 h-[58%] bg-linear-to-b from-black/72 via-black/28 to-transparent'
            aria-hidden='true'
          />
          <div
            className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/68 to-transparent'
            aria-hidden='true'
          />

          <div className='relative z-1 flex min-w-0 flex-col'>
            <div className='flex max-w-[24ch] flex-col gap-1.5'>
              <h3
                id={`work-${item.id}-title`}
                className='type-display m-0 text-[clamp(1.125rem,2.4vw,1.625rem)] leading-[1.08] font-medium tracking-[-0.025em] text-balance text-white'>
                {item.brand}
              </h3>
              <a
                className='type-ui relative w-fit max-w-full truncate text-[0.8125rem] text-white/88 underline-offset-2 no-underline transition-[color,text-decoration-color] duration-150 ease-out after:absolute after:inset-[-0.625rem] after:content-[""] hover:text-white hover:underline'
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                tabIndex={isActive ? undefined : -1}>
                {item.domain}
              </a>
            </div>
            <div className='mt-2.5 w-[min(48ch,100%)] pt-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] min-[901px]:w-[min(48ch,calc(50cqw-2rem))]'>
              <p className='type-ui m-0 text-[0.8125rem] leading-[1.5] text-white/78 text-pretty'>
                {item.description}
              </p>
            </div>
          </div>

          <ul
            className='relative z-1 m-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0'
            aria-label={`${item.brand} tech stack`}>
            {item.tech.map(stack => (
              <li
                key={stack}
                className="type-ui text-[0.625rem] font-medium tracking-[0.06em] text-white/72 uppercase not-last:after:ms-2 not-last:after:font-normal not-last:after:text-white/40 not-last:after:content-['·']">
                {stack}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function MotionWorkList({ items }: MotionWorkListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(
    () => items[0]?.id ?? null,
  );
  const shouldReduceMotion = useReducedMotion();

  const activeIndex = Math.max(
    0,
    items.findIndex(item => item.id === activeId),
  );
  const hoveredIndex = hoveredId
    ? items.findIndex(item => item.id === hoveredId)
    : -1;

  const flexWeights = getPanelFlexWeights(
    activeIndex,
    hoveredIndex,
    items.length,
  );

  return (
    <div className={listClass} onMouseLeave={() => setHoveredId(null)}>
      {items.map((item, index) => (
        <WorkPanel
          key={item.id}
          item={item}
          flexGrow={flexWeights[index]}
          isActive={activeId === item.id}
          isHovered={hoveredId === item.id}
          shouldReduceMotion={shouldReduceMotion ?? false}
          onActivate={() => setActiveId(item.id)}
          onPointerEnter={event => {
            if (event.pointerType === 'mouse') {
              setHoveredId(item.id);
            }
          }}
        />
      ))}
    </div>
  );
}
