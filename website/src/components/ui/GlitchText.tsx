import { type FC, type CSSProperties } from 'react';
import './GlitchText.css';

export interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'span';
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

export const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
  style,
  as: Component = 'div',
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
    ...style,
  };

  const combinedClasses = [
    'glitch-text-reactbits',
    enableOnHover ? 'glitch-hover-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      style={inlineStyles}
      data-text={children}
      className={combinedClasses}
    >
      {children}
    </Component>
  );
};

export default GlitchText;
