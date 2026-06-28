const heroSection = document.getElementById('hero');
const stickyHeader = document.getElementById('site-header-sticky');

if (heroSection && stickyHeader) {
  let ticking = false;
  let stickyVisible = false;

  const setStickyVisible = (visible: boolean) => {
    if (visible === stickyVisible) {
      return;
    }

    stickyVisible = visible;

    if (visible) {
      stickyHeader.dataset.visible = 'true';
      stickyHeader.removeAttribute('aria-hidden');
      return;
    }

    stickyHeader.dataset.visible = 'false';
    stickyHeader.setAttribute('aria-hidden', 'true');
  };

  const syncHeader = () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    if (stickyVisible) {
      if (heroBottom > 8) {
        setStickyVisible(false);
      }

      return;
    }

    if (heroBottom <= 0) {
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

  syncHeader();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', syncHeader, { passive: true });
}
