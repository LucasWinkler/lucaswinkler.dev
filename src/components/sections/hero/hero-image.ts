const heroImage = document.querySelector('[data-hero-image]');

if (heroImage instanceof HTMLImageElement) {
  const media = heroImage.closest('.hero-panel__media');

  if (media?.classList.contains('is-loaded')) {
    return;
  }

  const reveal = (instant: boolean) => {
    if (instant) {
      media?.classList.add('is-instant');
    }

    heroImage.classList.add('is-loaded');
    media?.classList.add('is-loaded');
  };

  if (heroImage.complete && heroImage.naturalWidth > 0) {
    reveal(true);
  } else {
    heroImage.addEventListener('load', () => reveal(false), { once: true });
  }
}
