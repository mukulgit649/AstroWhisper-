import { useState } from 'react';
import { calculatePlanetaryPositions, getPersonalizedReading } from '@/utils/birthChartCalculations';
import BackToHome from '@/components/BackToHome';
import Navbar from '@/components/Navbar';

const BirthChart = () => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [reading, setReading] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'birthTime':
        setBirthTime(value);
        break;
      case 'latitude':
        setLatitude(Number(value));
        break;
      case 'longitude':
        setLongitude(Number(value));
        break;
      default:
        break;
    }
  };

  const handleDateChange = (date: Date | null) => {
    setBirthDate(date);
  };

  const handleSubmit = () => {
    if (birthDate && birthTime && latitude !== null && longitude !== null) {
      const positions = calculatePlanetaryPositions(birthDate, birthTime, latitude, longitude);
      setChartData(positions);
      const personalizedReading = getPersonalizedReading(positions);
      setReading(personalizedReading);
    } else {
      alert("Please fill in all the birth chart details.");
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />
      <div className="container mx-auto py-16 px-6 relative z-10">
        <h1 className="text-3xl font-bold text-center text-white mb-8 glow-text">
          Generate Your Birth Chart
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Birth Date:
              </label>
              <input
                type="date"
                onChange={(e: any) => handleDateChange(new Date(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Birth Time (HH:MM):
              </label>
              <input
                type="time"
                name="birthTime"
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Latitude:
              </label>
              <input
                type="number"
                name="latitude"
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2">
                Longitude:
              </label>
              <input
                type="number"
                name="longitude"
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="glow-btn"
                type="button"
                onClick={handleSubmit}
              >
                Calculate Chart
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div>
            {chartData && (
              <div className="text-white">
                <h2 className="text-xl font-semibold mb-4 glow-text">
                  Planetary Positions:
                </h2>
                <ul>
                  {Object.entries(chartData).map(([planet, data]: any) => (
                    <li key={planet} className="mb-2">
                      {planet}: {data.sign} - {data.degree}°
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {reading && (
              <div className="text-white mt-8">
                <h2 className="text-xl font-semibold mb-4 glow-text">
                  Personalized Reading:
                </h2>
                <p className="mb-4">{reading.summary}</p>

                <h3 className="text-lg font-semibold mb-2 glow-text">
                  Key Aspects:
                </h3>
                <ul>
                  {reading.aspects.map((aspect: string, index: number) => (
                    <li key={index} className="mb-1">
                      - {aspect}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-2 mt-4 glow-text">
                  Recommendations:
                </h3>
                <ul>
                  {reading.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="mb-1">
                      - {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

export default BirthChart;
