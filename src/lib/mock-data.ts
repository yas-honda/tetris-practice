import type { User, LeaderboardScore } from '@/types';

export const mockUsers: User[] = [
  {
    uid: 'user1',
    displayName: 'CyberRunner',
    avatarId: 'avatar_1',
    createdAt: new Date(),
    stats: {
      highScore_marathon: 150000,
      highScore_blitz: 85000,
      totalLinesCleared: 1200,
      gamesPlayed: 50,
    },
  },
  {
    uid: 'user2',
    displayName: 'NeonNinja',
    avatarId: 'avatar_2',
    createdAt: new Date(),
    stats: {
      highScore_marathon: 120000,
      highScore_blitz: 95000,
      totalLinesCleared: 950,
      gamesPlayed: 42,
    },
  },
  {
    uid: 'anonymous1',
    displayName: 'Guest_734',
    avatarId: 'anonymous',
    createdAt: new Date(),
    stats: {
      highScore_marathon: 25000,
      highScore_blitz: 15000,
      totalLinesCleared: 100,
      gamesPlayed: 10,
    },
  }
];

export const mockLeaderboard_marathon: LeaderboardScore[] = [
  { uid: 'user_alpha', displayName: 'SynthwaveSavvy', score: 250000, recordedAt: new Date(), avatarId: 'avatar_3' },
  { uid: 'user_beta', displayName: 'GridGlider', score: 225000, recordedAt: new Date(), avatarId: 'avatar_4' },
  { uid: 'user_gamma', displayName: 'DataDuchess', score: 210000, recordedAt: new Date(), avatarId: 'avatar_1' },
  { uid: 'user1', displayName: 'CyberRunner', score: 150000, recordedAt: new Date(), avatarId: 'avatar_1' },
  { uid: 'user2', displayName: 'NeonNinja', score: 120000, recordedAt: new Date(), avatarId: 'avatar_2' },
  { uid: 'user_delta', displayName: 'ByteBard', score: 115000, recordedAt: new Date(), avatarId: 'avatar_3' },
  { uid: 'user_epsilon', displayName: 'CircuitSorcerer', score: 105000, recordedAt: new Date(), avatarId: 'avatar_4' },
  { uid: 'user_zeta', displayName: 'VectorVixen', score: 98000, recordedAt: new Date(), avatarId: 'avatar_2' },
  { uid: 'user_eta', displayName: 'PixelProwler', score: 95000, recordedAt: new Date(), avatarId: 'avatar_1' },
  { uid: 'user_theta', displayName: 'KernelKnight', score: 92000, recordedAt: new Date(), avatarId: 'avatar_3' },
].sort((a, b) => b.score - a.score);

export const mockLeaderboard_blitz: LeaderboardScore[] = [
  { uid: 'user_omega', displayName: 'FlashPhantom', score: 125000, recordedAt: new Date(), avatarId: 'avatar_4' },
  { uid: 'user2', displayName: 'NeonNinja', score: 95000, recordedAt: new Date(), avatarId: 'avatar_2' },
  { uid: 'user1', displayName: 'CyberRunner', score: 85000, recordedAt: new Date(), avatarId: 'avatar_1' },
  { uid: 'user_sigma', displayName: 'RapidReplicator', score: 82000, recordedAt: new Date(), avatarId: 'avatar_3' },
  { uid: 'user_tau', displayName: 'TempoTrixter', score: 79000, recordedAt: new Date(), avatarId: 'avatar_1' },
  { uid: 'user_upsilon', displayName: 'QuickQubit', score: 75000, recordedAt: new Date(), avatarId: 'avatar_2' },
  { uid: 'user_phi', displayName: 'HertzHero', score: 72000, recordedAt: new Date(), avatarId: 'avatar_4' },
  { uid: 'user_chi', displayName: 'ImpulseInnovator', score: 68000, recordedAt: new Date(), avatarId: 'avatar_1' },
  { uid: 'user_psi', displayName: 'LaglessLegend', score: 65000, recordedAt: new Date(), avatarId: 'avatar_3' },
  { uid: 'user_pi', displayName: 'FlowstateFiend', score: 61000, recordedAt: new Date(), avatarId: 'avatar_2' },
].sort((a, b) => b.score - a.score);
