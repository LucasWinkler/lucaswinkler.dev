import './hero-shader-stack.css';

import { useEffect, useRef, useState } from 'react';

import { createHeroCursorShader } from '@/lib/hero-cursor-shader';

type HeroShaderStackProps = {
  imageSelector?: string;
};

const INFLUENCE_MARGIN = 160;

function supportsWebGL2(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

function shouldEnableShaders(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  return supportsWebGL2();
}

function isPointerShaderMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(pointer: fine)').matches;
}

function panelInfluence(clientX: number, clientY: number, rect: DOMRect): number {
  const inside = clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;

  if (inside) {
    return 1;
  }

  const dx = clientX < rect.left ? rect.left - clientX : clientX > rect.right ? clientX - rect.right : 0;
  const dy = clientY < rect.top ? rect.top - clientY : clientY > rect.bottom ? clientY - rect.bottom : 0;
  const dist = Math.hypot(dx, dy);

  if (dist >= INFLUENCE_MARGIN) {
    return 0;
  }

  const t = 1 - dist / INFLUENCE_MARGIN;
  return t * t * (3 - 2 * t);
}

function bindPointerTracking(
  panel: HTMLElement,
  shader: ReturnType<typeof createHeroCursorShader>,
): { resyncPointer: () => void; dispose: () => void } {
  let lastClientX = 0;
  let lastClientY = 0;
  let hasCoords = false;

  const applyPointer = (clientX: number, clientY: number) => {
    const rect = panel.getBoundingClientRect();

    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const x = (clientX - rect.left) / rect.width;
    const y = 1 - (clientY - rect.top) / rect.height;

    shader.setMouse(x, y);
    shader.setInfluence(panelInfluence(clientX, clientY, rect));
  };

  const sampleMouse = (event: PointerEvent) => {
    lastClientX = event.clientX;
    lastClientY = event.clientY;
    hasCoords = true;
    applyPointer(event.clientX, event.clientY);
  };

  const resyncPointer = () => {
    if (!hasCoords) {
      return;
    }

    applyPointer(lastClientX, lastClientY);
  };

  document.addEventListener('pointermove', sampleMouse, { passive: true });

  return {
    resyncPointer,
    dispose: () => {
      document.removeEventListener('pointermove', sampleMouse);
      shader.setInfluence(0);
      shader.setViewport(false);
    },
  };
}

export function HeroShaderStack({ imageSelector = '[data-hero-image]' }: HeroShaderStackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const shaderRef = useRef<ReturnType<typeof createHeroCursorShader> | null>(null);
  const pointerControlRef = useRef<{ resyncPointer: () => void; dispose: () => void } | null>(null);
  const activatedRef = useRef(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!shouldEnableShaders()) {
      return;
    }

    const img = document.querySelector(imageSelector);

    if (!(img instanceof HTMLImageElement)) {
      return;
    }

    const media = img.closest('.hero-panel__media');
    const panel = img.closest('.hero-panel');
    const canvas = canvasRef.current;

    if (!(media instanceof HTMLElement) || !(panel instanceof HTMLElement) || !canvas) {
      return;
    }

    panelRef.current = panel;
    let revealObserver: MutationObserver | null = null;

    const activate = (el: HTMLImageElement) => {
      if (activatedRef.current) {
        return;
      }

      activatedRef.current = true;

      try {
        const shader = createHeroCursorShader({ canvas, image: el });
        shaderRef.current = shader;

        if (isPointerShaderMode()) {
          pointerControlRef.current = bindPointerTracking(panel, shader);
        }

        shader.whenReady(() => {
          const showShader = () => {
            media.classList.add('is-shader-active');
            shader.beginAmbientRamp();
            setIsActive(true);
          };

          if (media.classList.contains('is-loaded') || media.classList.contains('is-instant')) {
            showShader();
            return;
          }

          revealObserver = new MutationObserver(() => {
            if (media.classList.contains('is-loaded') || media.classList.contains('is-instant')) {
              revealObserver?.disconnect();
              revealObserver = null;
              showShader();
            }
          });

          revealObserver.observe(media, { attributes: true, attributeFilter: ['class'] });
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error(error);
        }

        activatedRef.current = false;
        media.classList.remove('is-shader-active');
      }
    };

    const tryActivate = () => {
      if (activatedRef.current) {
        return;
      }

      if (img.complete && img.naturalWidth > 0) {
        activate(img);
      }
    };

    tryActivate();
    img.addEventListener('load', tryActivate, { once: true });

    const observer = new MutationObserver(() => {
      tryActivate();
    });

    observer.observe(media, { attributes: true, attributeFilter: ['class'] });

    return () => {
      revealObserver?.disconnect();
      observer.disconnect();
      img.removeEventListener('load', tryActivate);
      pointerControlRef.current?.dispose();
      pointerControlRef.current = null;
      shaderRef.current?.dispose();
      shaderRef.current = null;
      media.classList.remove('is-shader-active');
      activatedRef.current = false;
      setIsActive(false);
    };
  }, [imageSelector]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const panel = panelRef.current;
    const shader = shaderRef.current;
    const pointerControl = pointerControlRef.current;

    if (!panel || !shader) {
      return;
    }

    let isIntersecting = true;

    const syncPaused = () => {
      shader.setPaused(!isIntersecting || document.visibilityState !== 'visible');
    };

    const intersectionObserver = new IntersectionObserver(
      entries => {
        isIntersecting = entries[0]?.isIntersecting ?? false;
        shader.setViewport(isIntersecting);

        if (isIntersecting) {
          pointerControl?.resyncPointer();
        }

        syncPaused();
      },
      { threshold: 0 },
    );

    const onVisibilityChange = () => {
      syncPaused();
    };

    intersectionObserver.observe(panel);
    document.addEventListener('visibilitychange', onVisibilityChange);
    shader.setViewport(true);
    pointerControl?.resyncPointer();
    syncPaused();

    return () => {
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      shader.setPaused(true);
    };
  }, [isActive]);

  return (
    <div className='hero-shader-stack' aria-hidden='true'>
      <canvas ref={canvasRef} className='hero-shader-stack__canvas' />
    </div>
  );
}
