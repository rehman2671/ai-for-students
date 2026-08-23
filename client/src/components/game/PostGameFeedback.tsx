/* Study Desk Editorial testing card: anonymous difficulty feedback for real learner validation. */
import { useState } from "react";
import { Check } from "lucide-react";
import { trackLearningEvent } from "@/lib/analytics";
import { GameId } from "@/lib/learningProgress";

export default function PostGameFeedback({ game }: { game: GameId }) {
  const [sent, setSent] = useState(false);
  const submit = (difficulty: "too-easy" | "about-right" | "too-hard") => { trackLearningEvent("learning_feedback", { game, difficulty }); setSent(true); };
  return <div className="post-game-feedback">{sent ? <span className="feedback-thanks"><Check size={14} /> Thanks—your note helps tune the next lesson.</span> : <><span>How did the difficulty feel?</span><div className="feedback-choices"><button onClick={() => submit("too-easy")}>Too easy</button><button onClick={() => submit("about-right")}>About right</button><button onClick={() => submit("too-hard")}>Too hard</button></div></>}</div>;
}
