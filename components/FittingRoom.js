"use client";
import { useRef, useState } from 'react';

export default function FittingRoom({ modelPath }) {
  const viewerRef = useRef(null);
  const [activeSize, setActiveSize] = useState('L');

  const applySize = (size) => {
    setActiveSize(size);
    if (viewerRef.current) {
      // Access the "Matrix" and apply the morph to the shirt mesh
      const targetMorph = SIZE_MATRIX[size].morph;
      viewerRef.current.morphTargetInfluences = [targetMorph];
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5">
      <model-viewer
        ref={viewerRef}
        src={modelPath} // This is your combined Body + Shirt file
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1.2"
        interaction-prompt="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* SIZE SELECTOR UI */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
          {Object.keys(SIZE_MATRIX).map((size) => (
            <button
              key={size}
              onClick={() => applySize(size)}
              className={`w-14 h-14 rounded-xl font-bold transition-all ${
                activeSize === size 
                ? 'bg-[#46daff] text-black shadow-[0_0_20px_#46daff]' 
                : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </model-viewer>
    </div>
  );
}
