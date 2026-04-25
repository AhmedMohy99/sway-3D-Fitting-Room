import FittingRoom from '../components/FittingRoom';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      {/* Header Area */}
      <header className="flex justify-between items-center max-w-6xl mx-auto mb-12">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-swayCyan uppercase">
            Sway Studio
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
            AI Powered Fitting
          </p>
        </div>
        
        <button className="bg-swayCyan text-black text-xs font-bold px-6 py-2 rounded-full shadow-swayGlow uppercase tracking-wider">
          Try & Test
        </button>
      </header>

      {/* Main Experience */}
      <section className="max-w-4xl mx-auto">
        <div className="mb-4 flex justify-between items-end">
          <h2 className="text-xl font-bold italic">THE PHOENIX TEE</h2>
          <button className="text-swayCyan text-xs underline decoration-swayCyan/30 underline-offset-8">
            VIEW SIZE GUIDE
          </button>
        </div>

        <FittingRoom modelPath="/models/maverick-phoenix-white.glb" />
        
        <div className="mt-8 text-center text-gray-600 text-xs tracking-widest">
            360° INTERACTIVE VIEW • DRAG TO ROTATE
        </div>
      </section>
    </main>
  );
}
