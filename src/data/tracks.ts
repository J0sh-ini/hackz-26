export interface Track {
  id: string;
  number: string;
  name: string;
  description: string;
  isSpecial?: boolean;
  specialLabel?: string;
  accentColor?: string;
  iconType: 'blockchain' | 'fintech' | 'medx' | 'sustainability' | 'safety' | 'empowerment';
}

export const TRACKS: Track[] = [
  {
    id: 'blockchain',
    number: '[01]',
    name: 'Blockchain',
    description: 'Decentralized architectures, smart contract security, Web3 infrastructure, and trustless verification protocols.',
    accentColor: '#00f0ff',
    iconType: 'blockchain',
  },
  {
    id: 'fintech',
    number: '[02]',
    name: 'FinTech',
    description: 'Next-gen algorithmic finance, automated fraud mitigation, zero-knowledge payments, and high-frequency settlement.',
    accentColor: '#ff6b00',
    iconType: 'fintech',
  },
  {
    id: 'medx',
    number: '[03]',
    name: 'MedX',
    description: 'AI-assisted clinical telemetry, secure biomedical diagnostics, telemetry streaming, and privacy-preserving electronic health records.',
    accentColor: '#b026ff',
    iconType: 'medx',
  },
  {
    id: 'sustainability',
    number: '[04]',
    name: 'Sustainability & Climate',
    description: 'Intelligent carbon accounting, renewable grid optimization, green computing pipelines, and ecological telemetry sensors.',
    accentColor: '#00ff41',
    iconType: 'sustainability',
  },
  {
    id: 'women-safety',
    number: '[05]',
    name: 'Women Safety',
    description: 'Autonomous emergency dispatch, covert threat alerting mechanisms, localized safe-transit routing, and rapid guardian coordination.',
    accentColor: '#ff2a85',
    iconType: 'safety',
  },
  {
    id: 'women-empowerment',
    number: '[06]',
    name: 'Women Empowerment',
    description: 'Leading Women\'s Team special track. Dedicated systems catalyzing female leadership, digital financial autonomy, and equal opportunity.',
    isSpecial: true,
    specialLabel: '[SPECIAL PRIZE]',
    accentColor: '#f5a623',
    iconType: 'empowerment',
  },
];
