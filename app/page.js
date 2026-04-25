import FittingRoom from '../FittingRoom';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <h1 className="text-white text-4xl font-bold mb-8">Sway Maverick Fitting Room</h1>
      <div className="w-full max-w-4xl border border-gray-800 rounded-lg overflow-hidden">
        {/* Load your GLB file from public/models/ */}
        <FittingRoom modelPath="/models/maverick-phoenix-white.glb" />
      </div>
    </main>
  );
}
