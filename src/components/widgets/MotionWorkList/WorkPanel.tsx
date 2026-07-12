import { LayoutGroup, motion, type Transition } from 'motion/react';
import { type CSSProperties, type KeyboardEvent, memo, type SyntheticEvent } from 'react';

import { focusVisible } from '@/lib/focus';
import { springUi } from '@/lib/motion';

import { contentDuration, contentEase, fadeEase, hoverMediaDuration, mediaDuration } from './constants';
import { panelEndInsetClass, panelGapClass, panelInsetClass, panelShellClass, panelSurfaceClass } from './styles';
import { useWorkList } from './WorkListContext';

import type { SelectedWorkItem } from '@/types/work';

export type WorkPanelProps = {
  item: SelectedWorkItem;
  flexGrow: number;
  index: number;
};

const logoEnterLayoutTransition = springUi;
const logoExitLayoutTransition = { ...springUi, duration: 0.32 } as const;

const logoShellClass =
  'flex items-center justify-center overflow-hidden bg-white rounded-(--radius-work-logo-sm) md:rounded-(--radius-work-logo)';

function hideBrokenImage(event: SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = 'none';
}

type WorkPanelLogoProps = {
  variant: 'centered' | 'corner';
  src: string;
  scale?: number;
  isExpanded: boolean;
  shouldReduceMotion: boolean;
};

function WorkPanelLogo({ variant, src, scale, isExpanded, shouldReduceMotion }: WorkPanelLogoProps) {
  const layoutTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : isExpanded
      ? logoEnterLayoutTransition
      : logoExitLayoutTransition;
  const wrapperClass =
    variant === 'corner'
      ? 'pointer-events-none absolute top-(--space-work-panel-inset) right-(--space-work-panel-inset) z-3'
      : 'pointer-events-none absolute inset-0 z-3 flex items-center justify-center';

  const shellSizeClass =
    variant === 'corner'
      ? 'size-(--size-work-logo-corner)'
      : 'size-(--size-work-logo-compact) lg:size-(--size-work-logo)';

  return (
    <div className={wrapperClass}>
      <motion.div
        layoutId='logo'
        className={`${shellSizeClass} ${logoShellClass}`}
        transition={{ layout: layoutTransition }}>
        <img
          className='h-full w-full object-contain'
          style={scale !== undefined ? { transform: `scale(${scale})` } : undefined}
          src={src}
          alt=''
          width={56}
          height={56}
          loading='lazy'
          decoding='async'
          onError={hideBrokenImage}
        />
      </motion.div>
    </div>
  );
}

