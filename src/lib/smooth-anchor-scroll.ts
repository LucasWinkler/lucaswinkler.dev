function linkHash(href: string): string | null {
  try {
    const hash = new URL(href, window.location.href).hash;

    if (!hash || hash === '#') {
      return null;
    }

    return hash;
  } catch {
    return null;
  }
}

function isSamePageLink(href: string): boolean {
  try {
    const url = new URL(href, window.location.href);

    return url.origin === window.location.origin && url.pathname === window.location.pathname;
  } catch {
    return false;
  }
}

function hashTarget(hash: string): HTMLElement | null {
  try {
    const target = document.querySelector(hash);

    return target instanceof HTMLElement ? target : null;
  } catch {
    return null;
  }
}

function cleanUrl(): void {
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

function scrollToHashFromUrl(): void {
  const hash = window.location.hash;

  if (!hash || hash === '#') {
    return;
  }

  const target = hashTarget(hash);

  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior: 'auto', block: 'start' });
}

export function initSmoothAnchorScroll(): void {
  scrollToHashFromUrl();

  const clickScrollBehavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

  document.addEventListener(
    'click',
    event => {
      const link = (event.target as Element | null)?.closest('a[href*="#"]');

      if (!(link instanceof HTMLAnchorElement) || link.classList.contains('skip-link')) {
        return;
      }

      const href = link.getAttribute('href');

      if (!href || !isSamePageLink(href)) {
        return;
      }

      const hash = linkHash(href);

      if (!hash) {
        return;
      }

      const target = hashTarget(hash);

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: clickScrollBehavior, block: 'start' });
      cleanUrl();
    },
    { capture: true },
  );
}
