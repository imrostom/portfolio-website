/**
 * Minimal class-name joiner.
 *
 * Deliberately not `tailwind-merge`: every component here owns its own class
 * surface and callers append rather than override, so conflict resolution would
 * be dead weight in the bundle.
 */
export type ClassValue = string | number | null | false | undefined | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }

  return out.join(' ');
}