function getImageRevealStyle(isActive: boolean, shouldReduceMotion: boolean): CSSProperties {
  return {
    opacity: isActive ? 1 : 0,
    ...(shouldReduceMotion
      ? {}
      : {
          transitionProperty: 'opacity',
          transitionDuration: mediaDuration,
          transitionTimingFunction: fadeEase,
        }),
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
  const restTransform = 'translate3d(0, 0, 0)';

  if (shouldReduceMotion) {
    return {
      opacity: isActive ? 1 : 0,
      transform: restTransform,
    };
  }

  if (isActive) {
    return {
      opacity: 1,
      transform: restTransform,
      animation: `work-panel-content-enter ${contentDuration} ${contentEase} ${delay}s both`,
    };
  }

  return {
    opacity: 0,
    transform: restTransform,
    transitionProperty: 'opacity',
    transitionDuration: contentDuration,
    transitionTimingFunction: contentEase,
  };
}

export const WorkPanel = memo(function WorkPanel({ item, flexGrow, index }: WorkPanelProps) {
  const {
    isMobileLayout,
    layoutReady,
    shouldReduceMotion,
    isHovering,
    itemCount,
    activate,
    activateByIndex,
    deactivate,
    onPanelPointerEnter,
    registerPanelRef,
    isFirst,
    isLast,
    isActive,
    isHovered,
  } = useWorkList();

  const panelActive = isActive(item.id);
  const panelHovered = isHovered(item.id);
  const isExpanded = panelActive || (isMobileLayout && layoutReady);
  const revealMotion = shouldReduceMotion || isMobileLayout;
  const mediaScale = isMobileLayout ? 1 : getMediaScale(panelActive, panelHovered);
  const panelStyle = {
    backgroundColor: item.brandColor,
  } as CSSProperties;

  const mediaStyle: CSSProperties = {
    transform: `translate3d(0, 0, 0) scale(${mediaScale})`,
  };

  if (!shouldReduceMotion) {
    mediaStyle.transitionProperty = 'transform';
    mediaStyle.transitionDuration = !panelActive && isHovering ? hoverMediaDuration : mediaDuration;
    mediaStyle.transitionTimingFunction = fadeEase;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isMobileLayout) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const list = event.currentTarget.closest('.work-list');
        const panels = list ? (Array.from(list.querySelectorAll('.work-panel-shell')) as HTMLElement[]) : [];
        const nextIndex = event.key === 'ArrowRight' ? Math.min(index + 1, panels.length - 1) : Math.max(index - 1, 0);
        const nextPanel = panels[nextIndex];

        nextPanel?.scrollIntoView({
          inline: 'start',
          block: 'nearest',
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
        focusVisible(nextPanel);
      }

      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (panelActive) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      activate(item.id);
      return;
    }

    if (event.key === 'Escape' && panelActive) {
      event.preventDefault();
      deactivate();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      activateByIndex(Math.min(index + 1, itemCount - 1));
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      activateByIndex(Math.max(index - 1, 0));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      activateByIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      activateByIndex(itemCount - 1);
    }
  };

  return (
    <div
      ref={element => registerPanelRef(index, element)}
      onPointerEnter={isMobileLayout ? undefined : event => onPanelPointerEnter(item.id, event)}
      onClick={isMobileLayout || panelActive ? undefined : () => activate(item.id)}
      onKeyDown={handleKeyDown}
      role={isExpanded ? 'region' : 'button'}
      tabIndex={0}
      aria-expanded={isMobileLayout ? undefined : panelActive}
      aria-labelledby={isExpanded ? `work-${item.id}-title` : undefined}
      aria-label={isExpanded ? undefined : `Show ${item.brand} details`}
      className={`${panelShellClass} ${isFirst(index) ? panelInsetClass : panelGapClass} ${isLast(index) ? panelEndInsetClass : ''} focus-ring ${isExpanded ? 'cursor-default' : 'cursor-pointer select-none work-panel-shell--pressable'}`}
      style={{ '--panel-grow': flexGrow } as CSSProperties}>
      <div className={panelSurfaceClass} style={panelStyle}>
        <motion.div layoutRoot className='relative h-full w-full overflow-hidden rounded-(--radius-panel)'>
          {item.image ? (
            <div className='pointer-events-none absolute inset-0 origin-center' style={mediaStyle} aria-hidden='true'>
              <div className='absolute inset-[-5%]' style={getImageRevealStyle(isExpanded, revealMotion)}>
                <picture className='absolute inset-0 block'>
                  <source srcSet={item.image.avifSrcSet} sizes={item.image.sizes} type='image/avif' />
                  <source srcSet={item.image.srcSet} sizes={item.image.sizes} type='image/webp' />
                  <img
                    className='absolute inset-0 h-full w-full max-w-none object-cover outline -outline-offset-1 outline-black/10'
                    style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
                    src={item.image.src}
                    srcSet={item.image.srcSet}
                    sizes={item.image.sizes}
                    alt=''
                    width={item.image.width}
                    height={item.image.height}
                    loading='lazy'
                    decoding='async'
                    onError={hideBrokenImage}
                  />
                </picture>

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
                isExpanded={isExpanded}
                shouldReduceMotion={shouldReduceMotion}
              />
            </LayoutGroup>
          ) : null}

          <div
            className={`absolute inset-0 z-2 flex h-full flex-col justify-start p-(--space-work-panel-inset) ${isExpanded ? 'pointer-events-auto select-text' : 'pointer-events-none'}`}
            aria-hidden={isExpanded ? undefined : true}
            inert={!isExpanded}>
            <div className='relative z-1 flex min-w-0 flex-col'>
              <div
                className='flex max-w-full flex-col gap-1.5 md:w-[min(24ch,calc(var(--work-panel-content-width)-3.5rem))] md:max-w-none'
                style={getContentStyle(isExpanded, 0.05, revealMotion)}>
                {isExpanded ? (
                  <h3
                    id={`work-${item.id}-title`}
                    className='type-card-title m-0 text-balance text-white'
                    translate='no'>
                    <a
                      className='group flex w-fit max-w-full flex-col gap-1.5 overflow-visible whitespace-normal rounded-sm text-white no-underline outline-none transition-[color] duration-(--duration-quick) ease-(--ease-out) focus-ring-inverse md:overflow-hidden'
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${item.brand} (opens in new tab)`}>
                      <span>{item.brand}</span>
                      <span className='type-caption text-white/92 underline-offset-2 no-underline transition-[color,text-decoration-color] duration-(--duration-quick) ease-(--ease-out) group-hover:text-white group-hover:underline group-focus-visible:text-white group-focus-visible:underline'>
                        {item.domain}
                      </span>
                    </a>
                  </h3>
                ) : (
                  <>
                    <h3
                      id={`work-${item.id}-title`}
                      className='type-card-title m-0 text-balance text-white'
                      translate='no'>
                      {item.brand}
                    </h3>
                    <span className='type-caption truncate text-white/88' aria-hidden='true'>
                      {item.domain}
                    </span>
                  </>
                )}
              </div>

              {item.description ? (
                <div
                  className='w-[min(38ch,100%)] md:w-[min(38ch,var(--work-panel-content-width))]'
                  style={getContentStyle(isExpanded, 0.12, revealMotion)}>
                  <p className='type-caption m-0 text-white/92 text-pretty'>{item.description}</p>
                </div>
              ) : null}

              <ul
                className='relative z-1 m-0 mt-3 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 md:w-(--work-panel-content-width)'
                aria-label={`${item.brand} tech stack`}
                style={getContentStyle(isExpanded, item.description ? 0.2 : 0.08, revealMotion)}>
                {item.tech.map(stack => (
                  <li
                    key={stack}
                    translate='no'
                    className="type-caption font-medium tracking-(--tracking-chip) text-white/88 uppercase not-last:after:ms-2 not-last:after:font-normal not-last:after:text-white/50 not-last:after:content-['·']">
                    {stack}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
});
