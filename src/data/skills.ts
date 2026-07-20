export type Skill = {
  name: string;
  icon: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    description: 'API design, domain modelling and the services that hold everything up.',
    icon: 'lucide:server',
    accent: '#2563EB',
    skills: [
      { name: 'Laravel', icon: 'simple-icons:laravel' },
      { name: 'PHP', icon: 'simple-icons:php' },
      { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
      { name: 'Express', icon: 'simple-icons:express' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces that stay fast and accessible as the product grows.',
    icon: 'lucide:monitor',
    accent: '#7C3AED',
    skills: [
      { name: 'Vue', icon: 'simple-icons:vuedotjs' },
      { name: 'Nuxt', icon: 'simple-icons:nuxt' },
      { name: 'React', icon: 'simple-icons:react' },
      { name: 'JavaScript', icon: 'simple-icons:javascript' },
      { name: 'HTML', icon: 'simple-icons:html5' },
      { name: 'CSS', icon: 'simple-icons:css' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Schema design, query profiling and caching strategy under real load.',
    icon: 'lucide:database',
    accent: '#06B6D4',
    skills: [
      { name: 'MySQL', icon: 'simple-icons:mysql' },
      { name: 'Redis', icon: 'simple-icons:redis' },
      { name: 'MongoDB', icon: 'simple-icons:mongodb' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Shipping, running and observing services in production.',
    icon: 'lucide:cloud',
    accent: '#2563EB',
    skills: [
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'AWS', icon: 'simple-icons:amazonwebservices' },
      { name: 'DigitalOcean', icon: 'simple-icons:digitalocean' },
      { name: 'Nginx', icon: 'simple-icons:nginx' },
    ],
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    description: 'Putting language models behind real product features, not demos.',
    icon: 'lucide:brain-circuit',
    accent: '#7C3AED',
    skills: [
      { name: 'Claude API', icon: 'simple-icons:anthropic' },
      { name: 'OpenAI', icon: 'simple-icons:openai' },
      { name: 'Gemini', icon: 'simple-icons:googlegemini' },
      { name: 'Prompt Engineering', icon: 'lucide:message-square-code' },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'The decisions that decide whether a system survives its second year.',
    icon: 'lucide:blocks',
    accent: '#06B6D4',
    skills: [
      { name: 'Multi-Tenant Systems', icon: 'lucide:building-2' },
      { name: 'REST API Design', icon: 'lucide:webhook' },
      { name: 'Performance Optimisation', icon: 'lucide:gauge' },
      { name: 'System Design', icon: 'lucide:network' },
    ],
  },
];

/** Compact chips for the résumé's technical-skills block. */
export const resumeSkills = skillGroups.map((group) => ({
  title: group.title,
  items: group.skills.map((s) => s.name),
}));
