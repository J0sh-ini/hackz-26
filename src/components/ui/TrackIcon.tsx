import React from 'react';

interface TrackIconProps {
  type:  'cybersecurity' | 'fintech' | 'medx' | 'sustainability' | 'safety' | 'ai' |'logistics'|'hardware';
  color?: string;
  size?: number;
}

export const TrackIcon: React.FC<TrackIconProps> = ({
  type,
  color = 'var(--accent-green)',
  size = 48,
}) => {
  const strokeWidth = 1.75;

  switch (type) {
    case 'cybersecurity':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          <path d="M24 4 L8 10 V22 C8 32 15 40 24 44 C33 40 40 32 40 22 V10 Z" strokeLinejoin="round" />
          <circle cx="24" cy="20" r="4" />
          <path d="M22.5 23.5 L21 32 H27 L25.5 23.5 Z" strokeLinejoin="round" />
        </svg>
      );

    case 'fintech':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          <rect x="6" y="8" width="36" height="32" strokeDasharray="2 2" opacity="0.3" />
          <polyline points="10,34 18,22 26,28 38,14" />
          <polyline points="32,14 38,14 38,20" />
          <line x1="6" y1="36" x2="42" y2="36" />
          <line x1="18" y1="22" x2="18" y2="36" strokeDasharray="1 3" opacity="0.6" />
          <line x1="26" y1="28" x2="26" y2="36" strokeDasharray="1 3" opacity="0.6" />
          <line x1="38" y1="14" x2="38" y2="36" strokeDasharray="1 3" opacity="0.6" />
          <circle cx="38" cy="14" r="2" fill={color} />
        </svg>
      );
    case 'logistics':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          <path d="M8 14 H28 V32 H8 Z" strokeLinejoin="round" />
          <path d="M28 20 H36 L42 26 V32 H28" strokeLinejoin="round" />
          <circle cx="15" cy="32" r="4" />
          <circle cx="35" cy="32" r="4" />
          <path d="M32 20 V26 H39" strokeLinejoin="round" />
          <path d="M4 36 H44" strokeLinecap="round" />
        </svg>
      );

    case 'hardware':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Hardware Microchip & Security Shield */}
          <rect x="12" y="12" width="24" height="24" rx="2" strokeLinejoin="round" />
          <path d="M17 12 V7 M24 12 V7 M31 12 V7 M17 36 V41 M24 36 V41 M31 36 V41 M12 17 H7 M12 24 H7 M12 31 H7 M36 17 H41 M36 24 H41 M36 31 H41" strokeLinecap="round" />
          <path d="M24 17 L18 19 V25 C18 29 21.5 32 24 34 C26.5 32 30 29 30 25 V19 Z" strokeLinejoin="round" />
        </svg>
      );
    case 'medx':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Medical Telemetry & Cyber Pulse */}
          <rect x="8" y="8" width="32" height="32" opacity="0.3" />
          <polyline points="8,24 16,24 20,14 24,34 28,18 32,24 40,24" />
          <line x1="24" y1="6" x2="24" y2="10" />
          <line x1="24" y1="38" x2="24" y2="42" />
          <line x1="6" y1="24" x2="10" y2="24" />
          <line x1="38" y1="24" x2="42" y2="24" />
          <circle cx="20" cy="14" r="1.5" fill={color} />
          <circle cx="24" cy="34" r="1.5" fill={color} />
        </svg>
      );

    case 'sustainability':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Circuit Leaf & Renewable Grid */}
          <path d="M12 36 C12 36 10 18 24 10 C38 18 36 36 36 36 Z" />
          <line x1="24" y1="10" x2="24" y2="38" />
          <line x1="24" y1="20" x2="32" y2="16" />
          <line x1="24" y1="26" x2="16" y2="22" />
          <line x1="24" y1="32" x2="30" y2="29" />
          <circle cx="32" cy="16" r="1.5" fill={color} />
          <circle cx="16" cy="22" r="1.5" fill={color} />
          <circle cx="30" cy="29" r="1.5" fill={color} />
        </svg>
      );

    case 'safety':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Shield & Venus Symbol */}
          <path d="M24 4 L8 10 V22 C8 32 15 40 24 44 C33 40 40 32 40 22 V10 Z" strokeLinejoin="round" />
          <circle cx="24" cy="18" r="5" />
          <line x1="24" y1="23" x2="24" y2="34" />
          <line x1="19" y1="28" x2="29" y2="28" />
        </svg>
              );

    case 'ai':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
        {/* AI Chip & Brain */}
        <rect x="10" y="10" width="28" height="28" rx="4" />
        <path d="M10 16 H6 M10 24 H6 M10 32 H6 M38 16 H42 M38 24 H42 M38 32 H42 M16 10 V6 M24 10 V6 M32 10 V6 M16 38 V42 M24 38 V42 M32 38 V42" />
        <path d="M24 16 C16 16 14 20 18 24 C14 28 16 32 24 32 C32 32 34 28 30 24 C34 20 32 16 24 16 Z" />
        <line x1="24" y1="16" x2="24" y2="32" />
      </svg>
            );

    default:
      return null;
  } 
};
