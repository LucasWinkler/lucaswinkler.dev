const heroImage = document.querySelector('[data-hero-image]');

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
