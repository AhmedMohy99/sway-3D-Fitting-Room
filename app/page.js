"use client";
import { useState } from 'react';
import FittingRoom from '../components/FittingRoom';
import SizeGuideModal from '../components/SizeGuideModal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-10">
      {/* Header based on your Sway Studio Logo */}
      <header className="flex justify-between items-center max-w-5xl mx-auto mb-10">
        <div>
          <h1 className="text-3xl font-black italic text-[#46daff] uppercase tracking-tighter">
            Sway Studio
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            AI Powered Fitting
          </p>
        </div>
        <button className="bg-[#46daff] text-black text-[10px] font-bold px-5 py-2 rounded-full uppercase">
          Try & Test
        </button>
      </header>

      {/* Main Experience */}
      <section className="max-w-3xl mx-auto">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold italic uppercase">The Catalyst Tee</h2>
          <button 
            onClick={() => setModalOpen(true)}
            className="text-[#46daff] text-[10px] underline underline-offset-4 uppercase tracking-widest"
          >
            Size Guide
          </button>
        </div>

        {/* This loads your GLB file from public/models/ */}
        <FittingRoom modelPath="/models/maverick-phoenix-white.glb" />
      </section>

      {/* The SZ1 Table Popup */}
      <SizeGuideModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
