import React, { useState } from 'react';
import { Player } from '../types';
import { Trash2, Plus, User, Play } from 'lucide-react';

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onStartGame: () => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ 
  players, 
  onAddPlayer, 
  onRemovePlayer, 
  onStartGame
}) => {
  const [newName, setNewName] = useState('');

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newName.trim()) {
      onAddPlayer(newName.trim());
      setNewName('');
    }
  };

  const isReady = players.length >= 3;

  return (
    <div className="flex flex-col h-full max-w-md mx-auto p-4 animate-fadeIn">
      <div className="text-center mb-8 pt-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 tracking-tight">
          CASUS KİM?
        </h1>
        <p className="text-slate-400 text-sm mt-2">En az 3 oyuncu ile oynanır</p>
      </div>

      {/* Player Input */}
      <form onSubmit={handleAdd} className="relative mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Oyuncu adı..."
          className="w-full bg-slate-800 border-2 border-slate-700 text-white placeholder-slate-500 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-lg"
        />
        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
        <button
          type="button"
          onClick={() => handleAdd()}
          disabled={!newName.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white p-2 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* Player List */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-1 custom-scrollbar">
        {players.length === 0 && (
          <div className="text-center text-slate-600 mt-10 italic">
            Henüz oyuncu eklenmedi.
          </div>
        )}
        {players.map((player) => (
          <div
            key={player.id}
            className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-2xl p-4 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-lg">{player.name}</span>
            </div>
            <button
              onClick={() => onRemovePlayer(player.id)}
              className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mt-auto pt-4">
        <button
          onClick={onStartGame}
          disabled={!isReady}
          className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-lg ${
            isReady
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-500/25'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          OYUNU BAŞLAT
        </button>
        
        {!isReady && (
          <p className="text-center text-red-400 text-sm animate-pulse">
            Başlamak için en az 3 oyuncu ekleyin
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerSetup;