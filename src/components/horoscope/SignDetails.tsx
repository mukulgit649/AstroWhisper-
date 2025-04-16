
import { Badge } from "@/components/ui/badge";
import { getZodiacData } from "@/utils/zodiacData";

interface SignDetailsProps {
  signName: string;
}

const SignDetails = ({ signName }: SignDetailsProps) => {
  const sign = getZodiacData(signName);
  if (!sign) return null;

  return (
    <div className="w-full bg-navy-800/30 p-6 rounded-xl mt-6">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{sign.symbol}</span>
        <div>
          <h3 className="text-xl font-bold text-white">{sign.name}</h3>
          <p className="text-gray-400">{sign.dates}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-2">Fire Sign • {sign.ruling_planet}</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-400 uppercase mb-2">TRAITS</h4>
          <div className="flex flex-wrap gap-2">
            {sign.traits.map((trait) => (
              <Badge
                key={trait}
                variant="outline"
                className="bg-purple-600/20 border-purple-500/30 text-purple-200"
              >
                {trait}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-300 line-clamp-3">{sign.description}</p>
      </div>
    </div>
  );
};

export default SignDetails;
