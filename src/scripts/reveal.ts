import type { Cleanup } from './lifecycle';
import { prefersReducedMotion } from './lifecycle';

/**
 * Scroll-entrance animations.
 *
 * Elements opt in with `data-reveal="fade|slide|scale|blur"`. A parent carrying
 * `data-reveal-group` staggers its children automatically, so most sections need
 * no per-element delay bookkeeping.
 */
export function initReveal(): Cleanup | void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!targets.length) return;

  // Reduced motion: reveal everything immediately, skip the observer entirely.
  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  // Assign stagger delays within each group.
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  groups.forEach((group) => {
    const step = Number(group.dataset.revealGroup) || 80;

    // Descendants rather than direct children: revealed elements are often
    // wrapped in a layout <li>. Nested groups own their own children, so
    // anything belonging to a closer group is skipped here.
    const children = Array.from(group.querySelectorAll<HTMLElement>('[data-reveal]')).filter(
      (child) => child.closest('[data-reveal-group]') === group,
    );

    children.forEach((child, index) => {
      // An explicit inline delay always wins over the group's stagger.
      if (!child.style.getPropertyValue('--reveal-delay')) {
        child.style.setProperty('--reveal-delay', `${index * step}ms`);
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        // Entrance animations play once — stop watching as soon as one fires.
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => {
    // Anything already on screen at load reveals without waiting for a scroll.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-revealed');
      return;
    }
    observer.observe(el);
  });

  return () => observer.disconnect();
}
