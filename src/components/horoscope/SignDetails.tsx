
import { Badge } from "@/components/ui/badge";
import { getZodiacData } from "@/utils/zodiacData";

interface SignDetailsProps {
  signName: string;
}

const SignDetails = ({ signName }: SignDetailsProps) => {
  const sign = getZodiacData(signName);
  if (!sign) return null;

  return (
    <div className="w-full bg-navy-800/30 p-6 rounded-xl mt-8 border border-purple-500/20 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(159,68,211,0.3)] transition-all duration-300">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl">{sign.symbol}</span>
        <div>
          <h3 className="text-xl font-bold text-white">{sign.name}</h3>
          <p className="text-gray-400">{sign.dates}</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-400 mb-2">{sign.element} Sign • {sign.ruling_planet}</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-400 uppercase mb-3">TRAITS</h4>
          <div className="flex flex-wrap gap-3">
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

        <p className="text-sm text-gray-300 leading-relaxed">{sign.description}</p>
      </div>
    </div>
  );
};

export default SignDetails;
