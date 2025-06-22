import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';
import CardGenerator from './components/CardGenerator';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function App() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleCardGenerated = (imageUrl: string) => {
    setGeneratedImageUrl(imageUrl);
  };

  const shareOnX = () => {
    const text = "Check out my awesome League of Legends Summoner Card! ⚔️ #LeagueOfLegends #SummonerCard";
    const url = window.location.href;
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(xUrl, '_blank');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = {
    background: isDarkMode
      ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800'
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100',
    pattern: isDarkMode ? 'opacity-20' : 'opacity-10',
    cardBg: isDarkMode
      ? 'bg-white/5 backdrop-blur-xl border-white/10 ring-1 ring-white/10'
      : 'bg-white/90 border-amber-400/40',
    text: {
      primary: isDarkMode ? 'text-amber-400' : 'text-amber-600',
      secondary: isDarkMode ? 'text-slate-300' : 'text-slate-600',
      accent: isDarkMode ? 'text-blue-300' : 'text-blue-600'
    },
    button: {
      secondary: isDarkMode
        ? 'from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700'
        : 'from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800'
    },
    cardPlaceholder: isDarkMode
      ? 'bg-white/5 backdrop-blur-lg border-white/10 ring-1 ring-white/5'
      : 'from-slate-200/50 to-blue-200/50 border-amber-400/30'
  };

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-500`}>
      <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23D4AF37%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] ${themeClasses.pattern}`}></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-slate-800/50 text-amber-400 hover:bg-slate-700/50' : 'bg-white/50 text-amber-600 hover:bg-white/70'}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        <main className="max-w-2xl mx-auto pt-10 md:pt-0">
          <div className={`${themeClasses.cardBg} rounded-[2rem] p-8 shadow-xl border border-white/10 transition-all duration-500 ring-1 ring-white/10`}>
            <div className="relative mb-4 flex justify-center">
              <div className={`inline-block ${themeClasses.cardPlaceholder} rounded-[2rem] p-3 shadow-md transition-all duration-500`}>
                {!generatedImageUrl ? (
                  <div className="text-center p-8 flex items-center justify-center flex-col animate-fade-in">
                    <img src="/assets/logo2.png" className=" md:size-80 mb-4" alt="Placeholder Icon" />
                    <p className={`${themeClasses.text.primary} text-lg font-bold`}>Your random Summoner Card awaits!</p>
                    <p className={`${themeClasses.text.secondary} text-sm mt-2`}>Enter your Summoner Name and forge your random card</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4 animate-fade-in">
                    <img
                      src={generatedImageUrl}
                      alt="Generated Summoner Card"
                      className="max-w-full max-h-full object-contain rounded-xl"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <CardGenerator
                onCardGenerated={handleCardGenerated}
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                isDarkMode={isDarkMode}
              />

              {generatedImageUrl && (
                <div className="flex gap-4 animate-fade-in">
                  <button
                    onClick={shareOnX}
                    className={`flex-[4] bg-gradient-to-r ${themeClasses.button.secondary} text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 text-lg border border-slate-600/30 shadow-lg`}
                  >
                    <XLogo className="w-5 h-5" />
                    Share on X
                  </button>

                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImageUrl;
                      link.download = 'summoner_card.png';
                      link.click();
                    }}
                    className={`flex-[1] bg-gradient-to-r ${themeClasses.button.secondary} text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-2 text-lg border border-slate-600/30 shadow-lg`}
                    aria-label="Download card"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="text-center mt-16 animate-fade-in">
          <p className={`text-sm ${themeClasses.text.secondary} font-medium`}>
            From Demacia to GitHub — built by <a href='https://github.com/MonforteGG' target='_blank' className='underline hover:text-amber-500'>MonforteGG</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
