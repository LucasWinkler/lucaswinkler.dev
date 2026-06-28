const header = document.getElementById('site-header');
const heroPanel = document.querySelector('#hero .hero-panel');
const headerInner = header?.querySelector('.site-header__inner');
const headerBrand = header?.querySelector('.site-header__brand');
const headerNav = header?.querySelector('.site-header__nav');

if (header && heroPanel && headerInner && headerBrand && headerNav) {
  let ticking = false;
  let wasPinned = false;

  const readPaddingTop = (scrolled: 'true' | 'false') => {
    header.dataset.scrolled = scrolled;
    return parseFloat(getComputedStyle(header).paddingTop) || 0;
  };

  const syncStickyBarWidth = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const padX = parseFloat(rootStyles.getPropertyValue('--header-bar-padding-x')) * 2 || 32;
    const gap = parseFloat(getComputedStyle(headerInner).columnGap) || 0;
    const contentWidth = Math.ceil(
      headerBrand.getBoundingClientRect().width + headerNav.getBoundingClientRect().width + gap + padX,
    );

    header.style.setProperty('--header-bar-max-sticky', `${contentWidth}px`);
  };

  const readPinThreshold = () => {
    const padFalse = readPaddingTop('false');
    header.dataset.scrolled = 'true';
    const padTrue = readPaddingTop('true');
    const bar = header.querySelector('.site-header__bar');
    const barPadY = bar ? parseFloat(getComputedStyle(bar).paddingTop) || 0 : 0;
    header.dataset.scrolled = 'false';

    return padFalse - padTrue - barPadY;
  };

  let pinThreshold = readPinThreshold();
  header.dataset.scrolled = 'false';

  const syncHeader = () => {
    const rect = heroPanel.getBoundingClientRect();
    const pinned = rect.top <= -pinThreshold;

    if (pinned) {
      if (!wasPinned) {
        header.dataset.scrolled = 'true';
        header.style.removeProperty('top');
        header.style.removeProperty('left');
        header.style.removeProperty('width');
        wasPinned = true;
      }

      return;
    }

    if (wasPinned) {
      header.dataset.scrolled = 'false';
      wasPinned = false;
    }

    header.style.top = `${rect.top}px`;
    header.style.left = `${rect.left}px`;
    header.style.width = `${rect.width}px`;
  };

  const onScroll = () => {
    if (ticking) return;
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
      pinThreshold = readPinThreshold();
      header.dataset.scrolled = 'false';
      syncHeader();
    },
    { passive: true },
  );

  if (document.fonts) {
    document.fonts.ready.then(syncStickyBarWidth);
  }
}
