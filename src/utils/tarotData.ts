export interface TarotCard {
  name: string;
  arcana: 'major' | 'minor';
  suit?: string;
  number: number | string;
  keywords: string[];
  description: string;
  upright: string[];
  reversed: string[];
  image: string;
  element?: string;
  planet?: string;
  zodiac?: string;
  symbolism: string[];
  advice: string[];
  warning: string[];
  affirmation: string;
  reversedAffirmation: string;
  numerology: string;
  astrological: string;
  mythology: string;
  crystals: string[];
  colors: string[];
}

export const tarotDeck: TarotCard[] = [
  {
    name: 'The Fool',
    arcana: 'major',
    number: 0,
    keywords: ['Beginnings', 'Innocence', 'Spontaneity', 'Free spirit', 'Adventure', 'Trust'],
    description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    upright: [
      'Taking a leap of faith',
      'Embracing new experiences',
      'Trusting your intuition',
      'Living in the moment',
      'Following your heart',
      'Starting a new journey'
    ],
    reversed: [
      'Reckless behavior',
      'Poor judgment',
      'Naivety',
      'Foolish risks',
      'Lack of planning',
      'Missing opportunities'
    ],
    image: '/assets/tarot/major/fool.jpg',
    element: 'Air',
    planet: 'Uranus',
    zodiac: 'Aquarius',
    symbolism: [
      'White rose of purity',
      'Small dog representing loyalty',
      'Cliff edge showing risk',
      'Sun rising in background',
      'Bundle of possessions'
    ],
    advice: [
      'Trust your instincts',
      'Embrace the unknown',
      'Take calculated risks',
      'Stay open to possibilities',
      'Follow your heart'
    ],
    warning: [
      'Don\'t be reckless',
      'Consider consequences',
      'Plan ahead',
      'Stay grounded',
      'Be aware of surroundings'
    ],
    affirmation: 'I trust in the journey ahead and embrace new beginnings with an open heart.',
    reversedAffirmation: 'I take time to consider my options and make wise decisions.',
    numerology: '0 - The beginning, infinite potential, the void before creation',
    astrological: 'Uranus in Aquarius - Innovation, freedom, and breaking from tradition',
    mythology: 'The Holy Fool, the Jester, the Divine Child',
    crystals: ['Clear Quartz', 'Citrine', 'Aventurine'],
    colors: ['Yellow', 'White', 'Sky Blue']
  },
  {
    name: 'The Magician',
    arcana: 'major',
    number: 1,
    keywords: ['Manifestation', 'Power', 'Action', 'Resourcefulness', 'Skill', 'Focus'],
    description: 'The Magician represents action, the power to manifest, creation, willpower and charisma, making something out of nothing and persuasiveness.',
    upright: [
      'Manifesting desires',
      'Using your talents',
      'Taking action',
      'Being resourceful',
      'Focusing your will',
      'Making things happen'
    ],
    reversed: [
      'Manipulation',
      'Untapped potential',
      'Lack of focus',
      'Wasted energy',
      'Deception',
      'Poor planning'
    ],
    image: '/assets/tarot/major/magician.jpg',
    element: 'Air',
    planet: 'Mercury',
    zodiac: 'Gemini',
    symbolism: [
      'Infinity symbol above head',
      'Red and white flowers',
      'Table with elemental tools',
      'Raised wand',
      'Yellow background'
    ],
    advice: [
      'Focus your energy',
      'Use your skills',
      'Take initiative',
      'Be resourceful',
      'Trust your abilities'
    ],
    warning: [
      'Don\'t manipulate others',
      'Avoid scattered energy',
      'Stay focused',
      'Use power wisely',
      'Plan carefully'
    ],
    affirmation: 'I have the power to manifest my desires through focused action and willpower.',
    reversedAffirmation: 'I take time to focus my energy and use my talents wisely.',
    numerology: '1 - New beginnings, leadership, independence',
    astrological: 'Mercury in Gemini - Communication, intellect, and adaptability',
    mythology: 'Hermes Trismegistus, the Divine Messenger',
    crystals: ['Amethyst', 'Lapis Lazuli', 'Clear Quartz'],
    colors: ['Red', 'Yellow', 'White']
  },
  {
    name: 'The High Priestess',
    arcana: 'major',
    number: 2,
    keywords: ['Intuition', 'Sacred knowledge', 'Divine feminine', 'Subconscious'],
    description: 'The High Priestess represents secrets, mystery, intuition, wisdom, making the impossible possible, and knowledge beyond this earthly realm.',
    upright: ['Intuition', 'Sacred knowledge', 'Divine feminine', 'Subconscious'],
    reversed: ['Secrets', 'Disconnected from intuition', 'Withdrawal', 'Repressed feelings'],
    image: '/assets/tarot/major/high-priestess.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'The Empress',
    arcana: 'major',
    number: 3,
    keywords: ['Femininity', 'Beauty', 'Nature', 'Nurturing', 'Abundance'],
    description: 'The Empress represents abundance, nurturing, fertility, maternal influence, growth, creativity, comfort, luxury, beauty, and security.',
    upright: ['Femininity', 'Beauty', 'Nature', 'Nurturing', 'Abundance'],
    reversed: ['Creative block', 'Dependence', 'Smothering', 'Emptiness'],
    image: '/assets/tarot/major/empress.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'The Emperor',
    arcana: 'major',
    number: 4,
    keywords: ['Authority', 'Structure', 'Control', 'Fatherhood', 'Protection'],
    description: 'The Emperor represents structure, order, authority, control, leadership, achievement, discipline, and paternal influence.',
    upright: ['Authority', 'Structure', 'Control', 'Fatherhood', 'Protection'],
    reversed: ['Domination', 'Excessive control', 'Rigidity', 'Stubbornness'],
    image: '/assets/tarot/major/emperor.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'The Star',
    arcana: 'major',
    number: 17,
    keywords: ['Hope', 'Faith', 'Purpose', 'Renewal', 'Spirituality'],
    description: 'The Star represents hope, faith, purpose, renewal, spirituality, and being inspired by higher powers. It suggests a moment of peace, reprieve and divine connection.',
    upright: ['Hope', 'Faith', 'Purpose', 'Renewal', 'Spirituality'],
    reversed: ['Lack of faith', 'Despair', 'Disconnection', 'Discouragement'],
    image: '/assets/tarot/major/star.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'The Moon',
    arcana: 'major',
    number: 18,
    keywords: ['Illusion', 'Fear', 'Anxiety', 'Subconscious', 'Intuition'],
    description: 'The Moon represents illusion, fear, anxiety, intuition, subconscious, and the unknown. It suggests a time of uncertainty and potential deception, where things are not as they seem.',
    upright: ['Illusion', 'Fear', 'Anxiety', 'Subconscious', 'Intuition'],
    reversed: ['Release of fear', 'Repressed emotions', 'Confusion', 'Misinterpretation'],
    image: '/assets/tarot/major/moon.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'The Sun',
    arcana: 'major',
    number: 19,
    keywords: ['Joy', 'Success', 'Celebration', 'Positivity', 'Vitality'],
    description: 'The Sun represents success, radiance, abundance, vitality, and joy. It suggests a time of enlightenment, clarity and warmth, with positive outcomes likely.',
    upright: ['Joy', 'Success', 'Celebration', 'Positivity', 'Vitality'],
    reversed: ['Temporary depression', 'External validation', 'Inner child', 'Overconfidence'],
    image: '/assets/tarot/major/sun.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'Death',
    arcana: 'major',
    number: 13,
    keywords: ['Endings', 'Change', 'Transformation', 'Transition', 'Letting go'],
    description: 'Death represents transformation, endings, changes, transitions, letting go of the past, and moving on to something new. It\'s about the natural cycle of life, death, and rebirth.',
    upright: ['Endings', 'Change', 'Transformation', 'Transition', 'Letting go'],
    reversed: ['Resistance to change', 'Stagnation', 'Holding on', 'Inability to move on'],
    image: '/assets/tarot/major/death.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'The Tower',
    arcana: 'major',
    number: 16,
    keywords: ['Sudden change', 'Upheaval', 'Chaos', 'Revelation', 'Awakening'],
    description: 'The Tower represents sudden change, upheaval, chaos, revelation, and awakening. It suggests a time of crisis and destruction, but also breakthrough and opportunity for growth through challenge.',
    upright: ['Sudden change', 'Upheaval', 'Chaos', 'Revelation', 'Awakening'],
    reversed: ['Fear of change', 'Avoiding disaster', 'Delayed destruction', 'Resistance to truth'],
    image: '/assets/tarot/major/tower.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  // Minor Arcana (sample, fill in the rest similarly)
  {
    name: 'Ace of Wands',
    arcana: 'minor',
    suit: 'Wands',
    number: 'Ace',
    keywords: ['Inspiration', 'New opportunities', 'Growth', 'Potential'],
    description: 'The Ace of Wands represents the spark of inspiration, new beginnings, and creative potential.',
    upright: ['Inspiration', 'New opportunities', 'Growth', 'Potential'],
    reversed: ['Delays', 'Lack of motivation', 'Missed opportunities'],
    image: '/assets/tarot/minor/wands/ace.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  {
    name: 'Two of Wands',
    arcana: 'minor',
    suit: 'Wands',
    number: 2,
    keywords: ['Planning', 'Decisions', 'Discovery'],
    description: 'The Two of Wands represents planning for the future, making decisions, and discovering new paths.',
    upright: ['Planning', 'Decisions', 'Discovery'],
    reversed: ['Fear of change', 'Playing it safe', 'Bad planning'],
    image: '/assets/tarot/minor/wands/2.jpg',
    symbolism: [],
    advice: [],
    warning: [],
    affirmation: '',
    reversedAffirmation: '',
    numerology: '',
    astrological: '',
    mythology: '',
    crystals: [],
    colors: [],
  },
  // ... Add all other Minor Arcana cards (Cups, Swords, Pentacles) here ...
];

export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  return tarotDeck[randomIndex];
};

export const getCardByName = (name: string): TarotCard | undefined => {
  return tarotDeck.find(card => card.name.toLowerCase() === name.toLowerCase());
};
