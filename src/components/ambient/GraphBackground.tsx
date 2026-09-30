import React from 'react';

const GraphBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #021a06 0%, #03351c 50%, #011208 100%)',
        backgroundImage: `
          linear-gradient(rgba(20, 160, 88, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(7, 147, 54, 0.3) 1px, transparent 1px),
          linear-gradient(135deg, #021a12 0%, #071700 50%, #02170b 100%)
        `,
        backgroundSize: '20px 20px, 20px 20px, 100% 100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 20%, #000000 95%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default GraphBackground;