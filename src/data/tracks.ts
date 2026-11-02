export interface Track {
  id: string;
  number: string;
  name: string;
  description: string;
  isSpecial?: boolean;
  specialLabel?: string;
  accentColor?: string;
  iconType: 'cybersecurity' | 'fintech' | 'medx' | 'sustainability' | 'safety' | 'ai' |'logistics'|'hardware';
}

export const TRACKS: Track[] = [
  {
    id: 'fintech',
    number: '[01]',
    name: 'FinTech,Fraud & Financial Security',
    description: 'Real-time transaction monitoring, decentralized id verification, predictive fraud algorithms, and cryptographic asset protection.',
    accentColor: '#10f290',
    iconType: 'fintech',
  },
  {
    id: 'women-safety',
    number: '[02]',
    name: 'Women\'s Safety & Digital Security',
    description: 'Biometric distress/sos signals, encrypted emergency mesh networks, anti-doxxing algorithms, and AI-driven harassment filtering.',
    accentColor: '#70ff00',
    iconType: 'safety',
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
    id: 'hardware',
    number: '[04]',
    name: 'Critical Infrastructure, Energy & Grid Security',
    description: 'Edge computing cryptography, IoT firmware integrity validation, zero-trust urban networks, and automated SCADA threat mitigation.',
    accentColor: '#00ff41',
    iconType: 'hardware',
  },
   {
    id: 'logistics',
    number: '[05]',
    name: 'Supply Chain, Logistics & Product Authenticity Security',
    description: 'Distributed ledger provenance, autonomous vehicle cybersecurity, RFID spoofing prevention, and predictive freight disruption modeling.',
    accentColor: '#84ff00',
    iconType: 'logistics',
  },
  {
    id: 'sustainability',
    number: '[06]',
    name: 'Environment, Disaster Management & Disaster Response Security',
    description: 'Predictive catastrophe modeling, decentralized emergency mesh networks, autonomous rescue , and secure crisis informatics.',
    accentColor: '#84ff00',
    iconType: 'sustainability',
  },
];
