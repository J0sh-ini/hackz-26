import React from 'react';

export interface Sponsor {
  id: string;
  name: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'associate' | 'powered-by' | 'support';
  logoSrc: string;
  logo?: React.ReactNode;
  description: string;
  website: string;
  tagline: string;
  accentColor: string;
  badgeColor: string;
  logoBgColor?: string;
}

export const SPONSORS: Sponsor[] = [
  {
    id: 'temenos',
    name: 'Temenos',
    tier: 'title',
    logoSrc: '/temenos_t.jpg',
    description: 'Powering mission-critical financial systems and next-generation cloud banking architecture worldwide.',
    website: 'https://www.temenos.com',
    tagline: 'GLOBAL LEADER IN BANKING SOFTWARE',
    accentColor: 'var(--accent-green)',
    badgeColor: 'rgba(0, 255, 65, 0.08)',
    logoBgColor: '#003594'
  },
  {
    id: 'ibm',
    name: 'IBM',
    tier: 'associate',
    logoSrc: '/ibm.png',
    description: 'Pioneering enterprise AI, quantum breakthroughs, and hybrid cloud solutions for tomorrow\'s business.',
    website: 'https://www.ibm.com',
    tagline: 'GLOBAL LEADER IN RESEARCH & INNOVATION',
    accentColor: '#1C49C2',
    badgeColor: 'rgba(28, 73, 194, 0.03)',
    logoBgColor: '#0f62fe'
  },
  {
    id: 'aaceg',
    name: 'AACEG',
    tier: 'support',
    logoSrc: '/aaceg.png',
    description: 'Alumni Association of the College of Engineering, Guindy — uniting global alumni, nurturing engineering leadership, and empowering student innovation.',
    website: 'https://www.aaceg.org/',
    tagline: 'ALUMNI ASSOCIATION OF THE COLLEGE OF ENGINEERING',
    accentColor: '#940000',
    badgeColor: 'rgba(148, 0, 0, 0.03)',
    logoBgColor: '#c8102e'
  }
  ,
  {
    id: 'unstop',
    name: 'Unstop',
    tier: 'powered-by',
    logoSrc: '/unstop.png',
    description: 'Connecting millions of collegiate engineers, competitive hackers, and pioneers with career-defining opportunities.',
    website: 'https://www.unstop.com/',
    tagline: 'TALENT DISCOVERY & HIRING PLATFORM',
    accentColor: '#1C49C2',
    badgeColor: 'rgba(28, 73, 194, 0.03)',
    logoBgColor: '#0f62fe'
  }
];
