
export const zodiacSigns = [
  {
    name: 'Aries',
    dates: 'Mar 21 - Apr 19',
    symbol: '♈',
    element: 'Fire',
    ruling_planet: 'Mars',
    traits: ['Courageous', 'Energetic', 'Confident', 'Impulsive'],
    color: '#FF5757',
    icon: '/assets/icons/aries.svg',
  },
  {
    name: 'Taurus',
    dates: 'Apr 20 - May 20',
    symbol: '♉',
    element: 'Earth',
    ruling_planet: 'Venus',
    traits: ['Patient', 'Reliable', 'Practical', 'Devoted'],
    color: '#80B74C',
    icon: '/assets/icons/taurus.svg',
  },
  {
    name: 'Gemini',
    dates: 'May 21 - Jun 20',
    symbol: '♊',
    element: 'Air',
    ruling_planet: 'Mercury',
    traits: ['Adaptable', 'Versatile', 'Curious', 'Communicative'],
    color: '#FFDF5C',
    icon: '/assets/icons/gemini.svg',
  },
  {
    name: 'Cancer',
    dates: 'Jun 21 - Jul 22',
    symbol: '♋',
    element: 'Water',
    ruling_planet: 'Moon',
    traits: ['Emotional', 'Nurturing', 'Protective', 'Intuitive'],
    color: '#5FCAD9',
    icon: '/assets/icons/cancer.svg',
  },
  {
    name: 'Leo',
    dates: 'Jul 23 - Aug 22',
    symbol: '♌',
    element: 'Fire',
    ruling_planet: 'Sun',
    traits: ['Generous', 'Loyal', 'Creative', 'Passionate'],
    color: '#FFA02F',
    icon: '/assets/icons/leo.svg',
  },
  {
    name: 'Virgo',
    dates: 'Aug 23 - Sep 22',
    symbol: '♍',
    element: 'Earth',
    ruling_planet: 'Mercury',
    traits: ['Analytical', 'Practical', 'Diligent', 'Critical'],
    color: '#A4CF62',
    icon: '/assets/icons/virgo.svg',
  },
  {
    name: 'Libra',
    dates: 'Sep 23 - Oct 22',
    symbol: '♎',
    element: 'Air',
    ruling_planet: 'Venus',
    traits: ['Diplomatic', 'Fair', 'Sociable', 'Idealistic'],
    color: '#CF9BE0',
    icon: '/assets/icons/libra.svg',
  },
  {
    name: 'Scorpio',
    dates: 'Oct 23 - Nov 21',
    symbol: '♏',
    element: 'Water',
    ruling_planet: 'Pluto, Mars',
    traits: ['Passionate', 'Resourceful', 'Brave', 'Intense'],
    color: '#B35D5E',
    icon: '/assets/icons/scorpio.svg',
  },
  {
    name: 'Sagittarius',
    dates: 'Nov 22 - Dec 21',
    symbol: '♐',
    element: 'Fire',
    ruling_planet: 'Jupiter',
    traits: ['Optimistic', 'Adventurous', 'Independent', 'Restless'],
    color: '#E76F51',
    icon: '/assets/icons/sagittarius.svg',
  },
  {
    name: 'Capricorn',
    dates: 'Dec 22 - Jan 19',
    symbol: '♑',
    element: 'Earth',
    ruling_planet: 'Saturn',
    traits: ['Ambitious', 'Disciplined', 'Practical', 'Patient'],
    color: '#5B7F85',
    icon: '/assets/icons/capricorn.svg',
  },
  {
    name: 'Aquarius',
    dates: 'Jan 20 - Feb 18',
    symbol: '♒',
    element: 'Air',
    ruling_planet: 'Uranus, Saturn',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    color: '#329DC2',
    icon: '/assets/icons/aquarius.svg',
  },
  {
    name: 'Pisces',
    dates: 'Feb 19 - Mar 20',
    symbol: '♓',
    element: 'Water',
    ruling_planet: 'Neptune, Jupiter',
    traits: ['Intuitive', 'Compassionate', 'Artistic', 'Dreamy'],
    color: '#8B96E0',
    icon: '/assets/icons/pisces.svg',
  },
];

export const getZodiacSign = (month: number, day: number): string => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
};

export const getZodiacData = (sign: string) => {
  return zodiacSigns.find(zodiac => zodiac.name.toLowerCase() === sign.toLowerCase());
};
