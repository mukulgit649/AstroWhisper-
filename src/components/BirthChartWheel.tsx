import React, { useState } from 'react';
import { PlanetPosition, PlanetaryPositions } from '@/utils/birthChartCalculations';

interface BirthChartWheelProps {
  positions: PlanetaryPositions;
  onPlanetClick?: (planet: string) => void;
}

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const planets = [
  { name: 'Sun', symbol: '☉', color: '#FFD700' },
  { name: 'Moon', symbol: '☽', color: '#C0C0C0' },
  { name: 'Mercury', symbol: '☿', color: '#A9A9A9' },
  { name: 'Venus', symbol: '♀', color: '#FFA07A' },
  { name: 'Mars', symbol: '♂', color: '#FF4500' },
  { name: 'Jupiter', symbol: '♃', color: '#DAA520' },
  { name: 'Saturn', symbol: '♄', color: '#B8860B' },
  { name: 'Uranus', symbol: '♅', color: '#40E0D0' },
  { name: 'Neptune', symbol: '♆', color: '#4169E1' },
  { name: 'Pluto', symbol: '♇', color: '#8B008B' },
  { name: 'Ascendant', symbol: 'AC', color: '#FF69B4' }
];

const getPlanetPosition = (positions: PlanetaryPositions, planet: string): PlanetPosition | undefined => {
  return positions[planet.toLowerCase() as keyof PlanetaryPositions];
};

const getAngle = (position: PlanetPosition): number => {
  const signIndex = zodiacSigns.indexOf(position.sign);
  return (signIndex * 30) + (position.degree / 30);
};

const getXY = (angleDeg: number, radius: number) => {
  const angle = angleDeg * Math.PI / 180;
  const x = 50 + Math.cos(angle - Math.PI / 2) * radius;
  const y = 50 + Math.sin(angle - Math.PI / 2) * radius;
  return { x, y };
};

const aspectTypes = [
  { name: 'Trine', angle: 120, color: '#00FFD0' },
  { name: 'Square', angle: 90, color: '#FF00A0' },
  { name: 'Opposition', angle: 180, color: '#FFB300' }
];

const BirthChartWheel: React.FC<BirthChartWheelProps> = ({ positions, onPlanetClick }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // House cusps (12 houses, evenly spaced)
  const houseCusps = Array.from({ length: 12 }, (_, i) => i * 30);

  // Prepare planet positions for aspect lines
  const planetPoints = planets.map(planet => {
    const pos = getPlanetPosition(positions, planet.name);
    if (!pos) return null;
    const angle = getAngle(pos);
    return { ...planet, angle, ...getXY(angle, 30) };
  }).filter(Boolean) as Array<{ name: string; symbol: string; color: string; angle: number; x: number; y: number }>;

  // Calculate aspect lines (trine, square, opposition)
  const aspectLines: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }> = [];
  for (let i = 0; i < planetPoints.length; i++) {
    for (let j = i + 1; j < planetPoints.length; j++) {
      const a = planetPoints[i];
      const b = planetPoints[j];
      const diff = Math.abs(a.angle - b.angle) % 360;
      for (const aspect of aspectTypes) {
        if (Math.abs(diff - aspect.angle) < 4) { // 4 degree orb
          aspectLines.push({
            x1: a.x, y1: a.y, x2: b.x, y2: b.y, color: aspect.color
          });
        }
      }
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      {/* SVG for aspect lines and houses */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ zIndex: 1 }}>
        {/* House cusps */}
        {houseCusps.map((deg, i) => {
          const { x, y } = getXY(deg, 48);
          return (
            <g key={i}>
              {/* House line */}
              <line x1="50" y1="50" x2={x} y2={y} stroke="#7C3AED" strokeWidth="0.5" />
              {/* House number */}
              <text x={50 + Math.cos((deg - 15) * Math.PI / 180) * 42} y={50 + Math.sin((deg - 15) * Math.PI / 180) * 42} fill="#B794F4" fontSize="3" textAnchor="middle" alignmentBaseline="middle" fontFamily="Cinzel">
                {i + 1}
              </text>
            </g>
          );
        })}
        {/* Aspect lines */}
        {aspectLines.map((line, idx) => (
          <line key={idx} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke={line.color} strokeWidth="0.7" opacity="0.7" />
        ))}
      </svg>
      {/* Outer ring - Houses */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/40"></div>
      {/* Middle ring - Signs */}
      <div className="absolute inset-8 rounded-full border border-purple-500/50"></div>
      {/* Inner ring - Planets */}
      <div className="absolute inset-16 rounded-full border border-purple-500/60"></div>
      {/* Zodiac Signs */}
      <div className="absolute inset-0">
        {zodiacSigns.map((sign, index) => {
          const angle = (index * 30) * Math.PI / 180;
          const radius = 45;
          const x = Math.cos(angle - Math.PI / 2) * radius;
          const y = Math.sin(angle - Math.PI / 2) * radius;
          return (
            <div
              key={sign}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${50 + y}%`,
                left: `${50 + x}%`
              }}
              onMouseEnter={() => setHovered(sign)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-10 h-10 rounded-full bg-navy-900/80 backdrop-blur-sm flex items-center justify-center border border-purple-500/70 shadow-[0_0_15px_rgba(159,68,211,0.5)]">
                <span className="text-astro-glow text-lg">{sign[0]}</span>
              </div>
              {/* Tooltip for sign */}
              {hovered === sign && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-navy-900/90 text-purple-200 text-xs rounded shadow-lg z-50 whitespace-nowrap font-cinzel">
                  {sign}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Planets */}
      <div className="absolute inset-0">
        {planets.map(planet => {
          const position = getPlanetPosition(positions, planet.name);
          if (!position) return null;
          const angle = getAngle(position) * Math.PI / 180;
          const radius = 30;
          const x = Math.cos(angle - Math.PI / 2) * radius;
          const y = Math.sin(angle - Math.PI / 2) * radius;
          return (
            <div
              key={planet.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
              style={{
                top: `${50 + y}%`,
                left: `${50 + x}%`
              }}
              onClick={() => onPlanetClick?.(planet.name)}
              onMouseEnter={() => setHovered(planet.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center border shadow-[0_0_15px_rgba(159,68,211,0.5)]"
                style={{
                  backgroundColor: `${planet.color}20`,
                  borderColor: planet.color,
                  color: planet.color
                }}
              >
                <span className="text-lg">{planet.symbol}</span>
              </div>
              {/* Tooltip for planet */}
              {hovered === planet.name && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-navy-900/90 text-purple-200 text-xs rounded shadow-lg z-50 whitespace-nowrap font-cinzel">
                  {planet.name} in {position.sign} {Math.round(position.degree)}°
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BirthChartWheel; 