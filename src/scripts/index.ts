/**
 * Client entry point.
 *
 * One bundle, registered once. Each module is responsible for detecting whether
 * its markup is present on the current page and bailing out cheaply if not, so
 * page-specific behaviour costs nothing on pages that don't use it.
 */
import { register } from './lifecycle';
import { initReveal } from './reveal';
import { initCounters } from './counters';
import { initPointer } from './pointer';
import { initChrome } from './chrome';
import { initClipboard } from './clipboard';
import { initTyping } from './typing';
import { initFilters } from './filters';
import { initScrollSpy } from './scrollspy';

register([
  initReveal,
  initCounters,
  initPointer,
  initChrome,
  initClipboard,
  initTyping,
  initFilters,
  initScrollSpy,
]);
