import { useState } from 'react';

interface TimelineSegment {
  time: number;
  engagement: number; // 0-100
  emotion: string;
}

interface AttentionTimelineProps {
  segments: TimelineSegment[];
}

export function AttentionTimeline({ segments }: AttentionTimelineProps) {
  const [hoveredSegment, setHoveredSegment] = useState<TimelineSegment | null>(null);

  return (
    <div className="glass rounded-2xl p-5 shadow-xl">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Attention Timeline</h3>
      
      <div className="relative">
        <div className="flex gap-1 h-12 items-end">
          {segments.map((segment, idx) => {
            const height = `${segment.engagement}%`;
            const bgColor = segment.engagement > 70 
              ? 'bg-[#6A4CFF]' 
              : segment.engagement > 40 
              ? 'bg-[#B8A4FF]' 
              : 'bg-gray-300';

            return (
              <div
                key={idx}
                className="relative flex-1 group cursor-pointer"
                onMouseEnter={() => setHoveredSegment(segment)}
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div
                  className={`${bgColor} rounded-t-lg transition-all hover:opacity-80`}
                  style={{ height }}
                />
                
                {hoveredSegment === segment && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 glass-purple rounded-lg p-2 shadow-xl whitespace-nowrap z-10 animate-in fade-in duration-200">
                    <p className="text-xs font-bold text-[#6A4CFF]">{segment.time}s</p>
                    <p className="text-xs text-gray-700">{segment.emotion}</p>
                    <p className="text-xs text-gray-600">{segment.engagement}% engaged</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Time markers */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0:00</span>
          <span>5:00</span>
          <span>10:00</span>
          <span>15:00</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#6A4CFF] rounded"></div>
          <span className="text-gray-600">High</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#B8A4FF] rounded"></div>
          <span className="text-gray-600">Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-300 rounded"></div>
          <span className="text-gray-600">Low</span>
        </div>
      </div>
    </div>
  );
}
