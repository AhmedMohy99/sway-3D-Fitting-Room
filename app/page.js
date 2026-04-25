<section className="max-w-4xl mx-auto py-10 px-4">
  <div className="flex justify-between items-end mb-6">
    <div>
      <h2 className="text-[#46daff] font-black italic text-3xl italic tracking-tighter uppercase">Maverick Phoenix</h2>
      <p className="text-gray-500 text-xs">Premium Heavyweight Cotton</p>
    </div>
    <div className="text-right">
      <p className="text-white font-bold">500 EGP</p>
      <button className="text-[#46daff] text-[10px] underline tracking-widest uppercase">Size Guide</button>
    </div>
  </div>

  {/* THE 3D MODEL MIDDLE COMPONENT */}
  <FittingRoom modelPath="/models/Model_Fovane_Sway.glb" />
  
  <button className="w-full mt-8 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#46daff] transition-colors">
     Confirm Order via WhatsApp
  </button>
</section>
