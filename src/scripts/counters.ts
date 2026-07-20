import type { Cleanup } from './lifecycle';
import { prefersReducedMotion } from './lifecycle';

/**
 * Count-up statistics.
 *
 * The final value is rendered server-side, so the correct number is in the HTML
 * before any script runs — for search engines, print, and anyone whose JS never
 * loads. This only replaces it with an animation on scroll entry.
 *
 * A plain rAF loop rather than an animation library: this animates a number, not
 * an element, so there is nothing a library would do better, and dropping the
 * dependency removed roughly 12 KB from the bundle.
 */
export function initCounters(): Cleanup | void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!counters.length) return;

  /** Snap to the finished value without animating. */
  const settle = () => {
    counters.forEach((el) => {
      const { counterPrefix = '', counterSuffix = '', counterValue = '0' } = el.dataset;
      el.textContent = `${counterPrefix}${counterValue}${counterSuffix}`;
    });
  };

  if (prefersReducedMotion()) {
    settle();
    return;
  }

  const running: Cleanup[] = [];

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        running.push(runCounter(entry.target as HTMLElement));
      }
    },
    { threshold: 0.35 },
  );

  counters.forEach((el) => observer.observe(el));

  return () => {
    observer.disconnect();
    running.forEach((stop) => stop());
    // Leave the finished value behind rather than a number frozen mid-count.
    settle();
  };
}

/** Counts from zero to the target on an ease-out curve. */
function runCounter(el: HTMLElement): Cleanup {
  const target = Number(el.dataset.counterValue) || 0;
  const duration = Number(el.dataset.counterDuration) || 1800;
  const prefix = el.dataset.counterPrefix ?? '';
  const suffix = el.dataset.counterSuffix ?? '';

  let frame = 0;
  let start = 0;

  const tick = (now: number) => {
    if (!start) start = now;
    const progress = Math.min((now - start) / duration, 1);
    // Close enough to --ease-out-expo for a number ticking up.
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    el.textContent = `${prefix}${Math.round(eased * target)}${suffix}`;

    if (progress < 1) frame = requestAnimationFrame(tick);
    else el.textContent = `${prefix}${target}${suffix}`;
  };

  frame = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(frame);
}
