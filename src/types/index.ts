export interface User {
  uid: string;
  displayName: string;
  avatarId: string;
  createdAt: Date;
  stats: {
    highScore_marathon: number;
    highScore_blitz: number;
    totalLinesCleared: number;
    gamesPlayed: number;
  };
}

export interface LeaderboardScore {
  uid: string;
  displayName: string;
  score: number;
  recordedAt: Date;
  avatarId: string;
}

export interface GhostData {
  uid: string;
  mode: 'marathon' | 'blitz';
  score: number;
  replayData: string; // JSON string of operations
}
