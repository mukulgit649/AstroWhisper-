
import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

const SuggestedQuestions = ({ questions, onSelectQuestion }: SuggestedQuestionsProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-xs text-foreground/50 mb-2">Try asking about:</h4>
      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <Button
            key={question}
            onClick={() => onSelectQuestion(question)}
            variant="ghost"
            className="text-xs px-3 py-1.5 rounded-full bg-astro-purple/20 hover:bg-astro-purple/30 transition-colors h-auto"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
