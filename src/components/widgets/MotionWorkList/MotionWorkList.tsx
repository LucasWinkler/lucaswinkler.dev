import { useReducedMotion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import { useMediaQuery } from '@/lib/useMediaQuery';

import { activeShare, distanceDecay, hoverBoost, minWeight, mobileLayoutMediaQuery, selectedPeak } from './constants';
import { listClass } from './styles';
import { WorkPanel } from './WorkPanel';

import type { SelectedWorkItem } from '@/types/work';

type MotionWorkListProps = {
  items: SelectedWorkItem[];
};

function getPanelFlexWeights(activeIndex: number, hoveredIndex: number, itemCount: number): number[] {
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

  const activeIndex = Math.max(
    0,
    items.findIndex(item => item.id === activeId),
  );
  const hoveredIndex = hoveredId ? items.findIndex(item => item.id === hoveredId) : -1;

  const flexWeights = getPanelFlexWeights(activeIndex, hoveredIndex, items.length);

  useLayoutEffect(() => {
    if (!isMobileLayout || !listRef.current) {
      return;
    }

    listRef.current.scrollLeft = 0;
  }, [isMobileLayout, items.length]);

  return (
    <div ref={listRef} className={listClass} onMouseLeave={() => setHoveredId(null)}>
      {items.map((item, index) => (
        <WorkPanel
          key={item.id}
          item={item}
          flexGrow={flexWeights[index]}
          isActive={activeId === item.id}
          isFirst={index === 0}
          isLast={index === items.length - 1}
          isHovered={hoveredId === item.id}
          isHovering={hoveredIndex >= 0}
          isMobileLayout={isMobileLayout}
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
