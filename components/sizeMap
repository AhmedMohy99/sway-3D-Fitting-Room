"use client";
import { useRef, useState } from 'react';

export default function FittingRoom({ modelPath }) {
  const viewerRef = useRef(null);
  const [activeSize, setActiveSize] = useState('L');

  // Mapping sizes based on your SZ1 chart (S to 2XL)
  const sizeMap = {
    'S': 0,
    'M': 0.25,
    'L': 0.5,
    'XL': 0.75,
    '2XL': 1.0 // This maps to the largest Shape Key you make in Blender
  };

  const handleSizeChange = (size) => {
    setActiveSize(size);
    if (viewerRef.current) {
      // Moves the 3D vertices to the specific size geometry
      viewerRef.current.morphTargetInfluences = [sizeMap[size]];
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-swayBlack rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      <model-viewer
        ref={viewerRef}
        src={modelPath}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="1.2"
        environment-image="neutral"
        style={{ width: '100%', height: '100%' }}
      >
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-6">
          <div className="flex gap-2 bg-black/60 backdrop-blur-xl p-2 rounded-2xl border border-white/10">
            {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl font-bold transition-all text-sm ${
                  activeSize === size 
                  ? 'bg-swayCyan text-black shadow-[0_0_20px_#46daff]' 
                  : 'bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </model-viewer>
    </div>
  );
}
