export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const sizeData = [
    { size: '1 (S)', width: 52, length: 68 },
    { size: '2 (M)', width: 54, length: 70 },
    { size: '3 (L)', width: 56, length: 72 },
    { size: '4 (XL)', width: 58, length: 74 },
    { size: '5 (2XL)', width: 60, length: 76 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-swayBlack border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-swayCyan font-black italic tracking-tighter text-2xl uppercase">SZ1 SIZE GUIDE</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-[10px] uppercase tracking-[0.2em] border-b border-white/5">
              <th className="pb-4">Size</th>
              <th className="pb-4 text-center">Width (عرض)</th>
              <th className="pb-4 text-center">Length (طول)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sizeData.map((item, idx) => (
              <tr key={idx} className={`border-b border-white/5 last:border-0 ${item.size.includes('2XL') ? 'text-swayCyan font-bold' : ''}`}>
                <td className="py-4 text-white">{item.size}</td>
                <td className="py-4 text-center text-gray-300">{item.width} cm</td>
                <td className="py-4 text-center text-gray-300">{item.length} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <p className="mt-6 text-[9px] text-gray-600 uppercase text-center tracking-widest">
            Measurements are in centimeters
        </p>
      </div>
    </div>
  );
}
