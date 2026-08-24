export type AnswerChoice = { id: string };

/** Create a fresh seed for each new play round without exposing learner data. */
export function createRoundSeed(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random()}`;
}

function seedToNumber(seed: string): number {
  return seed.split("").reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 2166136261);
}

function nextRandom(state: number): [number, number] {
  let value = state || 1;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  value >>>= 0;
  return [value, value / 0x100000000];
}

/**
 * Fisher–Yates shuffle using a round seed and question identity. The same
 * question stays stable during a round, while a fresh round seed changes the
 * sequence; there is no fixed A/B/C rotation pattern to learn.
 */
export function orderChoices<T extends AnswerChoice>(choices: readonly T[], roundSeed: string, questionId = ""): T[] {
  const ordered = [...choices];
  let state = seedToNumber(`${roundSeed}:${questionId}`);
  for (let index = ordered.length - 1; index > 0; index -= 1) {
    let randomValue: number;
    [state, randomValue] = nextRandom(state);
    const swapIndex = Math.floor(randomValue * (index + 1));
    [ordered[index], ordered[swapIndex]] = [ordered[swapIndex], ordered[index]];
  }
  return ordered;
}

export function correctChoicePosition<T extends AnswerChoice & { correct?: boolean }>(choices: readonly T[], roundSeed: string, questionId = ""): number {
  return orderChoices(choices, roundSeed, questionId).findIndex((choice) => choice.correct === true);
}

