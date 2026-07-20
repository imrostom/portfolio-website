import type { Cleanup } from './lifecycle';
import { on } from './lifecycle';

/**
 * Copy-to-clipboard for the contact page.
 *
 * Delegated from the document so the number of contact rows doesn't affect the
 * listener count, and so rows rendered later still work.
 */
export function initClipboard(): Cleanup {
  const timers = new Map<HTMLElement, number>();

  const handler = async (event: Event) => {
    const target = event.target as Element | null;
    const button = target?.closest<HTMLElement>('[data-copy]');
    if (!button) return;

    const value = button.dataset.copy ?? '';
    const status = button.querySelector<HTMLElement>('[data-copy-status]');

    const succeeded = await copy(value);

    button.toggleAttribute('data-copied', succeeded);
    if (status) {
      status.textContent = succeeded ? 'Copied to clipboard' : 'Copy failed';
    }

    window.clearTimeout(timers.get(button));
    timers.set(
      button,
      window.setTimeout(() => {
        button.removeAttribute('data-copied');
        if (status) status.textContent = '';
      }, 2000),
    );
  };

  const off = on(document, 'click', handler);

  return () => {
    off();
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
  };
}

async function copy(value: string): Promise<boolean> {
  // The async clipboard API needs a secure context; fall back for plain http
  // and for browsers that reject the permission.
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      /* fall through to the legacy path */
    }
  }

  try {
    const area = document.createElement('textarea');
    area.value = value;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}
