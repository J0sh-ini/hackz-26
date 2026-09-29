export interface Track {
  id: string;
  number: string;
  name: string;
  description: string;
  isSpecial?: boolean;
  specialLabel?: string;
  accentColor?: string;
  iconType: 'cybersecurity' | 'fintech' | 'medx' | 'sustainability' | 'safety' | 'ai';
}

export const TRACKS: Track[] = [
  {
    id: 'cybersecurity',
    number: '[01]',
    name: 'Cybersecurity & Digital Trust',
    description: 'to be filled in with a brief description of the track, highlighting key areas of focus and potential project ideas.',
    accentColor: '#00ff88',
    iconType: 'cybersecurity',
  },
  {
    id: 'fintech',
    number: '[02]',
    name: 'FinTech,Fraud & Financial Security',
    description: 'Next-gen algorithmic finance, automated fraud mitigation, zero-knowledge payments, and high-frequency settlement.',
    accentColor: '#10f290',
    iconType: 'fintech',
  },
  {
    id: 'medx',
    number: '[03]',
    name: 'Health,Privacy & MedTech Security',
    description: 'AI-assisted clinical telemetry, secure biomedical diagnostics, telemetry streaming, and privacy-preserving electronic health records.',
    accentColor: '#39ff14',
    iconType: 'medx',
  },
  {
    id: 'sustainability',
    number: '[04]',
    name: 'Smart Infrasturucture , IOT & Climate Security',
    description: 'Intelligent carbon accounting, renewable grid optimization, green computing pipelines, and ecological telemetry sensors.',
    accentColor: '#00ff41',
    iconType: 'sustainability',
  },
  {
    id: 'women-safety',
    number: '[05]',
    name: 'Women\'s Safety & Digital Security',
    description: 'Autonomous emergency dispatch, covert threat alerting mechanisms, localized safe-transit routing, and rapid guardian coordination.',
    accentColor: '#70ff00',
    iconType: 'safety',
  },
  {
    id: 'ai',
    number: '[06]',
    name: 'Secure AI & Responsible Intelligence',
    description: 'Leading WomenTeam special track. Dedicated systems catalyzing female leadership, digital financial autonomy, and equal opportunity.',
    accentColor: '#84ff00',
    iconType: 'ai',
  },
];
