import type { Cleanup } from './lifecycle';

/**
 * Highlights the résumé sidebar link matching the section currently in view.
 */
export function initScrollSpy(): Cleanup | void {
  const nav = document.querySelector<HTMLElement>('[data-scrollspy]');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  if (!links.length) return;

  const sections = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;

  const setActive = (id: string) => {
    links.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.toggleAttribute('data-active', active);
      // aria-current communicates position to assistive tech, not just colour.
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Several sections can be on screen at once; pick the one nearest the top
      // of the viewport rather than whichever fired last.
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
  setActive(sections[0]!.id);

  return () => observer.disconnect();
}
