import { createContext, type PointerEvent, type ReactNode, useCallback, useContext, useMemo, useRef } from 'react';

import { focusVisible } from '@/lib/focus';

type WorkListContextValue = {
  isMobileLayout: boolean;
  layoutReady: boolean;
  shouldReduceMotion: boolean;
  isHovering: boolean;
  itemCount: number;
  activate: (id: string) => void;
  activateByIndex: (index: number) => void;
  deactivate: () => void;
  onPanelPointerEnter: (id: string, event: PointerEvent<HTMLElement>) => void;
  isFirst: (index: number) => boolean;
  isLast: (index: number) => boolean;
  isActive: (id: string) => boolean;
  isHovered: (id: string) => boolean;
  registerPanelRef: (index: number, element: HTMLDivElement | null) => void;
};

const WorkListContext = createContext<WorkListContextValue | null>(null);

type WorkListProviderProps = {
  activeId: string | null;
  hoveredId: string | null;
  isMobileLayout: boolean;
  layoutReady: boolean;
  shouldReduceMotion: boolean;
  isHovering: boolean;
  itemCount: number;
  itemIds: string[];
  setActiveId: (id: string | null) => void;
  setHoveredId: (id: string | null) => void;
  children: ReactNode;
};

export function WorkListProvider({
  activeId,
  hoveredId,
  isMobileLayout,
  layoutReady,
  shouldReduceMotion,
  isHovering,
  itemCount,
  itemIds,
  setActiveId,
  setHoveredId,
  children,
}: WorkListProviderProps) {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const registerPanelRef = useCallback((index: number, element: HTMLDivElement | null) => {
    panelRefs.current[index] = element;
  }, []);

  const activateByIndex = useCallback(
    (index: number) => {
      const id = itemIds[index];

      if (!id) {
        return;
      }

      setActiveId(id);

      if (!isMobileLayout) {
        focusVisible(panelRefs.current[index]);
      }
    },
    [isMobileLayout, itemIds, setActiveId],
  );

  const activate = useCallback(
    (id: string) => {
      setActiveId(id);

      if (!isMobileLayout) {
        const index = itemIds.indexOf(id);

        if (index >= 0) {
          focusVisible(panelRefs.current[index]);
        }
      }
    },
    [isMobileLayout, itemIds, setActiveId],
  );

  const deactivate = useCallback(() => {
    setActiveId(null);
  }, [setActiveId]);

  const onPanelPointerEnter = useCallback(
    (id: string, event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === 'mouse') {
        setHoveredId(id);
      }
    },
    [setHoveredId],
  );

  const value = useMemo(
    (): WorkListContextValue => ({
      isMobileLayout,
      layoutReady,
      shouldReduceMotion,
      isHovering,
      itemCount,
      activate,
      activateByIndex,
      deactivate,
      onPanelPointerEnter,
      isFirst: index => index === 0,
      isLast: index => index === itemCount - 1,
      isActive: id => activeId === id,
      isHovered: id => hoveredId === id,
      registerPanelRef,
    }),
    [
      activeId,
      hoveredId,
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
    ],
  );

  return <WorkListContext.Provider value={value}>{children}</WorkListContext.Provider>;
}

export function useWorkList(): WorkListContextValue {
  const context = useContext(WorkListContext);

  if (!context) {
    throw new Error('useWorkList must be used within WorkListProvider');
  }

  return context;
}
