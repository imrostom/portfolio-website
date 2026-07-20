import { projects } from './projects.ts';

/**
 * Single source of truth for identity, contact details and navigation.
 *
 * Everything a deployment needs to personalise lives in this file: swap the
 * values in `site` and `contact` and the whole site, its SEO metadata and its
 * JSON-LD structured data follow.
 */

/**
 * Month the professional career began (Inilabs). Every "N+ years" claim on the
 * site is derived from this, so the figure can never go stale — previously it
 * was a hardcoded 7 that would have quietly drifted wrong every January.
 */
const CAREER_START = '2018-02';

function yearsSince(iso: string): number {
  const [year, month] = iso.split('-').map(Number);
  const now = new Date();
  let total = now.getFullYear() - year!;
  // Not yet reached the anniversary month this year.
  if (now.getMonth() + 1 < month!) total -= 1;
  return total;
}

/** Real CV, supplied by hand and committed to `public/`. */
const RESUME_FILE = 'Md Rostom Ali.pdf';

export const site = {
  name: 'Md Rostom Ali',
  shortName: 'Rostom Ali',
  initials: 'RA',
  role: 'Senior Full Stack Engineer',
  tagline:
    'Building scalable SaaS platforms, AI-powered products, Shopify Apps, and high-performance backend systems.',
  description: `Senior Full Stack Engineer with ${yearsSince(CAREER_START)}+ years building scalable SaaS platforms, Shopify apps and high-performance backend systems in Laravel, Node.js and Vue.`,
  url: 'https://rostomali.online',
  locale: 'en_US',
  lang: 'en',
  careerStart: CAREER_START,
  yearsExperience: yearsSince(CAREER_START),
  /** Filename as it sits in `public/`. */
  resumeFile: RESUME_FILE,
  /**
   * URL for the résumé. Percent-encoded because the filename contains spaces —
   * an unencoded space in an href is invalid and some servers will 404 it.
   */
  resumePath: `/${encodeURIComponent(RESUME_FILE)}`,
  ogImage: '/og.png',
  /** Square portrait for Person structured data. Generated into public/. */
  portraitImage: '/portrait.jpg',
} as const;

/** Single source for the address string, reused by the map deep link below. */
const LOCATION = 'Mirpur DOHS, Dhaka, Bangladesh';

