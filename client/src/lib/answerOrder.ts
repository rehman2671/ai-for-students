export type AnswerChoice = { id: string };

/**
 * Keeps answer order stable for a learner while preventing the correct answer
 * from occupying a predictable visual position across a bank.
 */
export function orderChoices<T extends AnswerChoice>(choices: readonly T[], seed: string): T[] {
  if (choices.length < 2) return [...choices];
  const hash = seed.split("").reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 7);
  const offset = hash % choices.length;
  return choices.map((_, index) => choices[(index + offset) % choices.length]);
}

export function correctChoicePosition<T extends AnswerChoice & { correct?: boolean }>(choices: readonly T[], seed: string): number {
  return orderChoices(choices, seed).findIndex((choice) => choice.correct === true);
}
