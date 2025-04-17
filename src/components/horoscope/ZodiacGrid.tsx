
import { zodiacSigns } from "@/utils/zodiacData";

interface ZodiacGridProps {
  selectedSign: string;
  onSelectSign: (sign: string) => void;
}

const ZodiacGrid = ({ selectedSign, onSelectSign }: ZodiacGridProps) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-8 text-white">Choose Your Sign</h2>
      <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.name}
            onClick={() => onSelectSign(sign.name)}
            className={`relative flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
              selectedSign === sign.name
                ? 'bg-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.5)]'
                : 'bg-navy-800/50 hover:bg-purple-600/20'
            }`}
          >
            <span className="text-3xl mb-2">{sign.symbol}</span>
            <span className="text-sm font-medium">{sign.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ZodiacGrid;
