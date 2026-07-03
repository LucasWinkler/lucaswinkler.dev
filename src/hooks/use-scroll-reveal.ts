import { useReducedMotion } from 'motion/react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { noMotion, revealViewport } from '@/lib/motion';

import type { Transition } from 'motion/react';

type RevealY = '0.625rem' | '0.75rem' | '1rem';

type UseScrollRevealOptions = {
  y: RevealY;
  transition: Transition;
};

const revealShown = { opacity: 1, y: 0 } as const;

const scrollSubscribers = new Set<() => void>();
let scrollListening = false;

function onScroll() {
  scrollSubscribers.forEach(cb => cb());
}

function subscribeScroll(cb: () => void) {
  scrollSubscribers.add(cb);
  if (!scrollListening) {
    window.addEventListener('scroll', onScroll, { passive: true });
    scrollListening = true;
  }
  return () => {
    scrollSubscribers.delete(cb);
    if (scrollSubscribers.size === 0 && scrollListening) {
      window.removeEventListener('scroll', onScroll);
      scrollListening = false;
    }
  };
}

function isPassed(el: HTMLElement): boolean {
  return el.getBoundingClientRect().top < 0;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>({ y, transition }: UseScrollRevealOptions) {
  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [skipReveal, setSkipReveal] = useState(false);
  const unsubscribeScrollRef = useRef<(() => void) | null>(null);

  const detachScrollWatch = useCallback(() => {
    unsubscribeScrollRef.current?.();
    unsubscribeScrollRef.current = null;
  }, []);

  const onViewportEnter = useCallback(() => {
    detachScrollWatch();
  }, [detachScrollWatch]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || shouldReduceMotion) {
      return;
    }

    const markIfPassed = () => {
      if (isPassed(el)) {
        setSkipReveal(true);
        return true;
      }
      return false;
    };

    if (markIfPassed()) {
      return;
    }

    const check = () => {
      if (markIfPassed()) {
        detachScrollWatch();
      }
    };

    unsubscribeScrollRef.current = subscribeScroll(check);
    return detachScrollWatch;
  }, [detachScrollWatch, shouldReduceMotion]);

  const skip = shouldReduceMotion || skipReveal;

  return {
    ref,
    initial: skip ? false : { opacity: 0, y },
    animate: skipReveal && !shouldReduceMotion ? revealShown : undefined,
    whileInView: revealShown,
    viewport: revealViewport,
    transition: skip ? noMotion : transition,
    onViewportEnter,
  };
}
