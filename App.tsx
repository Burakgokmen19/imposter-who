import { useState } from 'react';
import { Player, GameStage, GameState } from './types';
import { CATEGORIZED_WORDS } from './constants';
import PlayerSetup from './components/PlayerSetup';
import RevealCard from './components/RevealCard';
import VotePhase from './components/VotePhase';

function App() {
  const [game, setGame] = useState<GameState>({
    stage: GameStage.SETUP,
    players: [],
    currentWord: '',
    currentHint: '',
    currentPlayerIndex: 0,
    imposterCount: 1,
    timeRemaining: 300,
  });
  
  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString() + Math.random().toString(),
      name,
      isImposter: false,
      hasSeenRole: false,
    };
    setGame((prev) => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));
  };

  const removePlayer = (id: string) => {
    setGame((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));
  };

  const startGame = () => {
    if (game.players.length < 3) return;

    // Select random word from local list
    const randomCategoryIndex = Math.floor(Math.random() * CATEGORIZED_WORDS.length);
    const categoryGroup = CATEGORIZED_WORDS[randomCategoryIndex];
    const randomWordIndex = Math.floor(Math.random() * categoryGroup.words.length);
    
    const selectedWord = categoryGroup.words[randomWordIndex];
    const selectedHint = categoryGroup.category;

    // Assign roles
    const playerCount = game.players.length;
    const imposterIndex = Math.floor(Math.random() * playerCount);
    
    const newPlayers = game.players.map((p, i) => ({
      ...p,
      isImposter: i === imposterIndex,
      hasSeenRole: false,
    }));

    setGame({
      stage: GameStage.REVEAL,
      players: newPlayers,
      currentWord: selectedWord,
      currentHint: selectedHint,
      currentPlayerIndex: 0,
      imposterCount: 1,
      timeRemaining: 300,
    });
  };

  const nextTurn = () => {
    const nextIndex = game.currentPlayerIndex + 1;
    if (nextIndex >= game.players.length) {
      setGame((prev) => ({ ...prev, stage: GameStage.VOTE }));
    } else {
      setGame((prev) => ({ ...prev, currentPlayerIndex: nextIndex }));
    }
  };

  const restartGame = () => {
    // Keep players, reset game state
    setGame((prev) => ({
      ...prev,
      stage: GameStage.SETUP,
      currentPlayerIndex: 0,
    }));
  };

  return (
    <div className="h-full w-full bg-slate-900 text-white font-sans selection:bg-emerald-500 selection:text-white">
      {game.stage === GameStage.SETUP && (
        <PlayerSetup
          players={game.players}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onStartGame={startGame}
        />
      )}

      {game.stage === GameStage.REVEAL && (
        <RevealCard
          player={game.players[game.currentPlayerIndex]}
          word={game.currentWord}
          hint={game.currentHint}
          onConfirm={nextTurn}
          isLastPlayer={game.currentPlayerIndex === game.players.length - 1}
        />
      )}

      {game.stage === GameStage.VOTE && (
        <VotePhase
          players={game.players}
          word={game.currentWord}
          onRestart={restartGame}
        />
      )}
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black"></div>
    </div>
  );
}

export default App;