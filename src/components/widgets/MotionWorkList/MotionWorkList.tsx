import { useReducedMotion } from 'motion/react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

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

export function MotionWorkList({ items }: MotionWorkListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(() => items[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();
  const isMobileLayout = useMediaQuery(mobileLayoutMediaQuery);
  const listRef = useRef<HTMLDivElement>(null);
  const itemIds = useMemo(() => items.map(item => item.id), [items]);

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

  const activeIndex = activeId === null ? -1 : items.findIndex(item => item.id === activeId);
  const hoveredIndex = hoveredId ? items.findIndex(item => item.id === hoveredId) : -1;

  const flexWeights = getPanelFlexWeights(activeIndex, hoveredIndex, items.length);

  useLayoutEffect(() => {
    if (!isMobileLayout || !listRef.current) {
      return;
    }

    listRef.current.scrollLeft = 0;
  }, [isMobileLayout, items.length]);

  return (
    <WorkListProvider
      activeId={activeId}
      hoveredId={hoveredId}
      isMobileLayout={isMobileLayout}
      shouldReduceMotion={shouldReduceMotion ?? false}
      isHovering={hoveredIndex >= 0}
      itemCount={items.length}
      itemIds={itemIds}
      setActiveId={setActiveId}
      setHoveredId={setHoveredId}>
      <div ref={listRef} className={listClass} onMouseLeave={() => setHoveredId(null)}>
        {items.map((item, index) => (
          <WorkPanel key={item.id} item={item} flexGrow={flexWeights[index]} index={index} />
        ))}
      </div>
    </WorkListProvider>
  );
}
