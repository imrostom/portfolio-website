import type { Cleanup } from './lifecycle';
import { on, rafThrottle } from './lifecycle';

/**
 * Persistent page furniture: header condense-on-scroll, reading-progress bar,
 * back-to-top visibility and the mobile navigation drawer.
 */
export function initChrome(): Cleanup {
  const cleanups: Cleanup[] = [initScrollState(), initMobileNav(), initBackToTop()].filter(
    (fn): fn is Cleanup => typeof fn === 'function',
  );

  return () => cleanups.forEach((fn) => fn());
}

function initScrollState(): Cleanup {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const toTop = document.querySelector<HTMLElement>('[data-back-to-top]');

  const update = rafThrottle(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    header?.toggleAttribute('data-scrolled', y > 16);
    toTop?.toggleAttribute('data-visible', y > 600);

    if (progress) {
      // Guard against division by zero on pages shorter than the viewport.
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }
  });

  const off = on(window, 'scroll', update, { passive: true });
  const offResize = on(window, 'resize', update, { passive: true });
  update();

  return () => {
    off();
    offResize();
    update.cancel();
  };
}

function initBackToTop(): Cleanup | void {
  const button = document.querySelector<HTMLElement>('[data-back-to-top]');
  if (!button) return;

  const click = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    // Return focus to the top of the document so keyboard users follow the jump.
    document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true });
  };

  return on(button as HTMLElement, 'click', click);
}

/**
 * Mobile drawer. The trigger owns `aria-expanded`; the panel is fully removed
 * from the accessibility tree when closed via the `hidden` attribute.
 */
function initMobileNav(): Cleanup | void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
  if (!toggle || !panel) return;

  let open = false;

  const setOpen = (next: boolean) => {
    open = next;
    toggle.setAttribute('aria-expanded', String(next));

    if (next) {
      panel.hidden = false;
      // Let the element paint before animating in.
      requestAnimationFrame(() => panel.setAttribute('data-open', ''));
      document.body.style.overflow = 'hidden';
      panel.querySelector<HTMLElement>('a, button')?.focus();
    } else {
      panel.removeAttribute('data-open');
      document.body.style.overflow = '';
      // Match the CSS close transition before hiding from the a11y tree.
      window.setTimeout(() => {
        if (!open) panel.hidden = true;
      }, 250);
    }
  };

  const onToggle = () => setOpen(!open);

  /**
   * Focusable elements while the drawer is open: everything inside it, plus the
   * toggle itself, which sits outside the panel but must stay reachable so the
   * drawer can be closed from the keyboard.
   */
  const focusables = (): HTMLElement[] => [
    toggle,
    ...panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ];

  const onKeydown = (event: KeyboardEvent) => {
    if (!open) return;

    if (event.key === 'Escape') {
      setOpen(false);
      toggle.focus();
      return;
    }

    // Trap Tab inside the drawer. Without this, focus walks off into the page
    // behind a full-screen overlay, which is invisible and unusable.
    if (event.key !== 'Tab') return;

    const items = focusables();
    if (!items.length) return;

    const first = items[0]!;
    const last = items[items.length - 1]!;
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey ? active === first : active === last) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (active && !items.includes(active)) {
      // Focus escaped the drawer entirely (e.g. from the address bar).
      event.preventDefault();
      first.focus();
    }
  };

  // Any navigation inside the drawer should close it.
  const onPanelClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (target?.closest('a')) setOpen(false);
  };

  const onResize = () => {
    // The drawer is mobile-only; leaving it open across the breakpoint would
    // strand `overflow: hidden` on the body.
    if (open && window.matchMedia('(min-width: 1024px)').matches) setOpen(false);
  };

  const offToggle = on(toggle, 'click', onToggle);
  const offKey = on(document, 'keydown', onKeydown);
  const offPanel = on(panel, 'click', onPanelClick);
  const offResize = on(window, 'resize', onResize, { passive: true });

  return () => {
    offToggle();
    offKey();
    offPanel();
    offResize();
    document.body.style.overflow = '';
  };
}
