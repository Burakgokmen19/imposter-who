import React, { useState, useEffect } from 'react';
import { Player } from '../types';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface VotePhaseProps {
  players: Player[];
  word: string;
  onRestart: () => void;
}

const VotePhase: React.FC<VotePhaseProps> = ({ players, word, onRestart }) => {
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 5); // 5 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const imposter = players.find(p => p.isImposter);

  useEffect(() => {
    // Explicitly using 'any' or 'number' to avoid NodeJS vs Browser type conflicts in build
    let interval: any;
    if (isTimerRunning && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, showResult]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleShowResult = () => {
    setShowResult(true);
    setIsTimerRunning(false);
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-fadeIn text-center">
        <div className="mb-8">
            <span className="text-6xl block mb-4">🕵️‍♂️</span>
            <h2 className="text-2xl text-slate-400 mb-2">Casus Şuydu:</h2>
            <h1 className="text-5xl font-black text-red-500 mb-6">{imposter?.name}</h1>
            
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <p className="text-slate-400 text-sm uppercase mb-1">Gizli Kelime</p>
                <p className="text-3xl font-bold text-white">{word}</p>
            </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Yeni Oyun
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6 max-w-md mx-auto">
      {/* Timer Section */}
      <div className="flex flex-col items-center mb-10 mt-4">
        <div className={`text-6xl font-mono font-bold mb-2 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="flex gap-4">
            <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-sm px-4 py-1 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
            >
                {isTimerRunning ? 'Duraklat' : 'Devam Et'}
            </button>
        </div>
      </div>

      {/* Players Grid for visual reference */}
      <div className="grid grid-cols-2 gap-3 mb-auto">
        {players.map(p => (
           <div key={p.id} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex items-center gap-2 opacity-75">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold">
                    ?
                </div>
                <span className="truncate text-slate-300">{p.name}</span>
           </div> 
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            <p className="text-sm text-yellow-200/80">
                Sorgulama başladı! Casusu bulmaya çalışın ama kelimeyi açık etmeyin.
            </p>
        </div>

        <button
            onClick={handleShowResult}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-900/20 transition-all active:scale-95"
        >
            Sonucu Göster
        </button>
      </div>
    </div>
  );
};

export default VotePhase;