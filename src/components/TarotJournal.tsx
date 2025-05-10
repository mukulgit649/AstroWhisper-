import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Filter, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SavedReading {
  id: string;
  date: string;
  question: string;
  card: any;
  notes: string;
}

interface TarotJournalProps {
  readings: SavedReading[];
  onDeleteReading: (id: string) => void;
}

const TarotJournal = ({ readings, onDeleteReading }: TarotJournalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReadings, setFilteredReadings] = useState<SavedReading[]>(readings);
  const [sortBy, setSortBy] = useState<'date' | 'card'>('date');

  useEffect(() => {
    const filtered = readings.filter(reading => {
      const matchesSearch = reading.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reading.card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reading.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return a.card.name.localeCompare(b.card.name);
      }
    });

    setFilteredReadings(sorted);
  }, [readings, searchTerm, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-astro-violet" />
          <h2 className="text-2xl font-bold text-white font-cinzel">Tarot Journal</h2>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search readings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-navy-900/60 border-purple-500/20 text-white"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setSortBy(sortBy === 'date' ? 'card' : 'date')}
            className="gap-2 border-purple-500/30 bg-navy-800/50 hover:bg-navy-800/70 hover:border-purple-500/50 transition-all duration-300 font-cinzel"
          >
            <Filter className="w-4 h-4" />
            Sort by {sortBy === 'date' ? 'Card' : 'Date'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReadings.map((reading) => (
          <Card key={reading.id} className="bg-navy-800/30 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-astro-violet" />
                <span className="text-sm text-gray-400 font-cinzel">
                  {new Date(reading.date).toLocaleDateString()}
                </span>
              </div>
              <Badge className={`${reading.card.isReversed ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'} font-cinzel`}>
                {reading.card.isReversed ? 'Reversed' : 'Upright'}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 font-cinzel">{reading.card.name}</h3>
            
            {reading.question && (
              <div className="mb-4">
                <p className="text-sm text-purple-200 font-cinzel mb-1">Question:</p>
                <p className="text-gray-300 font-cormorant italic">"{reading.question}"</p>
              </div>
            )}

            <div className="mb-4">
              <p className="text-sm text-purple-200 font-cinzel mb-1">Keywords:</p>
              <div className="flex flex-wrap gap-2">
                {reading.card.keywords.slice(0, 3).map((keyword: string, idx: number) => (
                  <Badge 
                    key={idx}
                    className="bg-purple-600/20 border border-purple-500/40 text-purple-200 hover:bg-purple-600/30 transition-colors duration-300 py-1 px-3"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {reading.notes && (
              <div className="mb-4">
                <p className="text-sm text-purple-200 font-cinzel mb-1">Notes:</p>
                <p className="text-gray-300 font-cormorant">{reading.notes}</p>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={() => onDeleteReading(reading.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300 font-cinzel"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredReadings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 font-cormorant">No readings found. Draw some cards to start your journal!</p>
        </div>
      )}
    </div>
  );
};

export default TarotJournal; 