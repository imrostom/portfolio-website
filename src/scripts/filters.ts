import type { Cleanup } from './lifecycle';
import { on } from './lifecycle';

/**
 * Category filtering on the projects page.
 *
 * Every project is server-rendered; filtering only toggles visibility, so the
 * full list is always in the HTML for crawlers and for visitors without JS.
 */
export function initFilters(): Cleanup | void {
  const root = document.querySelector<HTMLElement>('[data-filter-root]');
  if (!root) return;

  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-filter]');
  // Scoped to the explicit filter hook: `data-category` also appears on the
  // card inside each item, which would otherwise be counted twice.
  const items = root.querySelectorAll<HTMLElement>('[data-filter-item]');
  const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
  const count = root.querySelector<HTMLElement>('[data-filter-count]');
  if (!buttons.length || !items.length) return;

  const apply = (category: string) => {
    let visible = 0;

    items.forEach((item) => {
      const matches = category === 'All' || item.dataset.category === category;
      if (matches) visible += 1;

      // `hidden` keeps filtered-out cards out of the a11y tree and tab order,
      // which a class-only approach would not.
      item.hidden = !matches;
      item.toggleAttribute('data-filtered-in', matches);
    });

    buttons.forEach((button) => {
      const active = button.dataset.filter === category;
      button.toggleAttribute('data-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    if (empty) empty.hidden = visible > 0;
    if (count) {
      count.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
    }
  };

  const handler = (event: MouseEvent) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-filter]');
    if (!button) return;
    apply(button.dataset.filter ?? 'All');
  };

  const off = on(root, 'click', handler as EventListener);

  return () => {
    off();
    // Restore the unfiltered list so a cached page never returns filtered.
    items.forEach((item) => {
      item.hidden = false;
      item.removeAttribute('data-filtered-in');
    });
  };
}
