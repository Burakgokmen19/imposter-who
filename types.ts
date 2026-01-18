export interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  hasSeenRole: boolean;
}

export enum GameStage {
  SETUP = 'SETUP',
  REVEAL = 'REVEAL',
  VOTE = 'VOTE',
  RESULT = 'RESULT'
}

export interface GameState {
  stage: GameStage;
  players: Player[];
  currentWord: string;
  currentHint: string;
  currentPlayerIndex: number;
  imposterCount: number;
  timeRemaining: number;
}
