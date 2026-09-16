import React from 'react';

interface TrackIconProps {
  type: 'blockchain' | 'fintech' | 'medx' | 'sustainability' | 'safety' | 'empowerment';
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
    case 'blockchain':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Isometric Cyber Cubes & Hash Chain */}
          <polygon points="24,4 40,13 40,31 24,40 8,31 8,13" strokeDasharray="3 3" opacity="0.4" />
          <polygon points="24,10 36,17 24,24 12,17" />
          <polyline points="12,17 12,29 24,36 36,29 36,17" />
          <line x1="24" y1="24" x2="24" y2="36" />
          <circle cx="24" cy="10" r="2" fill={color} />
          <circle cx="36" cy="17" r="2" fill={color} />
          <circle cx="12" cy="17" r="2" fill={color} />
          <circle cx="24" cy="36" r="2" fill={color} />
        </svg>
      );

    case 'fintech':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Algorithmic Market & Ledger Grid */}
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
          {/* Guardian Shield & Radar Sensor */}
          <polygon points="24,6 40,12 40,26 24,42 8,26 8,12" />
          <circle cx="24" cy="22" r="7" strokeDasharray="3 2" />
          <circle cx="24" cy="22" r="3" fill={color} />
          <line x1="24" y1="12" x2="24" y2="15" />
          <line x1="24" y1="29" x2="24" y2="32" />
        </svg>
      );

    case 'empowerment':
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={strokeWidth}>
          {/* Female Empowerment Circuit Glyph */}
          <polygon points="24,4 40,14 40,34 24,44 8,34 8,14" strokeDasharray="2 2" opacity="0.3" />
          <circle cx="24" cy="18" r="9" />
          <line x1="24" y1="27" x2="24" y2="40" />
          <line x1="17" y1="33" x2="31" y2="33" />
          <circle cx="24" cy="18" r="3" fill={color} />
          <circle cx="24" cy="40" r="1.5" fill={color} />
        </svg>
      );

    default:
      return null;
  }
};
