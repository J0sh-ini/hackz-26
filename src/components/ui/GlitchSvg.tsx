import React, { useState, useEffect } from 'react';
import '../../styles/GlitchSvg.css';

interface GlitchSvgProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export const GlitchSvg: React.FC<GlitchSvgProps> = ({ 
  children, 
  duration = 1000, 
  delay = 5000 
}) => {
  const [isGlitching, setIsGlitching] = useState<boolean>(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), duration);
    };

    const interval = setInterval(triggerGlitch, duration + delay);
    triggerGlitch();

    return () => clearInterval(interval);
  }, [duration, delay]);

  return (
    <div className="glitch-wrapper">
      <div className="glitch-layer">{children}</div>
      {isGlitching && (
        <>
          <div 
            className="glitch-layer glitch-red" 
            style={{ animationDuration: `${duration}ms` }}
          >
            {children}
          </div>
          <div 
            className="glitch-layer glitch-blue" 
            style={{ animationDuration: `${duration}ms` }}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
};