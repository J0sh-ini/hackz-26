import React from 'react';

export interface Sponsor {
  id: string;
  name: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'associate' | 'powered-by';
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
    tier: 'powered-by',
    logoSrc: '/aaceg.png',
    description: 'Alumni Association of the College of Engineering, Guindy — uniting global alumni, nurturing engineering leadership, and empowering student innovation.',
    website: 'https://www.aaceg.org/',
    tagline: 'ALUMNI ASSOCIATION OF THE COLLEGE OF ENGINEERING',
    accentColor: '#940000',
    badgeColor: 'rgba(148, 0, 0, 0.03)',
    logoBgColor: '#c8102e'
  }
];

export const getTierConfig = (tier: Sponsor['tier']) => {
  const configs = {
    title: {
      label: 'TITLE SPONSOR',
      badgeBg: 'rgba(0, 255, 65, 0.02)',
      badgeTextColor: 'var(--accent-green)',
      borderColor: 'var(--accent-green)',
      width: '100%',
      order: 1
    },
    platinum: {
      label: 'PLATINUM SPONSOR',
      badgeBg: 'rgba(0, 255, 136, 0.02)',
      badgeTextColor: 'var(--accent-green-mint)',
      borderColor: 'var(--accent-green-mint)',
      width: '100%',
      order: 2
    },
    gold: {
      label: 'GOLD SPONSOR',
      badgeBg: 'rgba(132, 255, 0, 0.02)',
      badgeTextColor: 'var(--accent-green-volt)',
      borderColor: 'var(--accent-green-volt)',
      width: 'calc(50% - 16px)',
      order: 3
    },
    silver: {
      label: 'SILVER SPONSOR',
      badgeBg: 'rgba(163, 255, 184, 0.02)',
      badgeTextColor: 'var(--accent-green-light)',
      borderColor: 'var(--accent-green-light)',
      width: 'calc(50% - 16px)',
      order: 4
    },
    associate: {
      label: 'ASSOCIATE SPONSOR',
      badgeBg: 'rgba(28, 73, 194, 0.03)',
      badgeTextColor: '#4e82f7',
      borderColor: '#1C49C2',
      width: 'calc(50% - 16px)',
      order: 5
    },
    'powered-by': {
      label: 'POWERED BY',
      badgeBg: 'rgba(148, 0, 0, 0.03)',
      badgeTextColor: '#940000',
      borderColor: '#940000',
      width: 'calc(50% - 16px)',
      order: 6
    }
  };
  return configs[tier];
};