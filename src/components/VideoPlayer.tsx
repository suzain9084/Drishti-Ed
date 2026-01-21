import { Play, Pause, Volume2, Maximize, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  aiActive: boolean;
  dimmed: boolean;
}

export function VideoPlayer({ aiActive, dimmed }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState('5:23');
  const [duration] = useState('15:40');
  const [speed, setSpeed] = useState(1);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Simulate progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
      aiActive ? 'ring-4 ring-[#6A4CFF] ring-opacity-50 shadow-[0_0_30px_rgba(106,76,255,0.3)]' : ''
    }`}>
      {/* Video Display Area */}
      <div className={`aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative transition-opacity duration-300 ${
        dimmed ? 'opacity-40' : 'opacity-100'
      }`}>
        {/* Simulated video content */}
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block p-6 bg-[#6A4CFF]/20 rounded-full">
              <Play className="size-16 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Binary Search Algorithm</h2>
          <p className="text-gray-400">Data Structures & Algorithms - Lecture 12</p>
        </div>

        {/* AI Active Indicator */}
        {aiActive && (
          <div className="absolute top-4 left-4 flex items-center gap-2 glass-purple rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-[#6A4CFF] rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-white">AI Active</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="relative h-2 bg-gray-700 rounded-full cursor-pointer group">
            <div
              className="absolute h-full bg-gradient-to-r from-[#6A4CFF] to-[#B8A4FF] rounded-full transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 bg-[#6A4CFF] hover:bg-[#5239D9] rounded-full transition-all"
            >
              {isPlaying ? (
                <Pause className="size-5 text-white" />
              ) : (
                <Play className="size-5 text-white" />
              )}
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-all">
              <Volume2 className="size-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Speed:</span>
              <div className="relative group">
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-all">
                  {speed}x
                </button>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 rounded-lg shadow-xl p-2 whitespace-nowrap">
                  {speeds.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`block w-full px-3 py-1 text-sm text-left rounded ${
                        s === speed ? 'bg-[#6A4CFF] text-white' : 'text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-all">
              <Settings className="size-5 text-white" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-all">
              <Maximize className="size-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
