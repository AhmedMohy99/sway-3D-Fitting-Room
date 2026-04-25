"use client";
import { useRef, useState } from 'react';

export default function FittingRoom({ modelPath }) {
  const viewerRef = useRef(null);
  const [activeSize, setActiveSize] = useState('L');

  // Mapping sizes to Morph Targets (Shape Keys) made in Blender
  const sizeMap = {
    'S': 0,
    'M': 0.33,
    'L': 0.66,
    'XL': 1.0
  };

  const handleSizeChange = (size) => {
    setActiveSize(size);
    if (viewerRef.current) {
      // Logic to trigger the Shape Key in your .glb file
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
        alt="Sway Maverick 3D Tee"
        style={{ width: '100%', height: '100%' }}
      >
        {/* UI Overlay */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-6">
          
          {/* Size Selector */}
          <div className="flex gap-2 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/5">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`w-14 h-14 rounded-xl font-bold transition-all ${
                  activeSize === size 
                  ? 'bg-swayCyan text-black shadow-swayGlow' 
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
