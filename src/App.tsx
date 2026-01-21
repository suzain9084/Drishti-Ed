import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { VideoPlayer } from './components/VideoPlayer';
import { AttentionMonitor } from './components/AttentionMonitor';
import { AIExplanation } from './components/AIExplanation';
import { QuizOverlay } from './components/QuizOverlay';
import { TranscriptPanel } from './components/TranscriptPanel';
import { AttentionTimeline } from './components/AttentionTimeline';

export default function App() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [gaze, setGaze] = useState<'Focused' | 'Distracted'>('Focused');
  const [emotion, setEmotion] = useState<'Confused' | 'Bored' | 'Engaged'>('Engaged');
  const [aiActive, setAiActive] = useState(false);

  // Mock transcript data
  const transcripts = [
    { 
      timestamp: '5:10', 
      text: 'Binary search is a highly efficient algorithm for finding an element in a sorted array.', 
      isRecent: false 
    },
    { 
      timestamp: '5:15', 
      text: 'It works by repeatedly dividing the search interval in half, comparing the middle element.', 
      isRecent: false 
    },
    { 
      timestamp: '5:23', 
      text: 'The time complexity of binary search is O(log n), which makes it much faster than linear search.', 
      isRecent: true 
    },
  ];

  // Mock attention timeline data
  const timelineSegments = Array.from({ length: 40 }, (_, i) => ({
    time: i * 22.5,
    engagement: Math.random() * 60 + 40,
    emotion: ['Engaged', 'Focused', 'Confused', 'Bored'][Math.floor(Math.random() * 4)]
  }));

  // Simulate AI state changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change attention states
      const gazeStates: ('Focused' | 'Distracted')[] = ['Focused', 'Distracted'];
      const emotionStates: ('Confused' | 'Bored' | 'Engaged')[] = ['Confused', 'Bored', 'Engaged'];
      
      setGaze(gazeStates[Math.floor(Math.random() * gazeStates.length)]);
      setEmotion(emotionStates[Math.floor(Math.random() * emotionStates.length)]);
      
      // Trigger AI explanation occasionally
      if (Math.random() > 0.9) {
        setShowExplanation(true);
        setAiActive(true);
        setTimeout(() => setAiActive(false), 3000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleReExplain = () => {
    setShowExplanation(true);
    setAiActive(true);
  };

  const handleGotIt = () => {
    setShowExplanation(false);
    setAiActive(false);
  };

  const handleExplainAgain = () => {
    // Reset explanation with new content
    setShowExplanation(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="mx-auto max-w-[1600px] px-6 py-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Left Side - Video and Timeline */}
          <div className="space-y-6">
            {/* Video Section */}
            <div className="relative">
              <VideoPlayer aiActive={aiActive} dimmed={showExplanation} />
              
              {/* Overlays */}
              <div className="absolute top-4 right-4 z-10">
                <AttentionMonitor gaze={gaze} emotion={emotion} />
              </div>

              <QuizOverlay active={quizActive} onToggle={() => setQuizActive(!quizActive)} />

              <AIExplanation
                visible={showExplanation}
                explanation="Binary search works like finding a word in a dictionary. Instead of checking every page, you open the middle, see if your word comes before or after, and eliminate half the pages. You repeat this process until you find the word. This halving process is why it's so fast - O(log n) time complexity!"
                onGotIt={handleGotIt}
                onExplainAgain={handleExplainAgain}
              />
            </div>

            {/* Attention Timeline */}
            <AttentionTimeline segments={timelineSegments} />
          </div>

          {/* Right Sidebar - Transcript */}
          <div className="lg:h-[calc(100vh-180px)] hidden lg:block">
            <TranscriptPanel 
              transcripts={transcripts} 
              onReExplain={handleReExplain} 
            />
          </div>
        </div>

        {/* Mobile Transcript - Shows below video on mobile */}
        <div className="lg:hidden mt-6">
          <TranscriptPanel 
            transcripts={transcripts} 
            onReExplain={handleReExplain} 
          />
        </div>
      </div>
    </div>
  );
}
