// Explicit .ts extension: this module is also imported directly by
// scripts/generate-assets.mjs under Node's ESM resolver, which does not do
// extensionless resolution. Astro's tsconfig enables allowImportingTsExtensions.
import { site } from './site.ts';

/**
 * Résumé-specific copy. Experience, education, skills and projects are reused
 * from their own modules so the résumé can never drift from the rest of the site.
 */

export const summary = {
  headline: `Senior Full Stack Engineer · ${site.yearsExperience}+ years`,
  body: `Senior Full Stack Engineer specialising in scalable SaaS platforms, logistics systems and AI-integrated products. ${site.yearsExperience}+ years building and operating production software across Laravel, Node.js, Vue and Nuxt, with deep experience in multi-tenant architecture, REST API design and performance optimisation. Currently building logistics and moving operations software for a Swiss company at Tixpi, working remotely with a distributed team.`,
  facts: [
    { label: 'Experience', value: `${site.yearsExperience}+ years`, icon: 'lucide:calendar-days' },
    {
      label: 'Current role',
      value: 'Senior Full Stack Developer, Tixpi',
      icon: 'lucide:briefcase',
    },
    { label: 'Base', value: 'Dhaka, Bangladesh · Remote', icon: 'lucide:map-pin' },
    { label: 'Focus', value: 'SaaS · Logistics · AI · Commerce', icon: 'lucide:target' },
  ],
};

export type ResumeSection = {
  id: string;
  label: string;
  icon: string;
};

/** Drives the sticky sidebar navigation and the scroll-spy on the résumé page. */
export const resumeSections: ResumeSection[] = [
  { id: 'summary', label: 'Summary', icon: 'lucide:user-round' },
  { id: 'experience', label: 'Experience', icon: 'lucide:briefcase' },
  { id: 'projects', label: 'Projects', icon: 'lucide:layout-grid' },
  { id: 'skills', label: 'Technical Skills', icon: 'lucide:sparkles' },
  { id: 'education', label: 'Education', icon: 'lucide:graduation-cap' },
  { id: 'achievements', label: 'Achievements', icon: 'lucide:award' },
];
