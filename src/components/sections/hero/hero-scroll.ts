const heroTrack = document.querySelector('.hero-scroll-track');
const heroShell = document.getElementById('hero');
const heroImage = document.querySelector('[data-hero-image]');
const scrollRange = 140;

const easeOut = (value: number) => 1 - Math.pow(1 - value, 2);

if (heroTrack instanceof HTMLElement && heroShell) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;
  let lastProgress = reduceMotion ? 1 : -1;

  heroTrack.style.setProperty('--hero-scroll-range', `${scrollRange}px`);

  if (reduceMotion) {
    heroTrack.dataset.motion = 'reduce';
  }

  const readTokens = () => {
    const rootStyles = getComputedStyle(document.documentElement);

    heroShell.style.setProperty('--hero-inset-x-px', rootStyles.getPropertyValue('--hero-inset-x'));
    heroShell.style.setProperty('--hero-inset-y-px', rootStyles.getPropertyValue('--hero-inset-y'));
    heroShell.style.setProperty('--hero-radius-px', rootStyles.getPropertyValue('--radius-hero'));
  };

  const syncScroll = () => {
    if (!reduceMotion && lastProgress >= 1 && window.scrollY / scrollRange >= 1) {
      return;
    }

    const progress = reduceMotion ? 1 : easeOut(Math.min(1, window.scrollY / scrollRange));

    if (progress === lastProgress) {
      return;
    }

    lastProgress = progress;
    heroShell.style.setProperty('--hero-progress', String(progress));
    heroTrack.dataset.settled = progress >= 1 ? 'true' : 'false';
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      syncScroll();
      ticking = false;
    });
  };

  readTokens();
  syncScroll();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener(
    'resize',
    () => {
      readTokens();
      syncScroll();
    },
    { passive: true },
  );
}

if (heroImage instanceof HTMLImageElement) {
  const media = heroImage.closest('.hero-panel__media');

  const reveal = () => {
    heroImage.classList.add('is-loaded');
    media?.classList.add('is-loaded');
  };

  if (heroImage.complete) {
    reveal();
  } else {
    heroImage.addEventListener('load', reveal, { once: true });
  }
}
