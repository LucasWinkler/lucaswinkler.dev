import './work-list.css';

import { useReducedMotion } from 'motion/react';
import { type FocusEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { minWidth } from '@/lib/breakpoints';
import { useMediaQuery } from '@/lib/useMediaQuery';

import { activeShare, distanceDecay, hoverBoost, minWeight, selectedPeak } from './constants';
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

export function MotionWorkList({ items }: MotionWorkListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(() => items[0]?.id ?? null);
  const [liveMessage, setLiveMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();
  const isDesktopLayout = useMediaQuery(minWidth('md'));
  const layoutReady = useMemo(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(minWidth('md')).matches === isDesktopLayout;
  }, [isDesktopLayout]);
  const listRef = useRef<HTMLDivElement>(null);
  const itemIds = useMemo(() => items.map(item => item.id), [items]);
  const reduceMotion = shouldReduceMotion ?? false;

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
    if (isDesktopLayout || !listRef.current) {
      return;
    }

    listRef.current.scrollLeft = 0;
  }, [isDesktopLayout, items.length]);

  useEffect(() => {
    if (!activeId) {
      return;
    }

    const item = items.find(entry => entry.id === activeId);

    if (item) {
      setLiveMessage(`${item.brand} details expanded`);
    }
  }, [activeId, items]);

  const activeIndex = activeId === null ? -1 : items.findIndex(item => item.id === activeId);
  const hoveredIndex = hoveredId ? items.findIndex(item => item.id === hoveredId) : -1;

  const flexWeights = getPanelFlexWeights(activeIndex, hoveredIndex, items.length);

  const handleListFocusIn = (event: FocusEvent<HTMLDivElement>) => {
    if (isDesktopLayout) {
      return;
    }

    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const panel = target.closest('.work-panel-shell');

    if (panel) {
      panel.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    }
  };

  return (
    <WorkListProvider
      activeId={activeId}
      hoveredId={hoveredId}
      isMobileLayout={!isDesktopLayout}
      layoutReady={layoutReady}
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
        className={listClass}
        onMouseLeave={() => setHoveredId(null)}
        onFocusCapture={handleListFocusIn}>
        {items.map((item, index) => (
          <WorkPanel key={item.id} item={item} flexGrow={flexWeights[index]} index={index} />
        ))}
      </div>
    </WorkListProvider>
  );
}
