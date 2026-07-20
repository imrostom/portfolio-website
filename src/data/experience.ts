export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  start: string;
  end: string | null;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
  icon: string;
};

export const experiences: Experience[] = [
  {
    id: 'tixpi',
    company: 'Tixpi',
    role: 'Senior Full Stack Developer',
    location: 'Zurich, Switzerland · Remote',
    period: 'Jan 2025 — Present',
    start: '2025-01',
    end: null,
    current: true,
    summary:
      'Partnering with a Swiss logistics and moving company to design and build the platform that runs their day-to-day operations — from quoting and dispatch through to invoicing.',
    highlights: [
      'Designed and developed scalable logistics management software covering quoting, job scheduling, fleet dispatch and invoicing for a Swiss moving operator.',
      'Built and documented versioned REST APIs that serve the customer portal, the internal operations dashboard and third-party partner integrations.',
      'Delivered the Nuxt frontend as a server-rendered application with a shared component library, cutting the time to ship a new internal screen from days to hours.',
      'Engineered the Node.js backend around queue-driven background jobs so long-running route and pricing calculations never block a request.',
      'Automated recurring operational workflows — dispatch notifications, document generation and invoice reminders — removing hours of manual coordination each week.',
    ],
    stack: ['Node.js', 'Nuxt', 'Vue', 'TypeScript', 'MySQL', 'Redis', 'Docker', 'AWS'],
    icon: 'lucide:truck',
  },
  {
    id: 'wpdeveloper',
    company: 'WPDeveloper',
    role: 'Full Stack Engineer — SaaS Products',
    location: 'Dhaka, Bangladesh',
    period: 'Oct 2021 — Dec 2024',
    start: '2021-10',
    end: '2024-12',
    summary:
      'Led and scaled multi-tenant SaaS products, including Easy.jobs which grew past 20,000 companies, working across the product line from recruitment software to Shopify apps and deliverability tooling.',
    highlights: [
      'Led engineering on Easy.jobs, a multi-tenant recruitment and applicant-tracking SaaS grown to 20,000+ companies, owning tenant isolation, role-based permissions and the candidate pipeline.',
      'Built TrustSync, a review aggregation and social-proof platform that pulls in ratings from multiple providers and renders them through an embeddable widget.',
      'Developed GreenMailer, an email marketing and automation tool with campaign scheduling, list segmentation and delivery analytics.',
      'Introduced a queue-based architecture for imports and bulk mail so large tenant jobs run predictably without degrading shared infrastructure.',
      'Built Shopify apps and storefront integrations against the Admin and Storefront APIs, handling rate limits, webhook reliability and merchant data sync.',
      'Established code review standards and automated test coverage across the product line, meaningfully reducing regressions reaching production.',
    ],
    stack: ['Laravel', 'PHP', 'Vue', 'Shopify', 'MySQL', 'Redis', 'AWS', 'Nginx'],
    icon: 'lucide:layers',
  },
  {
    id: 'inilabs',
    company: 'Inilabs',
    role: 'Software Engineer — Commercial Products',
    location: 'Dhaka, Bangladesh',
    period: 'Feb 2018 — Sep 2021',
    start: '2018-02',
    end: '2021-09',
    summary:
      'Built commercially distributed web applications sold through CodeCanyon, supporting a large and demanding international customer base.',
    highlights: [
      'Shipped commercial PHP and Laravel applications on CodeCanyon to buyers across 30+ countries, supporting a large international customer base.',
      'Built LibraryHub, a library management system covering cataloguing, circulation, member management and reporting.',
      'Maintained a customisation and support pipeline for an international customer base, turning recurring requests into configurable product features.',
      'Implemented multi-language and multi-currency support so a single codebase could serve international markets without forking.',
    ],
    stack: ['Laravel', 'PHP', 'jQuery', 'MySQL', 'Bootstrap'],
    icon: 'lucide:package',
  },
];

/** Condensed education entries used on the résumé page. */
export type Education = {
  institution: string;
  credential: string;
  period: string;
  detail: string;
};

/**
 * Education is intentionally empty until real credentials are supplied. The
 * résumé page and PDF omit the section entirely when this is empty rather than
 * display anything unverified.
 */
export const education: Education[] = [];

export const achievements = [
  {
    title: 'Scaled a multi-tenant SaaS to production reliability',
    detail:
      'Led Easy.jobs from a single-tenant prototype to a hardened multi-tenant platform serving more than 20,000 companies.',
    icon: 'lucide:trending-up',
  },
  {
    title: 'Built a Swiss logistics platform end to end',
    detail:
      'Designed and delivered the operations software behind quoting, job scheduling, fleet dispatch, document generation and invoicing for a Swiss moving company.',
    icon: 'lucide:truck',
  },
  {
    title: 'Commercial products across 30+ countries',
    detail:
      'Authored and maintained CodeCanyon applications adopted by international buyers, with multi-language and multi-currency support.',
    icon: 'lucide:globe',
  },
  {
    title: 'AI features shipped to production',
    detail:
      'Integrated Claude, OpenAI and Gemini models into live products for document parsing, structured extraction and assisted workflows.',
    icon: 'lucide:brain-circuit',
  },
];
