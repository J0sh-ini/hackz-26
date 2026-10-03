import React, { useState, useEffect, useRef } from 'react';

interface TerminalSimulatorProps {
  lines: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
}

const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ 
  lines, 
  speed = 80,
  className = '',
  style = {},
  loop = true
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    if (displayedLines.length < lines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, lines[prev.length]]);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else if (loop) {
      const timeout = setTimeout(() => {
        setDisplayedLines([]);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [displayedLines, lines, speed, loop]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        backgroundColor: 'transparent',
        color: '#00ff66',
        fontFamily: '"Fira Code", "JetBrains Mono", "Courier New", monospace',
        fontSize: '0.72rem',
        lineHeight: '1.4',
        padding: '12px 16px',
        height: '100%',
        overflowY: 'hidden',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        textShadow: '0 0 4px rgba(0, 255, 102, 0.4)',
        ...style
      }}
    >
      {displayedLines.map((line, index) => (
        <div key={index} style={{ marginBottom: '2px' }}>{line}</div>
      ))}
      {displayedLines.length < lines.length && (
        <div style={{ display: 'inline-block', animation: 'blink 1s step-start infinite', color: '#00ff66' }}>_</div>
      )}
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default TerminalSimulator;