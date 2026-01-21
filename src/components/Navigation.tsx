import { User, Sparkles } from 'lucide-react';

export function Navigation() {
  const tabs = ['Learn', 'Practice', 'Analytics', 'Profile'];
  
  return (
    <nav className="glass sticky top-0 z-50 shadow-lg">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-[#6A4CFF] to-[#B8A4FF] p-2 rounded-xl shadow-lg">
              <Sparkles className="size-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#6A4CFF] to-[#B8A4FF] bg-clip-text text-transparent">
                Drishti-Ed
              </h1>
              <p className="text-xs text-gray-500">Neuro-Adaptive Learning</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  tab === 'Learn'
                    ? 'bg-[#6A4CFF] text-white shadow-lg'
                    : 'text-gray-600 hover:text-[#6A4CFF] hover:bg-white/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#6A4CFF] to-[#B8A4FF] flex items-center justify-center shadow-lg">
              <User className="size-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
