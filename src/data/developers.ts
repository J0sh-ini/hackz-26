export interface DeveloperProfile {
  name: string;
  title: string;
  githubUrl: string;
  linkedinUrl: string;
  avatarUrl: string;
}

export const DEVELOPERS: DeveloperProfile[] = [
  {
    name: 'Joshua Iniyan P',
    title: 'Lead Frontend Architect',
    githubUrl: 'https://github.com/J0sh-ini',
    linkedinUrl: 'https://www.linkedin.com/in/joshua-iniyan-298065376/',
    avatarUrl: '/joshbw.jpg',
  },
  {
    name: 'Lokashakthivel SP',
    title: 'Backend Engineer',
    githubUrl: 'https://github.com/lokashakthivel-sp/',
    linkedinUrl: 'https://www.linkedin.com/in/lokashakthivel-sp',
    avatarUrl: '/splbw.jpg',
  },
];

export const DEVELOPER_PROFILES = DEVELOPERS;
