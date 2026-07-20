import type { Cleanup } from './lifecycle';
import { isCoarsePointer, on, prefersReducedMotion, rafThrottle } from './lifecycle';

/**
 * Pointer-driven micro-interactions: magnetic buttons, card tilt, hero parallax
 * and the custom cursor.
 *
 * All of them are hover affordances, so they are skipped entirely on touch
 * devices and under reduced-motion — no listeners are attached at all in those
 * cases, rather than attaching and no-oping.
 */
export function initPointer(): Cleanup | void {
  if (prefersReducedMotion() || isCoarsePointer()) return;

  const cleanups: Cleanup[] = [initMagnetic(), initTilt(), initParallax(), initCursor()].filter(
    (fn): fn is Cleanup => typeof fn === 'function',
  );

  return () => cleanups.forEach((fn) => fn());
}

/** Buttons drift a few pixels toward the cursor while it is near them. */
function initMagnetic(): Cleanup | void {
  const elements = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  if (!elements.length) return;

  const cleanups: Cleanup[] = [];
  const STRENGTH = 0.32;
  const MAX = 12;

  elements.forEach((el) => {
    const move = rafThrottle((event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-MAX, Math.min(MAX, dx * STRENGTH));
      const y = Math.max(-MAX, Math.min(MAX, dy * STRENGTH));
      el.style.translate = `${x}px ${y}px`;
    });

    const reset = () => {
      move.cancel();
      el.style.translate = '0px 0px';
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    // Keyboard users never fire pointer events; make sure focus doesn't inherit
    // a stale offset from a previous hover.
    el.addEventListener('blur', reset);

    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      el.removeEventListener('blur', reset);
      reset();
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Cards rotate slightly in 3D following the cursor. */
function initTilt(): Cleanup | void {
  const elements = document.querySelectorAll<HTMLElement>('[data-tilt]');
  if (!elements.length) return;

  const cleanups: Cleanup[] = [];
  const MAX_DEG = 6;

  elements.forEach((el) => {
    const move = rafThrottle((event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalise cursor position within the card to -0.5 … 0.5.
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--tilt-y', `${px * MAX_DEG * 2}deg`);
      el.style.setProperty('--tilt-x', `${-py * MAX_DEG * 2}deg`);
    });

    const reset = () => {
      move.cancel();
      el.style.setProperty('--tilt-x', '0deg');
      el.style.setProperty('--tilt-y', '0deg');
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);

    cleanups.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
      reset();
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Floating hero elements drift against the cursor for a shallow depth effect. */
function initParallax(): Cleanup | void {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!elements.length) return;

  const move = rafThrottle((event: PointerEvent) => {
    const cx = event.clientX / window.innerWidth - 0.5;
    const cy = event.clientY / window.innerHeight - 0.5;

    elements.forEach((el) => {
      const depth = Number(el.dataset.parallax) || 12;
      el.style.setProperty('--parallax-x', `${-cx * depth}px`);
      el.style.setProperty('--parallax-y', `${-cy * depth}px`);
    });
  });

  const off = on(window, 'pointermove', move, { passive: true });

  return () => {
    off();
    move.cancel();
    elements.forEach((el) => {
      el.style.setProperty('--parallax-x', '0px');
      el.style.setProperty('--parallax-y', '0px');
    });
  };
}

/**
 * Custom cursor: a small solid dot that tracks exactly, plus a larger ring that
 * lags behind it. The ring expands over interactive elements.
 */
function initCursor(): Cleanup | void {
  const root = document.querySelector<HTMLElement>('.custom-cursor');
  if (!root) return;

  const dot = root.querySelector<HTMLElement>('.custom-cursor__dot');
  const ring = root.querySelector<HTMLElement>('.custom-cursor__ring');
  if (!dot || !ring) return;

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;
  let frame = 0;
  let visible = false;

  const move = (event: PointerEvent) => {
    targetX = event.clientX;
    targetY = event.clientY;

    if (!visible) {
      visible = true;
      root.dataset.active = '';
    }

    dot.style.translate = `${targetX}px ${targetY}px`;
  };

  const tick = () => {
    // Exponential smoothing gives the ring its trailing feel.
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.translate = `${ringX}px ${ringY}px`;
    frame = requestAnimationFrame(tick);
  };

  const over = (event: PointerEvent) => {
    const target = event.target as Element | null;
    const interactive = target?.closest('a, button, [role="button"], input, summary');
    root.toggleAttribute('data-hover', Boolean(interactive));
  };

  const leave = () => {
    visible = false;
    delete root.dataset.active;
  };

  const offMove = on(window, 'pointermove', move, { passive: true });
  const offOver = on(window, 'pointerover', over, { passive: true });
  const offLeave = on(document, 'pointerleave', leave);
  frame = requestAnimationFrame(tick);

  // Only now is it safe to hide the native cursor — see Cursor.astro.
  document.documentElement.dataset.customCursor = '';

  return () => {
    offMove();
    offOver();
    offLeave();
    cancelAnimationFrame(frame);
    delete document.documentElement.dataset.customCursor;
  };
}
