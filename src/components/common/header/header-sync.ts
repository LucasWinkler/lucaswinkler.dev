const heroHeader = document.getElementById('site-header-hero');
const stickyHeader = document.getElementById('site-header-sticky');
const stickyInner = stickyHeader?.querySelector('.site-header__inner');
const stickyBrand = stickyHeader?.querySelector('.site-header__brand');
const stickyNav = stickyHeader?.querySelector('.site-header__nav');

if (heroHeader && stickyHeader && stickyInner && stickyBrand && stickyNav) {
  let ticking = false;
  let stickyVisible = false;

  const syncStickyBarWidth = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const padX = parseFloat(rootStyles.getPropertyValue('--header-bar-padding-x')) * 2 || 32;
    const gap = parseFloat(getComputedStyle(stickyInner).columnGap) || 0;
    const contentWidth = Math.ceil(
      stickyBrand.getBoundingClientRect().width + stickyNav.getBoundingClientRect().width + gap + padX,
    );

    stickyHeader.style.setProperty('--header-bar-max-sticky', `${contentWidth}px`);
  };

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
    const heroBottom = heroHeader.getBoundingClientRect().bottom;

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

  syncStickyBarWidth();
  syncHeader();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener(
    'resize',
    () => {
      syncStickyBarWidth();
      syncHeader();
    },
    { passive: true },
  );

  if (document.fonts) {
    document.fonts.ready.then(syncStickyBarWidth);
  }
}
