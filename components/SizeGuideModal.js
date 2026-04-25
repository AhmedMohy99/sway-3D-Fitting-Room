"use client";
import { useRef, useState } from 'react';

export default function FittingRoom({ modelPath }) {
  const viewerRef = useRef(null);
  const [activeSize, setActiveSize] = useState('L');

  // STEP 1: Add the sizeMap here
  // These values (0 to 1) control the "Shape Keys" you made in Blender
  const sizeMap = {
    'S': 0,
    'M': 0.25,
    'L': 0.5,
    'XL': 0.75,
    '2XL': 1.0 
  };

  const handleSizeChange = (size) => {
    setActiveSize(size);
    if (viewerRef.current) {
      // This line tells the 3D model to morph to the selected size
      viewerRef.current.morphTargetInfluences = [sizeMap[size]];
    }
  };

  return (
    <div className="relative w-full h-[500px] bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
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
        {/* Size Selection Buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4">
          {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`px-4 py-2 rounded-xl font-bold transition-all text-xs ${
                activeSize === size 
                ? 'bg-[#46daff] text-black shadow-[0_0_15px_#46daff]' 
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
