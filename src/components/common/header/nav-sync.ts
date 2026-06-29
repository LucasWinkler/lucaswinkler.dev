const navSections = ['selected-work', 'experience'];

const navLinks = document.querySelectorAll<HTMLAnchorElement>('.site-header__link[href*="#"]');

function linkHash(href: string | null): string | null {
  if (!href) {
    return null;
  }

  const hashIndex = href.indexOf('#');

  if (hashIndex < 0) {
    return null;
  }

  return href.slice(hashIndex);
}

function setActiveSection(sectionId: string | null) {
  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (sectionId && linkHash(href) === `#${sectionId}`) {
      link.setAttribute('aria-current', 'page');
      return;
    }

    link.removeAttribute('aria-current');
  });
}

const sectionElements = navSections
  .map(id => document.getElementById(id))
  .filter((section): section is HTMLElement => section instanceof HTMLElement);

if (sectionElements.length > 0) {
  const syncActiveSection = () => {
    const marker = window.innerHeight * 0.35;
    let activeId: string | null = null;

    for (const section of sectionElements) {
      const { top, bottom } = section.getBoundingClientRect();

      if (top <= marker && bottom > marker) {
        activeId = section.id;
        break;
      }
    }

    if (!activeId) {
      const firstVisible = sectionElements.find(section => section.getBoundingClientRect().bottom > 0);
      const lastVisible = [...sectionElements]
        .reverse()
        .find(section => section.getBoundingClientRect().top < window.innerHeight);

      if (firstVisible && firstVisible.getBoundingClientRect().top > marker) {
        activeId = null;
      } else if (lastVisible && lastVisible.getBoundingClientRect().top <= marker) {
        activeId = lastVisible.id;
      }
    }

    setActiveSection(activeId);
  };

  syncActiveSection();
  window.addEventListener('scroll', syncActiveSection, { passive: true });
  window.addEventListener('resize', syncActiveSection, { passive: true });
}