export const contact = {
  email: 'rostomali4444@gmail.com',
  /** Set to `null` to hide the phone row entirely rather than show a fake number. */
  phone: null as string | null,
  /**
   * WhatsApp. `wa.me` requires the number in international format with no `+`,
   * spaces or dashes, so the dial string and the display string are kept apart.
   */
  whatsapp: {
    number: '+8801782847366',
    display: '+880 1782 847366',
    url: 'https://wa.me/8801782847366',
  },
  github: 'https://github.com/imrostom',
  githubHandle: '@imrostom',
  linkedin: 'https://www.linkedin.com/in/md-rostom-ali',
  linkedinHandle: 'in/md-rostom-ali',
  website: 'https://rostomali.online',
  /*
    His OWN CodeCanyon author account. Deliberately NOT listing
    codecanyon.net/user/inilabs: that is the employer's account, and `sameAs`
    asserts identity — claiming it would be false.
  */
  codecanyon: 'https://codecanyon.net/user/axifystudio',
  /** Full postal-style location, used where there is room for it. */
  location: LOCATION,
  /**
   * Keyless Google Maps deep link. Deliberately not the Places API: that is a
   * browser-side SDK needing a public key plus third-party JS, for an address
   * that never changes. A search URL gives the same result at zero cost to
   * page weight, privacy and the Lighthouse budget.
   */
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION)}`,
  /** Compact form for chips, the footer and the hero fact row. */
  locationShort: 'Dhaka, Bangladesh',
  /** Structured form, consumed by the JSON-LD PostalAddress. */
  address: {
    street: 'Mirpur DOHS',
    locality: 'Dhaka',
    region: 'Dhaka Division',
    country: 'Bangladesh',
    countryCode: 'BD',
  },
  locationNote: 'Working remotely with distributed teams across Europe',
  timezone: 'Asia/Dhaka · UTC+6',
  timeZoneId: 'Asia/Dhaka',
  availability: 'Available for remote opportunities',
} as const;

export const company = {
  name: 'Tixpi',
  role: 'Senior Full Stack Developer',
  location: 'Zurich, Switzerland',
  url: 'https://tixpi.ch',
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Lucide icon name, used by the mobile navigation drawer. */
  icon: string;
};

export const navigation: NavItem[] = [
  { label: 'Home', href: '/', icon: 'lucide:home' },
  { label: 'Experience', href: '/experience', icon: 'lucide:briefcase' },
  { label: 'Projects', href: '/projects', icon: 'lucide:layout-grid' },
  { label: 'Skills', href: '/skills', icon: 'lucide:sparkles' },
  { label: 'Contact', href: '/contact', icon: 'lucide:mail' },
];

export type SocialLink = {
  label: string;
  href: string;
  /** Iconify name — `simple-icons:*` for brands, `lucide:*` otherwise. */
  icon: string;
};

export const socials: SocialLink[] = [
  { label: 'GitHub', href: contact.github, icon: 'simple-icons:github' },
  { label: 'WhatsApp', href: contact.whatsapp.url, icon: 'simple-icons:whatsapp' },
  { label: 'LinkedIn', href: contact.linkedin, icon: 'simple-icons:linkedin' },
  { label: 'Email', href: `mailto:${contact.email}`, icon: 'lucide:mail' },
];

/**
 * Headline numbers animated on the home page. Each carries a short note so the
 * figure says something concrete instead of floating on its own.
 */
export const stats = [
  {
    label: 'Years Experience',
    value: yearsSince(CAREER_START),
    suffix: '+',
    icon: 'lucide:calendar-days',
    note: 'Shipping Laravel and Node.js to production since 2018.',
  },
  {
    label: 'Projects',
    // Derived from the catalogue, so it cannot drift out of step with the
    // projects page the way a hardcoded figure did.
    value: projects.length,
    suffix: '',
    icon: 'lucide:rocket',
    note: 'SaaS platforms, Shopify apps and commercial products.',
  },
  {
    label: 'Clients Served',
    value: 50,
    suffix: '+',
    icon: 'lucide:handshake',
    note: 'From solo founders to a Swiss logistics operator.',
  },
  {
    label: 'Countries Reached',
    value: 30,
    suffix: '+',
    icon: 'lucide:globe',
    note: 'Largely through products sold on CodeCanyon.',
  },
] as const;

/**
 * Career highlights surfaced on the home page — the three things that are hard
 * to infer from a tech-stack list alone.
 */
export const highlights = [
  {
    title: 'SaaS leadership',
    metric: '20k+',
    metricLabel: 'companies on Easy.jobs',
    description:
      'Led engineering on Easy.jobs, a multi-tenant recruitment platform serving more than 20,000 companies — owning tenant isolation, permissions and the hiring pipeline as it scaled.',
    icon: 'lucide:users-round',
  },
  {
    title: 'Shopify app development',
    metric: 'Admin + Storefront',
    metricLabel: 'API integrations',
    description:
      'Built Shopify apps and storefront integrations against the Admin and Storefront APIs, handling rate limits, webhook reliability and merchant data sync.',
    icon: 'simple-icons:shopify',
  },
  {
    title: 'CodeCanyon products',
    metric: '30+',
    metricLabel: 'countries reached',
    description:
      'Authored commercial PHP and Laravel applications sold on CodeCanyon to international buyers, with multi-language and multi-currency support built in.',
    icon: 'simple-icons:envato',
  },
] as const;

/**
 * Marquee ticker on the home page.
 * `color` is the official brand hex, used to tint each chip on hover.
 */
export const techStack = [
  { name: 'Laravel', icon: 'simple-icons:laravel', color: '#FF2D20' },
  { name: 'PHP', icon: 'simple-icons:php', color: '#777BB4' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs', color: '#5FA04E' },
  { name: 'TypeScript', icon: 'simple-icons:typescript', color: '#3178C6' },
  { name: 'Vue', icon: 'simple-icons:vuedotjs', color: '#4FC08D' },
  { name: 'Nuxt', icon: 'simple-icons:nuxt', color: '#00DC82' },
  { name: 'React', icon: 'simple-icons:react', color: '#61DAFB' },
  { name: 'Astro', icon: 'simple-icons:astro', color: '#BC52EE' },
  { name: 'MySQL', icon: 'simple-icons:mysql', color: '#4479A1' },
  { name: 'Redis', icon: 'simple-icons:redis', color: '#FF4438' },
  { name: 'MongoDB', icon: 'simple-icons:mongodb', color: '#47A248' },
  { name: 'Docker', icon: 'simple-icons:docker', color: '#2496ED' },
  { name: 'AWS', icon: 'simple-icons:amazonwebservices', color: '#FF9900' },
  { name: 'DigitalOcean', icon: 'simple-icons:digitalocean', color: '#0080FF' },
  { name: 'Nginx', icon: 'simple-icons:nginx', color: '#009639' },
  { name: 'Shopify', icon: 'simple-icons:shopify', color: '#7AB55C' },
  { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', color: '#06B6D4' },
  { name: 'GraphQL', icon: 'simple-icons:graphql', color: '#E10098' },
] as const;

/**
 * Search-engine verification codes. Kept outside the `as const` `site` object so
 * the values stay writable — `as const` would type them as the literal `null`.
 * Unset values emit no markup at all; an empty content="" fails verification.
 */
export const verification = {
  google: null as string | null,
  bing: null as string | null,
};
