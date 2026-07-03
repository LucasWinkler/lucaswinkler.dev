let cleanup: (() => void) | undefined;

function getMenuPair(panel: HTMLElement): { toggle: HTMLButtonElement; bar: HTMLElement } | null {
  const bar = panel.closest<HTMLElement>('.site-header__bar');
  const toggle = bar?.querySelector<HTMLButtonElement>('.site-header__menu-toggle');

  if (!bar || !toggle) {
    return null;
  }

  return { toggle, bar };
}

function getHeroHeader(bar: HTMLElement): HTMLElement | null {
  return bar.closest<HTMLElement>('#site-header-hero');
}

function setHeroMenuMorph(bar: HTMLElement, open: boolean): void {
  const heroHeader = getHeroHeader(bar);

  if (!heroHeader) {
    return;
  }

  heroHeader.classList.toggle('is-menu-open', open);
}

function getMenuFocusables(panel: HTMLElement, toggle: HTMLButtonElement): HTMLElement[] {
  const panelLinks = [...panel.querySelectorAll<HTMLElement>('a[href]')];

  return [toggle, ...panelLinks];
}

function setPanelAccessibility(panel: HTMLElement, open: boolean): void {
  if (open) {
    panel.removeAttribute('inert');
    panel.removeAttribute('aria-hidden');
    return;
  }

  panel.setAttribute('inert', '');
  panel.setAttribute('aria-hidden', 'true');
}

function focusFirstMenuLink(panel: HTMLElement): void {
  const firstLink = panel.querySelector<HTMLElement>('a[href]');
  firstLink?.focus();
}

function handleMenuKeyDown(event: KeyboardEvent, panel: HTMLElement, toggle: HTMLButtonElement): void {
  if (event.key !== 'Tab' || !panel.classList.contains('is-open')) {
    return;
  }

  const focusables = getMenuFocusables(panel, toggle);
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function closeMenu(panel: HTMLElement, toggle: HTMLButtonElement): void {
  if (!panel.classList.contains('is-open')) {
    return;
  }

  panel.classList.remove('is-open');
  panel.classList.add('is-closing');
  toggle.setAttribute('aria-expanded', 'false');
  setPanelAccessibility(panel, false);
  toggle.focus();

  const bar = panel.closest<HTMLElement>('.site-header__bar');

  if (bar) {
    setHeroMenuMorph(bar, false);
  }

  let finished = false;

  const finishClosing = () => {
    if (finished) {
      return;
    }

    finished = true;
    panel.classList.remove('is-closing');
    panel.removeEventListener('transitionend', onTransitionEnd);
    window.clearTimeout(fallback);
  };

  const onTransitionEnd = (event: TransitionEvent) => {
    if (event.target !== panel || event.propertyName !== 'opacity') {
      return;
    }

    finishClosing();
  };

  panel.addEventListener('transitionend', onTransitionEnd);
  const fallback = window.setTimeout(finishClosing, 150);
}

function openMenu(panel: HTMLElement, toggle: HTMLButtonElement): void {
  panel.classList.remove('is-closing');
  panel.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  setPanelAccessibility(panel, true);

  const bar = panel.closest<HTMLElement>('.site-header__bar');

  if (bar) {
    setHeroMenuMorph(bar, true);
  }

  focusFirstMenuLink(panel);
}

export function closeAllHeaderMenus(): void {
  document.querySelectorAll<HTMLElement>('.site-header__menu-panel.is-open').forEach(panel => {
    const pair = getMenuPair(panel);

    if (pair) {
      closeMenu(panel, pair.toggle);
    }
  });
}

export function initHeaderMenu(): void {
  cleanup?.();

  const controller = new AbortController();
  const { signal } = controller;
  const bars = [...document.querySelectorAll<HTMLElement>('.site-header__bar')].filter(
    bar => bar.querySelector('.site-header__menu-toggle') && bar.querySelector('.site-header__menu-panel'),
  );

  bars.forEach(bar => {
    const toggle = bar.querySelector<HTMLButtonElement>('.site-header__menu-toggle');
    const panel = bar.querySelector<HTMLElement>('.site-header__menu-panel');

    if (!toggle || !panel) {
      return;
    }

    setPanelAccessibility(panel, false);

    toggle.addEventListener(
      'click',
      event => {
        event.stopPropagation();
        const isOpen = panel.classList.contains('is-open');

        if (isOpen) {
          closeMenu(panel, toggle);
          return;
        }

        closeAllHeaderMenus();
        openMenu(panel, toggle);
      },
      { signal },
    );

    bar.addEventListener(
      'keydown',
      event => {
        handleMenuKeyDown(event, panel, toggle);
      },
      { signal },
    );

    panel.querySelectorAll('a').forEach(link => {
      link.addEventListener(
        'click',
        () => {
          closeMenu(panel, toggle);
        },
        { signal },
      );
    });
  });

  document.addEventListener(
    'click',
    event => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const insideBar = bars.some(bar => bar.contains(target));

      if (!insideBar) {
        closeAllHeaderMenus();
      }
    },
    { signal },
  );

  document.addEventListener(
    'keydown',
    event => {
      if (event.key === 'Escape') {
        closeAllHeaderMenus();
      }
    },
    { signal },
  );

  cleanup = () => {
    controller.abort();
  };
}
