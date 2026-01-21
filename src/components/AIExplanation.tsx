import { Lightbulb, ThumbsUp, RotateCcw } from 'lucide-react';

interface AIExplanationProps {
  visible: boolean;
  explanation: string;
  onGotIt: () => void;
  onExplainAgain: () => void;
}

export function AIExplanation({ visible, explanation, onGotIt, onExplainAgain }: AIExplanationProps) {
  if (!visible) return null;

  return (
    <div className="absolute bottom-4 left-4 right-4 glass-purple rounded-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gradient-to-br from-[#6A4CFF] to-[#B8A4FF] rounded-xl shadow-lg flex-shrink-0">
          <Lightbulb className="size-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-[#6A4CFF] mb-2">AI Simplified Explanation</h3>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {explanation}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onGotIt}
              className="flex items-center gap-2 px-4 py-2 bg-[#6A4CFF] hover:bg-[#5239D9] text-white rounded-lg font-medium transition-all shadow-lg"
            >
              <ThumbsUp className="size-4" />
              Got it 👍
            </button>
            <button
              onClick={onExplainAgain}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-[#6A4CFF] rounded-lg font-medium transition-all border border-[#6A4CFF]/30"
            >
              <RotateCcw className="size-4" />
              Explain Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
