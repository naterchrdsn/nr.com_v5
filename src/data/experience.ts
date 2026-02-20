export interface ExperienceEntry {
  company: string;
  title: string;
  dateRange: string;
  description: string;
  technologies: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Deposco',
    title: 'Senior UI Engineer',
    dateRange: 'Dec. 2025 – Present',
    description:
      'Collaborate on the product team to bring consistency and stability to UI systems supporting enterprise supply chain management.',
    technologies: ['Angular', 'TypeScript', 'Modern Web Technologies'],
  },
  {
    company: 'ADP, Inc.',
    title: 'Senior Frontend Architect',
    dateRange: 'Feb. 2020 – Nov. 2025',
    description:
      'Architected and led development of enterprise applications, mentored team members, and contributed to internal tools and design systems.',
    technologies: [
      'Angular/React + NX',
      'Tailwind/SCSS',
      'Jest/Playwright',
      'AG-Grid',
      'Docker + Nginx',
      'Concourse CI',
    ],
  },
  {
    company: 'charterUP',
    title: 'Senior Frontend Engineer',
    dateRange: 'May 2019 – Jan. 2020',
    description:
      "Led and developed core features for a new customer-facing product, helping shape the company's technology direction.",
    technologies: ['VueJS', 'Python/Java', 'Jenkins'],
  },
  {
    company: 'The Home Depot',
    title: 'Frontend Engineer',
    dateRange: 'May 2018 – May 2019',
    description:
      'Helped transform a proof-of-concept booking system into a scalable web application supporting thousands of users.',
    technologies: [
      'Angular',
      'Java',
      'Concourse CI/Docker',
      'AWS/GCP',
      'Github',
    ],
  },
  {
    company: 'Premier Logic',
    title: 'Frontend Team Lead',
    dateRange: 'Nov. 2016 – Mar. 2018',
    description:
      'Led a small front-end team and delivered end-to-end features for multiple client projects.',
    technologies: ['Angular', 'NodeJS', '.Net Core', 'AWS/GCP/Azure'],
  },
  {
    company: 'Merchant e-Solutions',
    title: 'Software Developer',
    dateRange: 'May 2014 – Oct. 2016',
    description:
      'Developed flagship and third-party integrations, supporting key business operations and revenue growth.',
    technologies: ['AngularJS', 'SCSS', 'Java', 'AWS', 'PHP'],
  },
];
