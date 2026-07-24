import React from 'react';

/**
 * Ultra-Sharp RGB Laser Field Container
 * Displays 84 short scattered laser dashes (30px-65px length) in vibrant RGB colors
 * moving continuously across a crystal-clear background.
 * Frosted glass blur is isolated exclusively to glass panel containers (Hero Banner & Prompt Box).
 */
export const RainbowBorderContainer = ({ children }) => {
  const colors = [
    'laser-red', 'laser-green', 'laser-blue', 'laser-cyan', 
    'laser-magenta', 'laser-yellow', 'laser-purple', 'laser-lime'
  ];

  const anims = ['anim-sr', 'anim-sl', 'anim-sh'];

  // Generate 84 short laser dashes distributed evenly over the screen grid
  const laserSwarm = Array.from({ length: 84 }).map((_, i) => {
    const row = Math.floor(i / 9); // 0..9
    const col = i % 9;           // 0..8

    const top = `${(row * 10.5) + (i % 3) * 2}%`;
    const left = `${(col * 11) + (i % 4) * 2}%`;
    const width = `${30 + (i % 6) * 7}px`; // 30px to 65px short length
    const color = colors[i % colors.length];
    const anim = anims[i % anims.length];
    const duration = `${2.8 + (i % 7) * 0.4}s`; // 2.8s to 5.2s
    const delay = `${(i % 12) * 0.3}s`;

    return { top, left, width, color, anim, duration, delay };
  });

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 text-slate-800">
      {/* Sharp Background Laser Field (No background blur) */}
      <div className="swarm-laser-container" aria-hidden="true">
        {/* Crisp Dot Grid Texture */}
        <div className="swarm-laser-grid" />

        {/* 84 Sharp Short RGB Laser Dashes */}
        {laserSwarm.map((l, idx) => (
          <div
            key={idx}
            className={`laser-dash ${l.color} ${l.anim}`}
            style={{
              top: l.top,
              left: l.left,
              width: l.width,
              animationDuration: l.duration,
              animationDelay: l.delay,
            }}
          />
        ))}
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default RainbowBorderContainer;
