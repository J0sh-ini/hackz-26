import React from 'react';

export interface Sponsor {
  id: string;
  name: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'associate' | 'powered-by';
  logo: React.ReactNode;
  description: string;
  website: string;
  tagline: string;
  accentColor: string;
  badgeColor: string;
  logoBgColor?: string;
}

export const TemenosLogo: React.FC<{ width?: number; height?: number }> = ({ width = 280, height = 62 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 320 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '100%', height: 'auto' }}
  >
    <rect x="10" y="8" width="44" height="44" fill="#003594" />
    <path d="M18 18H46V25H35V44H28V25H18V18Z" fill="#ffffff" />
    <text
      x="68"
      y="38"
      fontFamily="'Outfit', sans-serif"
      fontWeight="800"
      fontSize="32"
      fill="#ffffff"
      letterSpacing="4"
    >
      TEMENOS
    </text>
  </svg>
);

export const IBMLogo: React.FC<{ width?: number; height?: number }> = ({ width = 140, height = 100 }) => (
  <svg
    viewBox="0 0 300 100"
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    fill="#0f62fe"
  >
    <defs>
      <pattern id="ibm-bars" width="300" height="13" patternUnits="userSpaceOnUse">
        <rect width="300" height="9" fill="white" />
      </pattern>
      <mask id="ibm-mask">
        <rect width="300" height="100" fill="url(#ibm-bars)" />
      </mask>
    </defs>

    <g mask="url(#ibm-mask)">
      <path d="M 20 0 H 70 V 15 H 55 V 85 H 70 V 100 H 20 V 85 H 35 V 15 H 20 Z" />
      <path
        fillRule="evenodd"
        d="M 90 0
          H 135
          C 165 0, 165 47, 135 47
          C 170 47, 170 100, 135 100
          H 90 V 85 H 105 V 15 H 90 Z
          M 125 15 V 38 H 132 C 145 38, 145 15, 132 15 Z
          M 125 55 V 85 H 132 C 150 85, 150 55, 132 55 Z"
      />
      <path d="M 180 0
              H 215 L 230 50 L 245 0 H 280
              V 15 H 265 V 85 H 280 V 100
              H 235 V 85 H 245 V 30
              L 230 80 L 215 30
              V 85 H 225 V 100
              H 180 V 85 H 195 V 15 H 180 Z" />
    </g>
  </svg>
);

export const UnstopLogo: React.FC<{ width?: number; height?: number }> = ({ width = 240, height = 56 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 260 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '100%', height: 'auto' }}
  >
    <circle cx="28" cy="27" r="18" fill="#1C49C2" />
    <path
      d="M20 27C20 22.5817 23.5817 19 28 19C32.4183 19 36 22.5817 36 27C36 31.4183 32.4183 35 28 35"
      stroke="#FFD100"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="28" cy="27" r="4" fill="#ffffff" />
    <text
      x="60"
      y="36"
      fontFamily="'Outfit', sans-serif"
      fontWeight="800"
      fontSize="30"
      fill="#ffffff"
      letterSpacing="1"
    >
      unstop
    </text>
  </svg>
);

export const SPONSORS: Sponsor[] = [
  {
    id: 'temenos',
    name: 'Temenos',
    tier: 'title',
    logo: <TemenosLogo />,
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
    logo: <IBMLogo />,
    description: 'Pioneering enterprise AI, quantum breakthroughs, and hybrid cloud solutions for tomorrow\'s business.',
    website: 'https://www.ibm.com',
    tagline: 'GLOBAL LEADER IN RESEARCH & INNOVATION',
    accentColor: '#1C49C2',
    badgeColor: 'rgba(28, 73, 194, 0.03)',
    logoBgColor: '#0f62fe'
  },
  {
    id: 'unstop',
    name: 'Unstop',
    tier: 'powered-by',
    logo: <UnstopLogo />,
    description: 'Connecting millions of collegiate engineers, competitive hackers, and pioneers with career-defining opportunities.',
    website: 'https://unstop.com',
    tagline: 'TALENT DISCOVERY & HIRING PLATFORM',
    accentColor: '#4e82f7',
    badgeColor: 'rgba(78, 130, 247, 0.03)',
    logoBgColor: '#1C49C2'
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
      badgeBg: 'rgba(78, 130, 247, 0.03)',
      badgeTextColor: '#4e82f7',
      borderColor: '#4e82f7',
      width: 'calc(50% - 16px)',
      order: 6
    }
  };
  return configs[tier];
};