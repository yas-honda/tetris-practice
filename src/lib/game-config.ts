// This file mocks fetching configuration from Firebase Remote Config.
// In a real application, you would use the Firebase SDK to get these values.

interface GameConfig {
  score_multiplier_tetris: number;
  level_up_speed: number;
  event_banner_url: string | null;
}

const defaultConfig: GameConfig = {
  score_multiplier_tetris: 1.5,
  level_up_speed: 10, // lines per level
  event_banner_url: null, // "https://example.com/event_banner.png"
};

// In a real app, this would be an async function that fetches from Remote Config
export function getGameConfig(): GameConfig {
  // Here you would activate and get values from Firebase Remote Config.
  // For now, we just return the default values.
  return defaultConfig;
}
