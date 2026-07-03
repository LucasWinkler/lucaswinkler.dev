import { closeAllHeaderMenus } from '@/components/common/header/header-menu';

let cleanup: (() => void) | undefined;

export function initHeaderSync(): void {
  cleanup?.();

  const heroSection = document.getElementById('hero');
  const stickyHeader = document.getElementById('site-header-sticky');
  const heroHeader = document.getElementById('site-header-hero');

  if (!heroSection || !stickyHeader) {
    cleanup = undefined;
    return;
  }

  let ticking = false;
  let stickyVisible = false;
  let insetOffset = parseFloat(getComputedStyle(heroSection).paddingBottom) || 0;
  const controller = new AbortController();
  const { signal } = controller;

  const setStickyVisible = (visible: boolean) => {
    if (visible === stickyVisible) {
      return;
    }

    stickyVisible = visible;

    closeAllHeaderMenus();

    if (visible) {
      stickyHeader.dataset.visible = 'true';
      stickyHeader.removeAttribute('inert');
      heroHeader?.setAttribute('inert', '');
      return;
    }

    stickyHeader.dataset.visible = 'false';
    stickyHeader.setAttribute('inert', '');
    heroHeader?.removeAttribute('inert');
  };

  const syncHeader = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const hideThreshold = insetOffset + 8;

    if (stickyVisible) {
      if (heroBottom > hideThreshold) {
        setStickyVisible(false);
      }

      return;
    }

    if (heroBottom <= insetOffset) {
      setStickyVisible(true);
    }
  };

  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    requestAnimationFrame(() => {
      syncHeader();
      ticking = false;
    });
  };

  setStickyVisible(false);
  syncHeader();

  window.addEventListener('scroll', onScroll, { passive: true, signal });
  window.addEventListener(
    'resize',
    () => {
      insetOffset = parseFloat(getComputedStyle(heroSection).paddingBottom) || 0;
      syncHeader();
    },
    { passive: true, signal },
  );

  cleanup = () => {
    controller.abort();
  };
}
