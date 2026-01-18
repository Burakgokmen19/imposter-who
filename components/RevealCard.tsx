import React, { useState } from 'react';
import { Player } from '../types';
import { Fingerprint, EyeOff, Lightbulb } from 'lucide-react';

interface RevealCardProps {
  player: Player;
  word: string;
  hint: string;
  onConfirm: () => void;
  isLastPlayer: boolean;
}

const RevealCard: React.FC<RevealCardProps> = ({ player, word, hint, onConfirm, isLastPlayer }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasViewed, setHasViewed] = useState(false);

  // Handlers for both Touch and Mouse to ensure cross-device support
  const handleStart = (e: React.SyntheticEvent) => {
    setIsRevealed(true);
    setHasViewed(true);
  };

  const handleEnd = (e: React.SyntheticEvent) => {
    setIsRevealed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 animate-fadeIn max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-slate-400 text-lg uppercase tracking-wider mb-2">Sıradaki Oyuncu</h2>
        <h1 className="text-4xl font-bold text-white bg-slate-800 px-8 py-3 rounded-full inline-block border border-slate-700">
          {player.name}
        </h1>
      </div>

      <div className="relative w-full aspect-square max-w-xs mb-8">
        {/* The Card */}
        <button
          className={`w-full h-full rounded-3xl flex flex-col items-center justify-center transition-all duration-200 shadow-2xl no-select ${
            isRevealed
              ? 'bg-gradient-to-br from-emerald-600 to-teal-800 scale-105 shadow-emerald-900/50'
              : 'bg-slate-800 border-4 border-slate-700 hover:border-slate-600 active:scale-95'
          }`}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {isRevealed ? (
            <div className="animate-popIn text-center p-4">
              {player.isImposter ? (
                <>
                  <div className="text-6xl mb-2">🤫</div>
                  <h3 className="text-3xl font-black text-white mb-2">CASUSSUN!</h3>
                  <div className="mt-4 bg-black/20 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center gap-2 text-yellow-300 mb-1">
                        <Lightbulb className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">İpucu</span>
                    </div>
                    <p className="text-xl font-bold text-white/90">{hint}</p>
                  </div>
                </>
              ) : (
                <>
                   <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-medium text-emerald-200 mb-2">GİZLİ KELİME</h3>
                  <p className="text-3xl font-black text-white uppercase break-words leading-tight">{word}</p>
                </>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <Fingerprint className="w-24 h-24 mb-4 opacity-50" />
              <span className="font-bold text-lg uppercase tracking-widest">Basılı Tut</span>
              <span className="text-xs text-slate-500 mt-2">Görmek için ekrana dokun ve tut</span>
            </div>
          )}
        </button>
      </div>

      {/* Confirmation Button - Only appears after viewing */}
      <div className={`transition-all duration-500 w-full ${hasViewed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <button
          onClick={onConfirm}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
        >
          {isLastPlayer ? 'Oyunu Başlat' : 'Sırayı Devret'}
          <EyeOff className="w-5 h-5" />
        </button>
        <p className="text-center text-slate-500 text-xs mt-3">
          Sırayı devretmeden önce ekranı gizlediğinden emin ol.
        </p>
      </div>
    </div>
  );
};

export default RevealCard;
