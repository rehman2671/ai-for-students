/* Study Desk Editorial progress layer: local-first, minimal data, no identity or answer text stored. */
export type GameId = "prompt-detective" | "fact-check-quest" | "ai-safety-lab";

export type GameProgress = { attempts: number; completions: number; bestScore: number; lastScore: number; lastPlayed: string | null };
export type LearningProgress = Record<GameId, GameProgress>;

const KEY = "ai-students-learning-progress";
const empty = (): LearningProgress => ({
  "prompt-detective": { attempts: 0, completions: 0, bestScore: 0, lastScore: 0, lastPlayed: null },
  "fact-check-quest": { attempts: 0, completions: 0, bestScore: 0, lastScore: 0, lastPlayed: null },
  "ai-safety-lab": { attempts: 0, completions: 0, bestScore: 0, lastScore: 0, lastPlayed: null },
});

export function getLearningProgress(): LearningProgress {
  if (typeof window === "undefined") return empty();
  try { return { ...empty(), ...JSON.parse(window.localStorage.getItem(KEY) || "{}") }; } catch { return empty(); }
}

export function startGame(gameId: GameId) {
  const progress = getLearningProgress();
  progress[gameId].attempts += 1;
  progress[gameId].lastPlayed = new Date().toISOString();
  window.localStorage.setItem(KEY, JSON.stringify(progress));
}

export function completeGame(gameId: GameId, score: number) {
  const progress = getLearningProgress();
  progress[gameId].completions += 1;
  progress[gameId].lastScore = score;
  progress[gameId].bestScore = Math.max(progress[gameId].bestScore, score);
  progress[gameId].lastPlayed = new Date().toISOString();
  window.localStorage.setItem(KEY, JSON.stringify(progress));
}

export function resetLearningProgress() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}
