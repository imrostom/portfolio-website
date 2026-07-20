/**
 * Tiny lifecycle helper for the client bundle.
 *
 * Because the site uses the view-transition client router, the document is
 * swapped without a full reload. Every behaviour therefore has to (a) run again
 * after each navigation and (b) tear down the listeners and observers it created
 * for the outgoing page, or they leak on every click.
 */

export type Cleanup = () => void;
export type Module = () => Cleanup | void;

/** True when the visitor has asked the OS to reduce motion. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True for coarse pointers (touch), where hover-driven effects don't apply. */
export const isCoarsePointer = (): boolean => window.matchMedia('(pointer: coarse)').matches;

/**
 * Registers modules to run on every page load and tears them down before each
 * swap. Also handles the case where the router restores a page from bfcache.
 */
export function register(modules: Module[]): void {
  let cleanups: Cleanup[] = [];

  const setup = () => {
    cleanups = modules
      .map((mod) => {
        try {
          return mod() ?? undefined;
        } catch (error) {
          // One failing behaviour must never take down the rest of the page.
          console.error('[portfolio] module failed to initialise', error);
          return undefined;
        }
      })
      .filter((fn): fn is Cleanup => typeof fn === 'function');
  };

  const teardown = () => {
    for (const cleanup of cleanups) {
      try {
        cleanup();
      } catch (error) {
        console.error('[portfolio] module failed to clean up', error);
      }
    }
    cleanups = [];
  };

  document.addEventListener('astro:page-load', setup);
  document.addEventListener('astro:before-swap', teardown);
}

/**
 * Adds an event listener and returns its disposer, so callers can collect
 * cleanups without repeating the removeEventListener signature.
 */
export function on<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
export function on<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
export function on<K extends keyof HTMLElementEventMap>(
  target: HTMLElement,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
): Cleanup;
export function on(
  target: EventTarget,
  type: string,
  handler: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions,
): Cleanup {
  target.addEventListener(type, handler, options);
  return () => target.removeEventListener(type, handler, options);
}

/** Batches work into the next animation frame, collapsing duplicate calls. */
export function rafThrottle<T extends unknown[]>(fn: (...args: T) => void) {
  let frame = 0;
  let latest: T;

  const wrapped = (...args: T) => {
    latest = args;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...latest);
    });
  };

  wrapped.cancel = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  return wrapped;
}
