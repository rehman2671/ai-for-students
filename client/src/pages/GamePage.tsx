/* Study Desk Editorial game page: focused learning surface with the same warm paper and ink navigation language. */
import { ArrowLeft, BookOpen } from "lucide-react";
import PromptDetective from "@/components/game/PromptDetective";

const markImage = "/manus-storage/ai-students-mark_e5155fd0.png";

export default function GamePage() {
  return <div className="game-page"><header className="game-header"><a className="game-brand" href="/"><img src={markImage} alt="" /><span><strong>AI</strong> for <em>Students</em></span></a><a className="game-return" href="/"><ArrowLeft size={15} /> Back to the desk</a></header><main className="game-main"><div className="game-intro"><div className="game-intro-top"><span className="game-kicker">LEARNING MATERIAL / PLAY TO LEARN</span><span className="game-resource"><BookOpen size={14} /> 5-minute lesson</span></div><h1>Prompt<br /><em>Detective</em></h1><p>Read the brief. Spot the stronger request. Keep the thinking.</p></div><div className="game-board"><div className="game-board-tab">FIELD GAME 01 <span>✦</span></div><PromptDetective /></div></main><footer className="game-page-footer"><span>AI for Students</span><span>Learn the tool. Keep the thinking.</span></footer></div>;
}
