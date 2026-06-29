const heroSection = document.getElementById('hero');
const stickyHeader = document.getElementById('site-header-sticky');

if (heroSection && stickyHeader) {
  let ticking = false;
  let stickyVisible = false;
  let insetOffset = parseFloat(getComputedStyle(heroSection).paddingBottom) || 0;

  const setStickyVisible = (visible: boolean) => {
    if (visible === stickyVisible) {
      return;
    }

    stickyVisible = visible;

    if (visible) {
      stickyHeader.dataset.visible = 'true';
      stickyHeader.removeAttribute('aria-hidden');
      stickyHeader.removeAttribute('inert');
      return;
    }

    stickyHeader.dataset.visible = 'false';
    stickyHeader.setAttribute('aria-hidden', 'true');
    stickyHeader.setAttribute('inert', '');
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
