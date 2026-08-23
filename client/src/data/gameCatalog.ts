import { GameId } from "@/lib/learningProgress";
import { Difficulty, AgeBand } from "./contentSchema";

export type GameCatalogItem = { id: GameId; label: string; note: string; difficulty: Difficulty; ageBand: AgeBand; skills: string[] };

export const gameCatalog: GameCatalogItem[] = [
  { id: "prompt-detective", label: "Prompt Detective", note: "Build better requests", difficulty: "starter", ageBand: "11-13", skills: ["prompting", "study"] },
  { id: "fact-check-quest", label: "Fact Check Quest", note: "Verify before you trust", difficulty: "building", ageBand: "14-17", skills: ["evidence", "research"] },
  { id: "ai-safety-lab", label: "AI Safety Lab", note: "Make the safer move", difficulty: "starter", ageBand: "11-13", skills: ["safety", "ethics"] },
  { id: "prompt-workshop", label: "Prompt Workshop", note: "Build, don't guess", difficulty: "building", ageBand: "14-17", skills: ["prompting", "writing"] },
  { id: "source-hunt", label: "Source Hunt", note: "Sequence the check", difficulty: "building", ageBand: "18+", skills: ["evidence", "research"] },
  { id: "bias-buster", label: "Bias Buster", note: "Notice hidden assumptions", difficulty: "stretch", ageBand: "18+", skills: ["bias", "ethics"] },
  { id: "ai-decoder", label: "AI Decoder", note: "Translate the machine", difficulty: "starter", ageBand: "11-13", skills: ["fundamentals", "prompting"] },
  { id: "data-detective", label: "Data Detective", note: "Read the number", difficulty: "building", ageBand: "14-17", skills: ["data", "evidence"] },
  { id: "creative-director", label: "Creative Director", note: "Shape the brief", difficulty: "starter", ageBand: "11-13", skills: ["creativity", "prompting"] },
  { id: "code-coach", label: "Code Coach", note: "Review with care", difficulty: "stretch", ageBand: "18+", skills: ["coding", "security"] },
  { id: "decision-studio", label: "Decision Studio", note: "Keep humans deciding", difficulty: "stretch", ageBand: "18+", skills: ["judgment", "safety"] },
  { id: "tool-match", label: "Tool Matchmaker", note: "Choose the right fit", difficulty: "building", ageBand: "14-17", skills: ["tools", "workflow"] },
];
