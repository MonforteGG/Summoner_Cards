import React, { useState } from 'react';
import { Sparkles, Loader2, User } from 'lucide-react';
import { generateCardData, generateCardImage } from '../utils/cardGenerator';
import { CardData } from '../types/cardTypes';

interface CardGeneratorProps {
  onCardGenerated: (imageUrl: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
  isDarkMode: boolean;
}

const CardGenerator: React.FC<CardGeneratorProps> = ({
  onCardGenerated,
  isGenerating,
  setIsGenerating,
  isDarkMode
}) => {
  const [summonerName, setSummonerName] = useState('');
  const [cardData, setCardData] = useState<CardData | null>(null);

  const generateCard = async () => {
    if (!summonerName.trim()) {
      alert('Please enter your Summoner Name!');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Generate card data with user's summoner name
      const newCardData = generateCardData(summonerName.trim());
      setCardData(newCardData);
      
      // Simulate some processing time for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate the card image using actual assets
      const imageUrl = await generateCardImage(newCardData);
      onCardGenerated(imageUrl);
      
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Error generating card. Please make sure assets are properly loaded.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isGenerating) {
      generateCard();
    }
  };

  const themeClasses = {
    input: isDarkMode 
      ? 'bg-slate-800/50 border-amber-500/30 text-amber-100 placeholder-slate-400 focus:border-amber-400 focus:bg-slate-800/70' 
      : 'bg-white/50 border-amber-400/40 text-slate-800 placeholder-slate-500 focus:border-amber-500 focus:bg-white/70',
    button: {
      primary: isDarkMode 
        ? 'from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700' 
        : 'from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600'
    },
    icon: isDarkMode ? 'text-amber-400/60' : 'text-gray-800/60'
  };

  return (
    <div className="space-y-4">
      {/* Summoner Name Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <User className={`size-5 ${themeClasses.icon}`} />
        </div>
        <input
          type="text"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your Summoner Name"
          disabled={isGenerating}
          className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-base md:text-lg font-medium ${themeClasses.input} disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateCard}
        disabled={isGenerating || !summonerName.trim()}
        className={`w-full bg-gradient-to-r ${themeClasses.button.primary} text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg border border-amber-400/30 shadow-lg`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Forging Card...
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            Forge Card
          </>
        )}
      </button>
    </div>
  );
};

export default CardGenerator;