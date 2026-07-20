import type { Cleanup } from './lifecycle';
import { prefersReducedMotion } from './lifecycle';

/**
 * Rotating typewriter effect for the hero.
 *
 * The first phrase is server-rendered inside the element so the line never
 * appears empty — the script picks up from there.
 */
export function initTyping(): Cleanup | void {
  const el = document.querySelector<HTMLElement>('[data-typing]');
  if (!el) return;

  let phrases: string[];
  try {
    phrases = JSON.parse(el.dataset.typing || '[]');
  } catch {
    return;
  }
  if (phrases.length < 2) return;

  const output = el.querySelector<HTMLElement>('[data-typing-output]');
  if (!output) return;

  // Reduced motion: cycle the full phrase without the per-character animation.
  if (prefersReducedMotion()) {
    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % phrases.length;
      output.textContent = phrases[index]!;
    }, 3000);
    return () => window.clearInterval(interval);
  }

  const TYPE_MS = 55;
  const ERASE_MS = 28;
  const HOLD_MS = 1900;

  let phraseIndex = 0;
  let charIndex = phrases[0]!.length;
  let erasing = true;
  let timer = 0;
  let stopped = false;

  const step = () => {
    if (stopped) return;

    const phrase = phrases[phraseIndex]!;

    if (erasing) {
      charIndex -= 1;
      output.textContent = phrase.slice(0, charIndex);

      if (charIndex <= 0) {
        erasing = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      timer = window.setTimeout(step, ERASE_MS);
      return;
    }

    charIndex += 1;
    output.textContent = phrases[phraseIndex]!.slice(0, charIndex);

    if (charIndex >= phrases[phraseIndex]!.length) {
      erasing = true;
      timer = window.setTimeout(step, HOLD_MS);
      return;
    }
    timer = window.setTimeout(step, TYPE_MS);
  };

  timer = window.setTimeout(step, HOLD_MS);

  return () => {
    stopped = true;
    window.clearTimeout(timer);
  };
}
