
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
}

export const tarotDeck: TarotCard[] = [
  {
    name: 'The Fool',
    arcana: 'major',
    number: 0,
    keywords: ['Beginnings', 'Innocence', 'Spontaneity', 'Free spirit'],
    description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    upright: ['Beginnings', 'Innocence', 'Adventure', 'Optimism'],
    reversed: ['Recklessness', 'Risk-taking', 'Second-guessing', 'Foolishness'],
    image: '/assets/tarot/major/fool.jpg',
  },
  {
    name: 'The Magician',
    arcana: 'major',
    number: 1,
    keywords: ['Manifestation', 'Power', 'Action', 'Resourcefulness'],
    description: 'The Magician represents action, the power to manifest, creation, willpower and charisma, making something out of nothing and persuasiveness.',
    upright: ['Manifestation', 'Power', 'Action', 'Resourcefulness'],
    reversed: ['Manipulation', 'Untapped talents', 'Trickery', 'Wasted potential'],
    image: '/assets/tarot/major/magician.jpg',
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
  }
];

export const getRandomCard = (): TarotCard => {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  return tarotDeck[randomIndex];
};

export const getCardByName = (name: string): TarotCard | undefined => {
  return tarotDeck.find(card => card.name.toLowerCase() === name.toLowerCase());
};
