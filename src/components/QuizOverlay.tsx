import { Brain, Zap } from 'lucide-react';
import { useState } from 'react';

interface QuizOverlayProps {
  active: boolean;
  onToggle: () => void;
}

export function QuizOverlay({ active, onToggle }: QuizOverlayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const quizData = {
    question: "What is the time complexity of Binary Search?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)"
    ],
    correctAnswer: 1
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={onToggle}
        className={`absolute top-4 right-4 p-3 rounded-full shadow-2xl transition-all duration-300 ${
          active 
            ? 'bg-[#6A4CFF] ring-4 ring-[#B8A4FF]/50' 
            : 'bg-gradient-to-br from-[#6A4CFF] to-[#B8A4FF] hover:scale-110'
        }`}
      >
        {active ? (
          <Brain className="size-6 text-white" />
        ) : (
          <Zap className="size-6 text-white" />
        )}
      </button>

      {/* Quiz Card */}
      {active && (
        <div className="absolute top-20 right-4 w-80 glass-purple rounded-2xl p-5 shadow-2xl animate-in slide-in-from-right-5 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="size-5 text-[#6A4CFF]" />
            <h3 className="font-bold text-[#6A4CFF]">Quick Quiz</h3>
          </div>

          <p className="text-sm font-medium text-gray-800 mb-4">
            {quizData.question}
          </p>

          <div className="space-y-2 mb-4">
            {quizData.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all border-2 ${
                  selectedAnswer === idx
                    ? 'bg-[#6A4CFF] text-white border-[#6A4CFF] shadow-lg'
                    : 'bg-white/70 hover:bg-white border-transparent hover:border-[#B8A4FF]'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
              </button>
            ))}
          </div>

          <button
            disabled={selectedAnswer === null}
            className="w-full py-2 bg-gradient-to-r from-[#6A4CFF] to-[#B8A4FF] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        </div>
      )}
    </>
  );
}
