export type ProjectCategory =
  'SaaS Platforms' | 'Education' | 'Retail & Hospitality' | 'Business Systems' | 'Marketing';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  caseStudy: {
    /** Short factual figures shown on the résumé. Nothing here is estimated. */
    metrics: { label: string; value: string }[];
  };
  category: ProjectCategory;
  year: string;
  role: string;
  stack: string[];
  featured: boolean;
  /** Two brand colours used to build the card's generated cover artwork. */
  gradient: [string, string];
  /**
   * Banner filename in `src/assets/projects/`. Named descriptively rather than
   * after the slug, because the filename carries into the emitted image URL and
   * is a Google Images relevance signal. Omit to fall back to `<slug>.<ext>`.
   */
  image?: string;
  icon: string;
  links: {
    demo?: string;
    github?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'tixpi',
    name: 'Tixpi',
    tagline: 'Logistics and moving operations platform',
    description:
      'End-to-end operations software for a Swiss moving company — quoting, scheduling, fleet dispatch, document generation and invoicing in one system.',
    caseStudy: {
      metrics: [
        { label: 'Scope', value: 'Quote → invoice' },
        { label: 'Stack', value: 'Node.js · Nuxt' },
      ],
    },
    category: 'SaaS Platforms',
    year: '2025 — Present',
    role: 'Senior Full Stack Developer',
    stack: ['Node.js', 'Nuxt', 'Vue', 'TypeScript', 'MySQL', 'Redis', 'Docker'],
    featured: true,
    gradient: ['#2563EB', '#06B6D4'],
    icon: 'lucide:truck',
    image: 'tixpi-logistics-operations-platform.png',
    links: { demo: 'https://tixpi.ch' },
  },
  {
    slug: 'posify',
    name: 'Posify',
    tagline: 'Multi-store point of sale and inventory',
    description:
      'A point-of-sale and inventory platform for retailers running several locations, with offline-tolerant sales capture and consolidated reporting.',
    caseStudy: {
      metrics: [
        { label: 'Type', value: 'Multi-store POS' },
        { label: 'Stack', value: 'Laravel · Vue' },
      ],
    },
    category: 'Retail & Hospitality',
    year: '2023',
    role: 'Architect & Lead Developer',
    stack: ['Laravel', 'Vue', 'MySQL', 'Redis', 'Docker'],
    featured: true,
    gradient: ['#7C3AED', '#2563EB'],
    icon: 'lucide:store',
    image: 'posify-multi-store-pos-inventory-system.png',
    links: { demo: 'https://posify.axifylabs.com' },
  },
  {
    slug: 'foodpilot',
    name: 'FoodPilot',
    tagline: 'Restaurant app with Laravel backend',
    description:
      'Restaurant management application built on a Laravel backend — menu and order handling, table service and reporting for restaurant operators, published on CodeCanyon.',
    caseStudy: {
      metrics: [
        { label: 'Backend', value: 'Laravel' },
        { label: 'Marketplace', value: 'CodeCanyon' },
      ],
    },
    category: 'Retail & Hospitality',
    year: '2024',
    role: 'Full Stack Developer',
    stack: ['Laravel', 'PHP', 'MySQL'],
    featured: true,
    gradient: ['#06B6D4', '#7C3AED'],
    icon: 'lucide:chef-hat',
    image: 'foodpilot-restaurant-management-laravel-app.png',
    links: {
      demo: 'https://codecanyon.net/item/foodpilot-restaurant-app-with-laravel-backend/63156654',
    },
  },
  {
    slug: 'easy-jobs',
    name: 'Easy.jobs',
    tagline: 'Multi-tenant recruitment and applicant tracking',
    description:
      'A multi-tenant recruitment SaaS used by 20,000+ companies, giving each a branded careers portal, a structured hiring pipeline and collaborative candidate review.',
    caseStudy: {
      metrics: [
        { label: 'Companies', value: '20,000+' },
        { label: 'Stack', value: 'Laravel · Vue' },
      ],
    },
    category: 'SaaS Platforms',
    year: '2022 — 2024',
    role: 'Lead Engineer',
    stack: ['Laravel', 'Vue', 'MySQL', 'Redis', 'AWS'],
    featured: true,
    gradient: ['#2563EB', '#8B5CF6'],
    icon: 'lucide:users-round',
    image: 'easy-jobs-recruitment-applicant-tracking-saas.jpeg',
    links: { demo: 'https://easy.jobs' },
  },
  {
    slug: 'trustsync',
    name: 'TrustSync',
    tagline: 'Review aggregation and social proof',
    description:
      'Collects customer reviews from multiple providers, normalises them and renders them through a lightweight embeddable widget.',
    caseStudy: {
      metrics: [
        { label: 'Type', value: 'Review aggregation' },
        { label: 'Stack', value: 'Laravel · Vue' },
      ],
    },
    category: 'SaaS Platforms',
    year: '2022',
    role: 'Full Stack Developer',
    stack: ['Laravel', 'Vue', 'MySQL', 'Redis'],
    featured: false,
    gradient: ['#06B6D4', '#2563EB'],
    icon: 'lucide:star',
    image: 'trustsync-review-aggregation-platform.jpg',
    links: { demo: 'https://trustsync.io' },
  },
  {
    slug: 'greenmailer',
    name: 'GreenMailer',
    tagline: 'Shopify email marketing app',
    description:
      'Email marketing and campaign automation for Shopify merchants — list segmentation, scheduled sequences and delivery analytics, published on the Shopify App Store.',
    caseStudy: {
      metrics: [
        { label: 'Platform', value: 'Shopify App Store' },
        { label: 'Type', value: 'Public app' },
      ],
    },
    category: 'Marketing',
    year: '2023',
    role: 'Backend Developer',
    stack: ['Shopify', 'Node.js', 'React'],
    featured: false,
    gradient: ['#8B5CF6', '#06B6D4'],
    icon: 'lucide:send',
    image: 'greenmailer-shopify-email-marketing-app.webp',
    links: { demo: 'https://apps.shopify.com/green-mailer-marketing-tools' },
  },
  {
    slug: 'invoiceflow',
    name: 'InvoiceFlow',
    tagline: 'Invoice management system',
    description:
      'A self-hosted invoicing platform covering clients, estimates, recurring invoices, payments and tax reporting — sold commercially on CodeCanyon.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '27' },
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
      ],
    },
    category: 'Business Systems',
    year: '2023',
    role: 'Author & Maintainer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#2563EB', '#0E7490'],
    icon: 'lucide:receipt',
    image: 'invoiceflow-invoice-management-system.png',
    links: {
      demo: 'https://codecanyon.net/item/green-invoice-the-invoice-management-system/28907411',
    },
  },
  {
    slug: 'green-support',
    name: 'Green Support',
    tagline: 'Support ticket management system',
    description:
      'A helpdesk platform with ticketing, canned responses, departments, SLA tracking and a customer-facing knowledge base.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '14' },
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
      ],
    },
    category: 'Business Systems',
    year: '2022',
    role: 'Author & Maintainer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#059669', '#0E7490'],
    icon: 'lucide:life-buoy',
    image: 'green-support-ticket-management-system.jpg',
    links: {
      demo: 'https://codecanyon.net/item/green-support-the-support-management-system/28376695',
    },
  },
  {
    slug: 'green-survey-feedback',
    name: 'Green Survey & Feedback Form',
    tagline: 'Shopify review & feedback app',
    description:
      'Collects customer reviews and feedback for Shopify merchants through smart, automated forms — published as a public app on the Shopify App Store.',
    caseStudy: {
      metrics: [
        { label: 'Platform', value: 'Shopify App Store' },
        { label: 'Type', value: 'Public app' },
      ],
    },
    category: 'Marketing',
    year: '2024',
    role: 'Full Stack Developer',
    stack: ['Shopify', 'Node.js', 'React'],
    featured: false,
    gradient: ['#059669', '#2563EB'],
    icon: 'lucide:clipboard-list',
    image: 'green-survey-feedback-form-shopify-app.webp',
    links: { demo: 'https://apps.shopify.com/green-feeback-suvery-form' },
  },
  {
    slug: 'mailstack',
    name: 'MailStack',
    tagline: 'Self-hosted email marketing platform',
    description:
      'Campaign management with list segmentation, templates, scheduled sending and delivery analytics — running on the buyer\u2019s own SMTP or provider credentials.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '5' },
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
      ],
    },
    category: 'Marketing',
    year: '2024',
    role: 'Author & Maintainer',
    stack: ['PHP', 'Laravel', 'MySQL', 'SMTP'],
    featured: false,
    gradient: ['#7C3AED', '#2563EB'],
    icon: 'lucide:mail-plus',
    image: 'mailstack-self-hosted-email-marketing-platform.png',
    links: { demo: 'https://codecanyon.net/item/green-mail-the-mail-management-system/53058521' },
  },
  {
    slug: 'libraryhub',
    name: 'LibraryHub',
    tagline: 'Digital library management system',
    description:
      'Cataloguing, circulation, member management and reporting for libraries, sold commercially on CodeCanyon and deployed by buyers internationally.',
    caseStudy: {
      metrics: [
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
        { label: 'Localisation', value: 'Multi-language' },
        { label: 'Deployment', value: 'Self-hosted' },
      ],
    },
    category: 'Education',
    year: '2021',
    role: 'Author & Maintainer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#2563EB', '#7C3AED'],
    icon: 'lucide:library',
    image: 'libraryhub-digital-library-management-system.jpg',
    links: { demo: 'https://codecanyon.net/item/green-lms-the-library-management-system/25602126' },
  },
  {
    slug: 'libraryhub-flutter',
    name: 'LibraryHub Mobile',
    tagline: 'Flutter app for book catalog & member services',
    description:
      'The companion mobile application for LibraryHub — book catalogue browsing, member accounts, loans and due-date reminders, built with Flutter for iOS and Android.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '1' },
        { label: 'Stack', value: 'Flutter 3.x' },
      ],
    },
    category: 'Education',
    year: '2025',
    role: 'Author & Maintainer',
    stack: ['Flutter', 'Dart', 'REST API'],
    featured: false,
    gradient: ['#06B6D4', '#2563EB'],
    icon: 'lucide:smartphone',
    image: 'libraryhub-mobile-flutter-library-app.png',
    links: {
      demo: 'https://codecanyon.net/item/libraryhub-flutter-app-for-book-catalog-member-services/63803830',
    },
  },
  {
    slug: 'inilabs-school-express',
    name: 'Inilabs School Express',
    tagline: 'School management system',
    description:
      'A complete school ERP covering admissions, attendance, exams, fees, payroll and parent communication — the highest-selling product in the catalogue.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '2,373' },
        { label: 'Reviews', value: '233' },
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
      ],
    },
    category: 'Education',
    year: '2019',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#2563EB', '#7C3AED'],
    icon: 'lucide:school',
    image: 'inilabs-school-express-school-management-system.png',
    links: {
      demo: 'https://codecanyon.net/item/inilabs-school-management-system-express/11630340',
    },
  },
  {
    slug: 'itest-quiz',
    name: 'iTest',
    tagline: 'Quiz & online examination system',
    description:
      'Online examination software with question banks, timed assessments, randomised papers, automated marking and result analytics.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '649' },
        { label: 'Reviews', value: '33' },
        { label: 'Stack', value: 'PHP 8 · MySQL 5' },
      ],
    },
    category: 'Education',
    year: '2020',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL', 'jQuery'],
    featured: false,
    gradient: ['#7C3AED', '#0E7490'],
    icon: 'lucide:clipboard-check',
    image: 'itest-online-quiz-examination-system.png',
    links: {
      demo: 'https://codecanyon.net/item/itest-complete-online-examination-system/20620179',
    },
  },
  {
    slug: 'foodbank-multi-restaurant',
    name: 'FoodBank Multi Restaurant',
    tagline: 'Food delivery platform',
    description:
      'Multi-restaurant food delivery with customer ordering, restaurant panel, rider assignment and a full admin back office.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '369' },
        { label: 'Reviews', value: '28' },
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
      ],
    },
    category: 'Retail & Hospitality',
    year: '2021',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#059669', '#0E7490'],
    icon: 'lucide:bike',
    image: 'foodbank-multi-restaurant-food-delivery-platform.png',
    links: {
      demo: 'https://codecanyon.net/item/foodbank-all-in-one-multi-restaurant-food-ordering-management-system/35543239',
    },
  },
  {
    slug: 'quickpass',
    name: 'QuickPass',
    tagline: 'Appointment & visitor gate pass system',
    description:
      'QR-code visitor management: appointment booking, gate pass issuing, scan-in verification and visit history for reception desks.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '297' },
        { label: 'Reviews', value: '16' },
        { label: 'Stack', value: 'PHP 8 · MySQL 8' },
      ],
    },
    category: 'Business Systems',
    year: '2022',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL', 'QR'],
    featured: false,
    gradient: ['#2563EB', '#06B6D4'],
    icon: 'lucide:qr-code',
    image: 'quickpass-visitor-gate-pass-qr-booking-system.png',
    links: { demo: 'https://codecanyon.net/item/visitor-pass-management-system/24643230' },
  },
  {
    slug: 'trust-hospital',
    name: 'Trust Hospital Management ERP',
    tagline: 'Hospital management ERP',
    description:
      'Hospital operations software spanning patients, appointments, doctors, pharmacy, pathology, billing and inventory.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '148' },
        { label: 'Reviews', value: '9' },
        { label: 'Stack', value: 'PHP 7 · MySQL 5' },
      ],
    },
    category: 'Business Systems',
    year: '2020',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#0E7490', '#2563EB'],
    icon: 'lucide:stethoscope',
    image: 'trust-hospital-management-erp.png',
    links: { demo: 'https://codecanyon.net/item/trust-hospital-management-erp/25575153' },
  },
  {
    slug: 'ihostel',
    name: 'iHostel',
    tagline: 'Multi-branch hostel management & POS',
    description:
      'Hostel management across multiple branches — room allocation, boarders, mess billing and an integrated point of sale.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '75' },
        { label: 'Stack', value: 'PHP 7 · MySQL 5' },
      ],
    },
    category: 'Retail & Hospitality',
    year: '2019',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    featured: false,
    gradient: ['#7C3AED', '#2563EB'],
    icon: 'lucide:bed-double',
    image: 'ihostel-multi-branch-hostel-management-pos.png',
    links: {
      demo: 'https://codecanyon.net/item/ihostel-inilabs-multi-branch-hostel-management-system-pos/18186482',
    },
  },
  {
    slug: 'inilabs-lms-addon',
    name: 'iNiLabs LMS Add-on',
    tagline: 'Learning management add-on',
    description:
      'Adds course delivery, lesson content, assignments and progress tracking on top of the Inilabs school platform.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '59' },
        { label: 'Reviews', value: '4' },
        { label: 'Stack', value: 'PHP 7 · MySQL 5' },
      ],
    },
    category: 'Education',
    year: '2020',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'MySQL'],
    featured: false,
    gradient: ['#2563EB', '#0E7490'],
    icon: 'lucide:graduation-cap',
    image: 'inilabs-learning-management-system-addon.png',
    links: {
      demo: 'https://codecanyon.net/item/learning-management-system-addon-inilabs-school-management/29025911',
    },
  },
  {
    slug: 'google-meet-addon',
    name: 'Google Meet Add-on',
    tagline: 'Live class & meeting integration',
    description:
      'Brings Google Meet scheduling and join links into the school platform so live classes are created without leaving the admin.',
    caseStudy: {
      metrics: [
        { label: 'Sales', value: '43' },
        { label: 'Stack', value: 'PHP 7 · MySQL 5' },
      ],
    },
    category: 'Education',
    year: '2021',
    role: 'Product Engineer',
    stack: ['PHP', 'Laravel', 'Google API'],
    featured: false,
    gradient: ['#0E7490', '#7C3AED'],
    icon: 'lucide:video',
    image: 'google-meet-live-class-meeting-addon.png',
    links: {
      demo: 'https://codecanyon.net/item/google-meet-live-class-and-meeting-addon/30936402',
    },
  },
];

/**
 * Filter chips, in a deliberate order rather than whatever order the projects
 * happen to be declared in: current platform work first, then the product
 * catalogue by size.
 */
export const projectCategories: (ProjectCategory | 'All')[] = [
  'All',
  'SaaS Platforms',
  'Education',
  'Retail & Hospitality',
  'Business Systems',
  'Marketing',
];

export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Marketplace authorship.
 *
 * The CodeCanyon figures are stated explicitly and NOT derived from `projects`,
 * because that catalogue spans two author accounts: products self-published
 * under Md Rostom Ali's own account, and products built as an employee under
 * the Inilabs account, whose sales belong to the company. Summing both would
 * claim ~4,000 sales that are not his to claim.
 */
export const authorship = {
  /** Self-published on CodeCanyon under his own author account. */
  codecanyon: {
    products: 8,
    sales: '300+',
    reviews: '15+',
  },
  /** Built under the employer's Inilabs author account during that role. */
  employer: {
    account: 'Inilabs',
    headline: 'Inilabs School Express',
    headlineSales: '2,373',
  },
};

/** Shopify apps are all self-published, so this one can safely be derived. */
export const shopifyApps = projects.filter((p) =>
  p.links.demo?.includes('apps.shopify.com'),
).length;
