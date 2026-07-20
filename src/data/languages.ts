export type Language = {
  name: string;
  nativeName: string;
  proficiency: string;
  /** CEFR-style band, used as the accessible description of the dial. */
  level: string;
  /** 0–100, drives the circular progress dial. */
  value: number;
  accent: string;
  note: string;
  skills: { label: string; value: number }[];
};

export const languages: Language[] = [
  {
    name: 'English',
    nativeName: 'English',
    proficiency: 'Professional Working Proficiency',
    level: 'C1',
    value: 85,
    accent: '#2563EB',
    note: 'The language I work in daily — technical documentation, code review, client calls and written specifications with distributed teams across Europe and North America.',
    skills: [
      { label: 'Reading', value: 92 },
      { label: 'Writing', value: 88 },
      { label: 'Speaking', value: 82 },
      { label: 'Listening', value: 85 },
    ],
  },
  {
    name: 'Bangla',
    nativeName: 'বাংলা',
    proficiency: 'Native Proficiency',
    level: 'Native',
    value: 100,
    accent: '#06B6D4',
    note: 'My first language. Used throughout my education and across every team I worked with in Dhaka before moving to remote work with European companies.',
    skills: [
      { label: 'Reading', value: 100 },
      { label: 'Writing', value: 100 },
      { label: 'Speaking', value: 100 },
      { label: 'Listening', value: 100 },
    ],
  },
];

/** Supporting context shown alongside the dials. */
export const collaborationNotes = [
  {
    title: 'Async by default',
    description:
      'Written communication is where most of my collaboration happens — clear pull request descriptions, specifications and handover notes.',
    icon: 'lucide:message-square-text',
  },
  {
    title: 'Comfortable across timezones',
    description:
      'Based in Asia/Dhaka and used to overlapping with European teams through the afternoon.',
    icon: 'lucide:clock',
  },
  {
    title: 'Client-facing',
    description:
      'Regularly translating between technical constraints and business requirements for non-technical stakeholders.',
    icon: 'lucide:handshake',
  },
];
