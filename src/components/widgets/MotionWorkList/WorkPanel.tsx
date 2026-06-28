import { LayoutGroup, motion, type Transition } from 'motion/react';
import { type CSSProperties, type KeyboardEvent, memo, type PointerEvent, type SyntheticEvent } from 'react';

import { contentDuration, contentEase, fadeEase, hoverMediaDuration, mediaDuration } from './constants';
import { panelClass, panelEndInsetClass, panelGapClass, panelInsetClass, panelSnapClass } from './styles';

import type { SelectedWorkItem } from '@/types/work';

export type WorkPanelProps = {
  item: SelectedWorkItem;
  flexGrow: number;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  isHovered: boolean;
  isHovering: boolean;
  isMobileLayout: boolean;
  shouldReduceMotion: boolean;
  onActivate: () => void;
  onPointerEnter: (event: PointerEvent<HTMLElement>) => void;
};

const logoEase = [0.33, 1, 0.68, 1] as const;
const logoLayoutTransition = { duration: 0.52, ease: logoEase };

const logoShellClass =
  'flex items-center justify-center overflow-hidden bg-white rounded-(--radius-work-logo) max-[640px]:rounded-(--radius-work-logo-sm)';

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none';
}

type WorkPanelLogoProps = {
  variant: 'centered' | 'corner';
  src: string;
  scale?: number;
  transition: Transition;
};

function WorkPanelLogo({ variant, src, scale, transition }: WorkPanelLogoProps) {
  const wrapperClass =
    variant === 'corner'
      ? 'pointer-events-none absolute top-(--space-work-panel-inset) right-(--space-work-panel-inset) z-3 max-[640px]:top-(--space-work-panel-inset-sm) max-[640px]:right-(--space-work-panel-inset-sm)'
      : 'pointer-events-none absolute inset-0 z-3 flex items-center justify-center';

  const shellSizeClass = variant === 'corner' ? 'h-10 w-10' : 'h-[72px] w-[72px]';

  return (
    <div className={wrapperClass}>
      <motion.div layoutId='logo' className={`${shellSizeClass} ${logoShellClass}`} transition={{ layout: transition }}>
        <img
          className='h-full w-full object-contain'
          style={scale !== undefined ? { transform: `scale(${scale})` } : undefined}
          src={src}
          alt=''
          width={32}
          height={32}
          loading='lazy'
          decoding='async'
          onError={hideBrokenImage}
        />
      </motion.div>
    </div>
  );
}

function getImageRevealStyle(isActive: boolean, shouldReduceMotion: boolean): CSSProperties {
  if (shouldReduceMotion) {
    return {
      opacity: isActive ? 1 : 0,
    };
  }

  return {
    opacity: isActive ? 1 : 0,
    filter: isActive ? 'blur(0px)' : 'blur(4px)',
    transitionProperty: 'opacity, filter',
    transitionDuration: mediaDuration,
    transitionTimingFunction: fadeEase,
  };
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

function getContentStyle(isActive: boolean, delay: number, shouldReduceMotion: boolean): CSSProperties {
  if (shouldReduceMotion) {
    return {
      opacity: isActive ? 1 : 0,
      transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 4px, 0)',
    };
  }

  return {
    opacity: isActive ? 1 : 0,
    transform: isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, 4px, 0)',
    transitionProperty: 'opacity, transform',
    transitionDuration: contentDuration,
    transitionTimingFunction: contentEase,
    transitionDelay: isActive ? `${delay}s` : '0s',
  };
}

