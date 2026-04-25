"use client";
import FittingRoom from '../components/FittingRoom';

export default function Home() {
  return (
    <div className="p-10">
       <h1 className="text-[#46daff] italic font-black text-3xl">SWAY STUDIO</h1>
       <FittingRoom modelPath="/models/Model_Fovane_Sway.glb" />
    </div>
  );
}
