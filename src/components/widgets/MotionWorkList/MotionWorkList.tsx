import { useReducedMotion } from 'motion/react';
import { type FocusEvent, type KeyboardEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useMediaQuery } from '@/lib/useMediaQuery';

import { activeShare, distanceDecay, hoverBoost, minWeight, mobileLayoutMediaQuery, selectedPeak } from './constants';
import { listClass } from './styles';
import { WorkListProvider } from './WorkListContext';
import { WorkPanel } from './WorkPanel';

import type { SelectedWorkItem } from '@/types/work';

type MotionWorkListProps = {
  items: SelectedWorkItem[];
};

function getPanelFlexWeights(activeIndex: number, hoveredIndex: number, itemCount: number): number[] {
  if (activeIndex < 0) {
    return Array.from({ length: itemCount }, () => 1);
  }

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
    return Array.from({ length: itemCount }, (_, index) => (index === activeIndex ? 1 : 0));
  }

  const inactiveScale = (selectedPeak * (1 - activeShare)) / (activeShare * inactiveSum);

  return Array.from({ length: itemCount }, (_, index) => {
    if (index === activeIndex) {
      return selectedPeak;
    }

    return rawInactive[index] * inactiveScale;
  });
}

function getNearestPanelIndex(list: HTMLDivElement, panels: HTMLElement[]): number {
  const scrollLeft = list.scrollLeft;
  let nearest = 0;
  let minDistance = Infinity;

  panels.forEach((panel, index) => {
    const distance = Math.abs(panel.offsetLeft - scrollLeft);

    if (distance < minDistance) {
      minDistance = distance;
      nearest = index;
    }
  });

  return nearest;
}

function scrollPanelIntoView(panels: HTMLElement[], index: number, behavior: ScrollBehavior) {
  panels[index]?.scrollIntoView({ inline: 'start', block: 'nearest', behavior });
}

export function MotionWorkList({ items }: MotionWorkListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(() => items[0]?.id ?? null);
  const [liveMessage, setLiveMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();
  const isMobileLayout = useMediaQuery(mobileLayoutMediaQuery);
  const listRef = useRef<HTMLDivElement>(null);
  const itemIds = useMemo(() => items.map(item => item.id), [items]);
  const reduceMotion = shouldReduceMotion ?? false;
  const scrollBehavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

  useLayoutEffect(() => {
    const validIds = new Set(itemIds);

    setHoveredId(current => (current !== null && validIds.has(current) ? current : null));

    setActiveId(current => {
      if (itemIds.length === 0) {
        return null;
      }

      return current !== null && validIds.has(current) ? current : itemIds[0];
    });
  }, [itemIds]);

  useLayoutEffect(() => {
    if (!isMobileLayout || !listRef.current) {
      return;
    }

    listRef.current.scrollLeft = 0;
  }, [isMobileLayout, items.length]);

  useEffect(() => {
    if (isMobileLayout || !activeId) {
      return;
    }

    const item = items.find(entry => entry.id === activeId);

    if (item) {
      setLiveMessage(`${item.brand} details expanded`);
    }
  }, [activeId, isMobileLayout, items]);

  const activeIndex = activeId === null ? -1 : items.findIndex(item => item.id === activeId);
  const hoveredIndex = hoveredId ? items.findIndex(item => item.id === hoveredId) : -1;

  const flexWeights = getPanelFlexWeights(activeIndex, hoveredIndex, items.length);

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isMobileLayout || !listRef.current) {
      return;
    }

    const panels = Array.from(listRef.current.querySelectorAll('.work-panel')) as HTMLElement[];

    if (panels.length === 0) {
      return;
    }

    const currentIndex = getNearestPanelIndex(listRef.current, panels);

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollPanelIntoView(panels, Math.min(currentIndex + 1, panels.length - 1), scrollBehavior);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPanelIntoView(panels, Math.max(currentIndex - 1, 0), scrollBehavior);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      scrollPanelIntoView(panels, 0, scrollBehavior);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      scrollPanelIntoView(panels, panels.length - 1, scrollBehavior);
    }
  };

  const handleListFocusIn = (event: FocusEvent<HTMLDivElement>) => {
    if (!isMobileLayout) {
      return;
    }

    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const panel = target.closest('.work-panel');

    if (panel) {
      panel.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
  };

  return (
    <WorkListProvider
      activeId={activeId}
      hoveredId={hoveredId}
      isMobileLayout={isMobileLayout}
      shouldReduceMotion={reduceMotion}
      isHovering={hoveredIndex >= 0}
      itemCount={items.length}
      itemIds={itemIds}
      setActiveId={setActiveId}
      setHoveredId={setHoveredId}>
      <span className='sr-only' aria-live='polite' aria-atomic='true'>
        {liveMessage}
      </span>
      <div
        ref={listRef}
        className={`${listClass}${isMobileLayout ? ' outline-none focus-ring' : ''}`}
        role={isMobileLayout ? 'region' : undefined}
        aria-label={isMobileLayout ? 'Selected work projects' : undefined}
        tabIndex={isMobileLayout ? 0 : undefined}
        onMouseLeave={() => setHoveredId(null)}
        onKeyDown={handleListKeyDown}
        onFocusCapture={handleListFocusIn}>
        {items.map((item, index) => (
          <WorkPanel key={item.id} item={item} flexGrow={flexWeights[index]} index={index} />
        ))}
      </div>
    </WorkListProvider>
  );
}
