"use client";
import { useRef } from 'react';

export default function FittingRoom({ modelPath }) {
  const viewerRef = useRef(null);

  const changeSize = (value) => {
    // This value (0 to 1) controls the Shape Keys you made in Blender
    // 0 = Size S, 0.5 = Size M, 1.0 = Size XL
    if (viewerRef.current) {
      viewerRef.current.morphTargetInfluences = [value];
    }
  };

  return (
    <div className="flex flex-col items-center">
      <model-viewer
        ref={viewerRef}
        src={modelPath}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        style={{ width: '100%', height: '500px', backgroundColor: '#111' }}
      >
        <div className="absolute bottom-10 flex gap-4 w-full justify-center">
          <button onClick={() => changeSize(0)} className="bg-cyan-500 px-4 py-2">S</button>
          <button onClick={() => changeSize(0.5)} className="bg-cyan-500 px-4 py-2">M</button>
          <button onClick={() => changeSize(1)} className="bg-cyan-500 px-4 py-2">XL</button>
        </div>
      </model-viewer>
    </div>
  );
}
