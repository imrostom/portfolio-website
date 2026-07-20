// Explicit .ts extension: this module is also imported directly by
// scripts/generate-assets.mjs under Node's ESM resolver, which does not do
// extensionless resolution. Astro's tsconfig enables allowImportingTsExtensions.
import { site } from './site.ts';

/** Narrative content for the About page. */

export const intro = {
  heading: 'I build products that solve real business problems.',
  paragraphs: [
    `I'm a Senior Full Stack Engineer with more than ${site.yearsExperience} years spent close to the parts of software that decide whether a business runs smoothly or grinds. Most of that time has gone into SaaS platforms, logistics systems and commercial products where an outage or a slow query is something a real team feels immediately.`,
    'My work sits mostly in Laravel and Node.js on the backend, with Vue and Nuxt on the front. But the language matters less to me than the shape of the problem. The interesting questions are usually about tenancy boundaries, where state should live, what happens under load, and which manual process is quietly costing someone a day a week.',
    "I care much more about outcomes than output. Writing code is the easy part; the value is in understanding the workflow well enough to know what actually needs building — and what doesn't.",
  ],
};

export type JourneyEntry = {
  year: string;
  title: string;
  description: string;
  icon: string;
};

export const journey: JourneyEntry[] = [
  {
    year: '2018',
    title: 'Started with commercial PHP products',
    description:
      'Joined Inilabs building Laravel applications sold on CodeCanyon. Supporting international buyers taught me early that configurability and clear documentation are features, not extras.',
    icon: 'lucide:code',
  },
  {
    year: '2021',
    title: 'Moved into multi-tenant SaaS',
    description:
      'At WPDeveloper I became a core engineer on Easy.jobs, where tenant isolation, permissions and pipeline design stopped being theory and became daily work.',
    icon: 'lucide:layers',
  },
  {
    year: '2022',
    title: 'Learned to scale under real load',
    description:
      'Queue architecture, Redis caching and query profiling across TrustSync and GreenMailer. This is where I developed the instinct for finding the one query that is quietly costing everything.',
    icon: 'lucide:gauge',
  },
  {
    year: '2023',
    title: 'Commerce and Shopify apps',
    description:
      'Extended into the commerce ecosystem, building Shopify integrations and the Posify point-of-sale platform with offline-tolerant sales capture.',
    icon: 'simple-icons:shopify',
  },
  {
    year: '2024',
    title: 'AI as a product capability',
    description:
      'Started shipping LLM-backed features into production — document parsing, structured extraction and demand forecasting in FoodPilot — using Claude, OpenAI and Gemini where they genuinely beat a deterministic approach.',
    icon: 'lucide:brain-circuit',
  },
  {
    year: '2025',
    title: 'Logistics engineering for a Swiss operator',
    description:
      'Joined Tixpi to build logistics and moving operations software for a Swiss company — modelling the full job lifecycle from quote to invoice, and automating the coordination around it.',
    icon: 'lucide:truck',
  },
];

export type FocusArea = {
  title: string;
  description: string;
  icon: string;
};

export const focusAreas: FocusArea[] = [
  {
    title: 'Laravel',
    description: `${site.yearsExperience} years of production Laravel — domain modelling, queues, policies and the patterns that keep a large codebase navigable.`,
    icon: 'simple-icons:laravel',
  },
  {
    title: 'Node.js',
    description:
      'Queue-driven services and versioned REST APIs where throughput and predictable latency matter more than raw feature count.',
    icon: 'simple-icons:nodedotjs',
  },
  {
    title: 'SaaS',
    description:
      'Multi-tenant architecture, subscription and role models, and the operational tooling a support team needs on day one.',
    icon: 'lucide:layers',
  },
  {
    title: 'Shopify',
    description:
      'Apps and storefront integrations built against the Admin and Storefront APIs, respecting rate limits and webhook reliability.',
    icon: 'simple-icons:shopify',
  },
  {
    title: 'AI',
    description:
      'LLM features that ship: structured extraction, document understanding and forecasting, with evaluation and fallbacks around them.',
    icon: 'lucide:brain-circuit',
  },
  {
    title: 'Cloud',
    description:
      'Containerised deployments on AWS and DigitalOcean behind Nginx, with monitoring and sensible cost boundaries.',
    icon: 'lucide:cloud',
  },
];

export const principles = [
  {
    title: 'Understand the workflow first',
    description:
      'The best performance win I ever shipped was deleting a screen nobody used. Start with how the work actually happens.',
    icon: 'lucide:search',
  },
  {
    title: 'Optimise what is measured',
    description:
      'Profile before rewriting. Most systems have one or two real bottlenecks and a lot of imagined ones.',
    icon: 'lucide:activity',
  },
  {
    title: 'Boring where it counts',
    description:
      'Predictable, well-understood tools in the core of a system. Save the novelty for places where failure is cheap.',
    icon: 'lucide:shield-check',
  },
  {
    title: 'Leave it navigable',
    description:
      'Someone inherits every codebase eventually. Clear naming and honest comments are a kindness to that person.',
    icon: 'lucide:map',
  },
];
