"use client";
import { useRef, useState, useEffect } from 'react';

export default function FittingRoom({ modelPath }) {
  const viewerRef = useRef(null);
  const [activeSize, setActiveSize] = useState('L');

  // THE MATRIX: Mapping SZ1 chart to 3D Morph Targets
  const sizeMatrix = {
    'S':   0.0,  // Minimum shape
    'M':   0.25,
    'L':   0.5,  // Standard
    'XL':  0.75,
    '2XL': 1.0   // Maximum shape (the key you made in Blender)
  };

  const applySize = (size) => {
    setActiveSize(size);
    const viewer = viewerRef.current;
    if (viewer) {
      // This line "morphs" the shirt on the body
      viewer.morphTargetInfluences = [sizeMatrix[size]];
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-[#050505] rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)]">
      <model-viewer
        ref={viewerRef}
        src={modelPath}
        camera-controls
        auto-rotate
        shadow-intensity="2"
        environment-image="neutral"
        exposure="1.2"
        interaction-prompt="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Buttons Overlay */}
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4">
          <div className="flex gap-2 p-2 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/5">
            {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
              <button
                key={size}
                onClick={() => applySize(size)}
                className={`w-12 h-12 md:w-16 md:h-16 rounded-xl font-black italic transition-all ${
                  activeSize === size 
                  ? 'bg-[#46daff] text-black shadow-[0_0_20px_#46daff]' 
                  : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">360° Smart Fitting</p>
        </div>
      </model-viewer>
    </div>
  );
}
