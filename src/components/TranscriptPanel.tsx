import { MessageSquare, HelpCircle } from 'lucide-react';

interface TranscriptLine {
  timestamp: string;
  text: string;
  isRecent: boolean;
}

interface TranscriptPanelProps {
  transcripts: TranscriptLine[];
  onReExplain: (timestamp: string) => void;
}

export function TranscriptPanel({ transcripts, onReExplain }: TranscriptPanelProps) {
  return (
    <div className="glass rounded-2xl p-5 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="size-5 text-[#6A4CFF]" />
        <h3 className="font-bold text-gray-800">Live Transcript</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {transcripts.map((line, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg transition-all ${
              line.isRecent
                ? 'bg-[#E6DFFF] border-l-4 border-[#6A4CFF]'
                : 'bg-white/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#6A4CFF]">{line.timestamp}</span>
              {line.isRecent && (
                <span className="text-xs bg-[#6A4CFF] text-white px-2 py-0.5 rounded-full">
                  Recent
                </span>
              )}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{line.text}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => onReExplain(transcripts[transcripts.length - 1]?.timestamp)}
        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#6A4CFF] to-[#B8A4FF] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
      >
        <HelpCircle className="size-5" />
        Re-explain this section
      </button>
    </div>
  );
}
