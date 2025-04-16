
import { Button } from "@/components/ui/button";
import { zodiacSigns } from "@/utils/zodiacData";

interface ZodiacGridProps {
  selectedSign: string;
  onSelectSign: (sign: string) => void;
}

const ZodiacGrid = ({ selectedSign, onSelectSign }: ZodiacGridProps) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-white">Choose Your Sign</h2>
      <div className="grid grid-cols-3 gap-4">
        {zodiacSigns.map((sign) => (
          <Button
            key={sign.name}
            onClick={() => onSelectSign(sign.name)}
            className={`aspect-square p-6 flex flex-col items-center justify-center transition-all duration-300 ${
              selectedSign === sign.name
                ? 'bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(147,51,234,0.5)]'
                : 'bg-navy-800/50 hover:bg-purple-600/20'
            }`}
          >
            <span className="text-3xl mb-2">{sign.symbol}</span>
            <span className="text-sm font-medium">{sign.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ZodiacGrid;
