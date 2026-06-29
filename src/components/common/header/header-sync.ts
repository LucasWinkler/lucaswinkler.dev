const heroSection = document.getElementById('hero');
const stickyHeader = document.getElementById('site-header-sticky');

if (heroSection && stickyHeader) {
  let ticking = false;
  let stickyVisible = false;
  let insetOffset = parseFloat(getComputedStyle(heroSection).paddingBottom) || 0;
  let hideAccessibilityTimer: ReturnType<typeof setTimeout> | undefined;
  let onBarTransitionEnd: ((event: TransitionEvent) => void) | undefined;
  const headerBar = stickyHeader.querySelector<HTMLElement>('.site-header__bar');

  const clearHideAccessibility = () => {
    if (hideAccessibilityTimer !== undefined) {
      clearTimeout(hideAccessibilityTimer);
      hideAccessibilityTimer = undefined;
    }

    if (headerBar && onBarTransitionEnd) {
      headerBar.removeEventListener('transitionend', onBarTransitionEnd);
      onBarTransitionEnd = undefined;
    }
  };

  const applyHideAccessibility = () => {
    stickyHeader.setAttribute('aria-hidden', 'true');
    stickyHeader.setAttribute('inert', '');
  };

  const scheduleHideAccessibility = () => {
    clearHideAccessibility();

    const finishHideAccessibility = () => {
      if (stickyHeader.dataset.visible !== 'false') {
        return;
      }

      clearHideAccessibility();
      applyHideAccessibility();
    };

    onBarTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== headerBar || event.propertyName !== 'opacity') {
        return;
      }

      finishHideAccessibility();
    };

    if (headerBar) {
      headerBar.addEventListener('transitionend', onBarTransitionEnd);
    }

    hideAccessibilityTimer = setTimeout(finishHideAccessibility, 400);
  };

  const setStickyVisible = (visible: boolean) => {
    if (visible === stickyVisible) {
      return;
    }

    stickyVisible = visible;

    if (visible) {
      clearHideAccessibility();
      stickyHeader.dataset.visible = 'true';
      stickyHeader.removeAttribute('aria-hidden');
      stickyHeader.removeAttribute('inert');
      return;
    }

    stickyHeader.dataset.visible = 'false';
    scheduleHideAccessibility();
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

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener(
    'resize',
    () => {
      insetOffset = parseFloat(getComputedStyle(heroSection).paddingBottom) || 0;
      syncHeader();
    },
    { passive: true },
  );
}
