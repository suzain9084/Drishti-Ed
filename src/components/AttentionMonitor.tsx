import { Eye, Smile, Frown, Meh } from 'lucide-react';

interface AttentionMonitorProps {
  gaze: 'Focused' | 'Distracted';
  emotion: 'Confused' | 'Bored' | 'Engaged';
}

export function AttentionMonitor({ gaze, emotion }: AttentionMonitorProps) {
  const gazeColor = gaze === 'Focused' ? 'text-green-500' : 'text-orange-500';
  const emotionColor = 
    emotion === 'Engaged' ? 'text-green-500' : 
    emotion === 'Confused' ? 'text-yellow-500' : 
    'text-orange-500';

  const EmotionIcon = 
    emotion === 'Engaged' ? Smile : 
    emotion === 'Confused' ? Meh : 
    Frown;

  return (
    <div className="glass-purple rounded-2xl p-4 shadow-xl min-w-[200px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1 bg-[#6A4CFF] rounded-lg">
          <Eye className="size-4 text-white" />
        </div>
        <span className="text-xs font-semibold text-[#6A4CFF]">Attention Monitor</span>
      </div>

      {/* Webcam Preview */}
      <div className="flex justify-center mb-3">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#6A4CFF] to-[#B8A4FF] flex items-center justify-center shadow-lg ring-2 ring-white/50">
          <div className="h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center">
            <Eye className="size-6 text-white" />
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
          <span className="text-gray-700 font-medium">Gaze:</span>
          <span className={`font-bold ${gazeColor}`}>{gaze}</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-white/50 rounded-lg">
          <span className="text-gray-700 font-medium">Emotion:</span>
          <div className="flex items-center gap-1">
            <EmotionIcon className={`size-4 ${emotionColor}`} />
            <span className={`font-bold ${emotionColor}`}>{emotion}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