export const WorkPanel = memo(function WorkPanel({
  item,
  flexGrow,
  isActive,
  isFirst,
  isLast,
  isHovered,
  isHovering,
  isMobileLayout,
  shouldReduceMotion,
  onActivate,
  onPointerEnter,
}: WorkPanelProps) {
  const isExpanded = isMobileLayout || isActive;
  const revealMotion = shouldReduceMotion || isMobileLayout;
  const mediaScale = isMobileLayout ? 1 : getMediaScale(isActive, isHovered);
  const logoTransition = shouldReduceMotion ? { duration: 0 } : logoLayoutTransition;
  const panelStyle = {
    backgroundColor: item.brandColor,
    '--panel-grow': flexGrow,
  } as CSSProperties;

  const mediaStyle: CSSProperties = {
    transform: `translate3d(0, 0, 0) scale(${mediaScale})`,
  };

  if (!shouldReduceMotion) {
    mediaStyle.transitionProperty = 'transform';
    mediaStyle.transitionDuration = !isActive && isHovering ? hoverMediaDuration : mediaDuration;
    mediaStyle.transitionTimingFunction = fadeEase;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isMobileLayout || isActive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      style={panelStyle}
      onPointerEnter={isMobileLayout ? undefined : onPointerEnter}
      onClick={isMobileLayout || isActive ? undefined : onActivate}
      onKeyDown={isMobileLayout || isActive ? undefined : handleKeyDown}
      role={isExpanded ? 'region' : 'button'}
      tabIndex={isMobileLayout ? -1 : 0}
      aria-expanded={isMobileLayout ? undefined : isActive}
      aria-labelledby={isExpanded ? `work-${item.id}-title` : undefined}
      aria-label={isExpanded ? undefined : `Show ${item.brand} details`}
      className={`${panelClass} ${panelSnapClass} ${isFirst ? panelInsetClass : panelGapClass} ${isLast ? panelEndInsetClass : ''} outline-none focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)] ${isExpanded ? 'cursor-default select-text' : 'cursor-pointer'}`}>
      <motion.div layoutRoot className='relative h-full w-full overflow-hidden'>
        {item.image ? (
          <div className='pointer-events-none absolute inset-0 origin-center' style={mediaStyle} aria-hidden='true'>
            <div className='absolute inset-[-5%]' style={getImageRevealStyle(isExpanded, revealMotion)}>
              <img
                className='absolute inset-0 h-full w-full max-w-none object-cover outline -outline-offset-1 outline-black/10'
                style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                src={item.image}
                alt=''
                {...(item.imageWidth && item.imageHeight ? { width: item.imageWidth, height: item.imageHeight } : {})}
                loading='lazy'
                decoding='async'
                onError={hideBrokenImage}
              />

              <div
                className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/16'
                aria-hidden='true'
              />
              <div
                className='pointer-events-none absolute inset-y-0 left-0 w-[min(100%,42rem)] bg-linear-to-r from-black/72 via-black/40 to-transparent'
                aria-hidden='true'
              />
              <div
                className='pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/62 to-transparent'
                aria-hidden='true'
              />
            </div>
          </div>
        ) : null}

        {item.logo ? (
          <LayoutGroup id={`work-logo-${item.id}`}>
            <WorkPanelLogo
              variant={isExpanded ? 'corner' : 'centered'}
              src={item.logo}
              scale={item.logoScale}
              transition={logoTransition}
            />
          </LayoutGroup>
        ) : null}

        <div
          className={`absolute inset-0 z-2 flex h-full flex-col justify-start p-(--space-work-panel-inset) max-[640px]:p-(--space-work-panel-inset-sm) ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!isExpanded}
          inert={!isExpanded}>
          <div className='relative z-1 flex min-w-0 flex-col'>
            <div
              className='flex max-w-[min(24ch,calc(100%-3.5rem))] flex-col gap-1.5 max-[640px]:max-w-full'
              style={getContentStyle(isExpanded, 0.05, revealMotion)}>
              <h3 id={`work-${item.id}-title`} className='type-card-title m-0 text-balance text-white'>
                {item.brand}
              </h3>
              <a
                className={`type-caption relative w-fit max-w-full rounded-sm text-white/88 underline-offset-2 no-underline outline-none transition-[color,text-decoration-color] duration-150 ease-out after:absolute after:inset-[-0.625rem] after:content-[""] hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)] ${isExpanded ? 'max-[640px]:overflow-visible max-[640px]:whitespace-normal' : 'truncate'}`}
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                tabIndex={isExpanded ? undefined : -1}>
                {item.domain}
              </a>
            </div>

            <div
              className='my-2 h-px w-full max-w-[min(24ch,calc(100%-3.5rem))] bg-white/14 max-[640px]:max-w-full'
              aria-hidden='true'
              style={getContentStyle(isExpanded, 0.08, revealMotion)}
            />

            <div
              className='w-[min(38ch,100%)] min-[901px]:w-[min(38ch,calc(50cqw-3rem))]'
              style={getContentStyle(isExpanded, 0.12, revealMotion)}>
              <p className='type-caption m-0 text-white/78 text-pretty'>{item.description}</p>
            </div>

            <ul
              className='relative z-1 m-0 mt-3 flex list-none flex-wrap gap-x-2 gap-y-1 p-0'
              aria-label={`${item.brand} tech stack`}
              style={getContentStyle(isExpanded, 0.2, revealMotion)}>
              {item.tech.map(stack => (
                <li
                  key={stack}
                  className="type-caption font-medium tracking-(--tracking-chip) text-white/72 uppercase not-last:after:ms-2 not-last:after:font-normal not-last:after:text-white/40 not-last:after:content-['·']">
                  {stack}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
});
