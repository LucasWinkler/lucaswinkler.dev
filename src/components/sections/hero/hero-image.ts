const img = document.querySelector('[data-hero-image]');

if (img instanceof HTMLImageElement) {
  const media = img.closest('.hero-panel__media');

  if (!media?.classList.contains('is-loaded')) {
    const isReady = () => img.complete && img.naturalWidth > 0;

    const reveal = (instant: boolean) => {
      if (media?.classList.contains('is-loaded')) {
        return;
      }

      if (instant) {
        media?.classList.add('is-instant');
      }

      img.classList.add('is-loaded');
      media?.classList.add('is-loaded');
    };

    const finish = (instant: boolean) => {
      if (isReady()) {
        reveal(instant);
      }
    };

    if (isReady()) {
      reveal(true);
    } else {
      img.addEventListener('load', () => finish(false), { once: true });

      if (isReady()) {
        reveal(true);
      } else if (img.complete) {
        img
          .decode()
          .then(() => finish(false))
          .catch(() => {});
      }
    }
  }
}
