
import { Badge } from "@/components/ui/badge";
import { getZodiacData } from "@/utils/zodiacData";

interface SignDetailsProps {
  signName: string;
}

const SignDetails = ({ signName }: SignDetailsProps) => {
  const sign = getZodiacData(signName);
  if (!sign) return null;

  return (
    <div className="w-full bg-navy-900/80 p-6 rounded-2xl mt-6 border border-purple-500/20 backdrop-blur-sm">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{sign.symbol}</span>
        <div>
          <h3 className="text-xl font-bold text-white">{sign.name}</h3>
          <p className="text-gray-400 text-sm">{sign.dates}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        <span className="bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full text-xs">
          {sign.element} Sign
        </span>
        <span className="bg-purple-900/40 text-purple-200 px-3 py-1 rounded-full text-xs">
          {sign.ruling_planet.split(',')[0]}
        </span>
      </div>

      <div className="mt-4">
        <h4 className="text-sm text-gray-400 mb-3">TRAITS</h4>
        <div className="flex flex-wrap gap-2">
          {sign.traits.map((trait) => (
            <Badge
              key={trait}
              variant="outline"
              className="bg-purple-600/20 border-purple-500/30 text-purple-200 hover:bg-purple-600/30 transition-colors duration-300 px-3 py-1"
            >
              {trait}
            </Badge>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed mt-4">
        {sign.description.substring(0, 150)}...
      </p>
    </div>
  );
};

export default SignDetails;
