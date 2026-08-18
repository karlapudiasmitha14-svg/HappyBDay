import React from 'react';

interface CRTOverlayProps {
  enabled: boolean;
}

export const CRTOverlay: React.FC<CRTOverlayProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {/* Scanline lines */}
      <div className="pointer-events-none absolute inset-0 crt-scanlines opacity-75" />
      {/* Corner Vignette & CRT Curve */}
      <div className="pointer-events-none absolute inset-0 crt-vignette opacity-80" />
      {/* Subtle top-to-bottom scanline sweep */}
      <div 
        className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent opacity-30 animate-pulse"
        style={{
          animation: 'scanSweep 8s linear infinite'
        }}
      />
      {/* Subpixel RGB border glow */}
      <div className="pointer-events-none absolute inset-0 border border-emerald-500/10 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]" />
    </div>
  );
};
