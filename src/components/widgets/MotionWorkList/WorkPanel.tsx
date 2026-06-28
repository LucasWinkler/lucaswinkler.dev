import { type CSSProperties, type KeyboardEvent, memo, type PointerEvent } from 'react';

import {
  contentDuration,
  contentEase,
  fadeEase,
  hoverMediaDuration,
  hoverPanelDuration,
  mediaDuration,
  panelDuration,
} from './constants';
import { panelClass } from './styles';

import type { SelectedWorkItem } from '@/types/work';

export type WorkPanelProps = {
  item: SelectedWorkItem;
  flexGrow: number;
  isActive: boolean;
  isHovered: boolean;
  isHovering: boolean;
  shouldReduceMotion: boolean;
  onActivate: () => void;
  onPointerEnter: (event: PointerEvent<HTMLElement>) => void;
};

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
  isHovered,
  isHovering,
  shouldReduceMotion,
  onActivate,
  onPointerEnter,
}: WorkPanelProps) {
  const mediaScale = getMediaScale(isActive, isHovered);
  const panelStyle: CSSProperties = {
    flexGrow,
    flexShrink: 1,
    flexBasis: 0,
    opacity: isActive ? 1 : 0.76,
  };

  if (!shouldReduceMotion) {
    panelStyle.transitionProperty = 'flex-grow, opacity';
    panelStyle.transitionDuration = isHovering ? hoverPanelDuration : panelDuration;
    panelStyle.transitionTimingFunction = fadeEase;
  }

  const mediaStyle: CSSProperties = {
    transform: `translate3d(0, 0, 0) scale(${mediaScale})`,
  };

  if (!shouldReduceMotion) {
    mediaStyle.transitionProperty = 'transform';
    mediaStyle.transitionDuration = !isActive && isHovering ? hoverMediaDuration : mediaDuration;
    mediaStyle.transitionTimingFunction = fadeEase;
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      style={panelStyle}
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
        <div className='pointer-events-none absolute inset-0 origin-center' style={mediaStyle} aria-hidden='true'>
          <div
            className='absolute inset-[-5%] bg-cover bg-center'
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
        </div>

        <div
          className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/6 via-transparent to-black/28'
          aria-hidden='true'
        />

        <div className='texture-noise-overlay absolute inset-0 z-[1]' aria-hidden='true' />

        <div
          className={`absolute inset-0 z-2 flex flex-col justify-between p-6 max-[640px]:p-5 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
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
            <div
              className='flex max-w-[24ch] flex-col gap-1.5'
              style={getContentStyle(isActive, 0.05, shouldReduceMotion)}>
              <h3 id={`work-${item.id}-title`} className='type-card-title m-0 text-balance text-white'>
                {item.brand}
              </h3>
              <a
                className='type-caption relative w-fit max-w-full truncate text-white/88 underline-offset-2 no-underline transition-[color,text-decoration-color] duration-150 ease-out after:absolute after:inset-[-0.625rem] after:content-[""] hover:text-white hover:underline'
                href={item.url}
                target='_blank'
                rel='noopener noreferrer'
                tabIndex={isActive ? undefined : -1}>
                {item.domain}
              </a>
            </div>

            <div
              className='my-2 h-px w-full max-w-[24ch] bg-white/14'
              aria-hidden='true'
              style={getContentStyle(isActive, 0.08, shouldReduceMotion)}
            />

            <div
              className='w-[min(48ch,100%)] min-[901px]:w-[min(48ch,calc(50cqw-3rem))]'
              style={getContentStyle(isActive, 0.12, shouldReduceMotion)}>
              <p className='type-caption m-0 text-white/78 text-pretty'>{item.description}</p>
            </div>
          </div>

          <ul
            className='relative z-1 m-0 flex list-none flex-wrap gap-x-2 gap-y-1 p-0'
            aria-label={`${item.brand} tech stack`}
            style={getContentStyle(isActive, 0.2, shouldReduceMotion)}>
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
    </div>
  );
});
