import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, BookOpen, Brain, Code2, Database, LockKeyhole, Palette, Scale, Search, SearchCheck, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import PromptDetective from "@/components/game/PromptDetective";
import FactCheckQuest from "@/components/game/FactCheckQuest";
import AISafetyLab from "@/components/game/AISafetyLab";
import InteractiveLab from "@/components/game/InteractiveLab";
import MoreAIGame, { moreGameCatalog } from "@/components/game/MoreAIGames";
import AuthControls from "@/components/AuthControls";
import { gameCatalog } from "@/data/gameCatalog";

const markImage = "/manus-storage/ai-students-mark_e5155fd0.png";
const iconMap = { "bias-buster": Brain, "ai-decoder": Sparkles, "data-detective": BarChart3, "creative-director": Palette, "code-coach": Code2, "decision-studio": Scale, "tool-match": Wrench } as const;
const coreGames = [
  { key: "prompt", label: "Prompt Detective", note: "Build better requests", icon: Sparkles, href: "/play" },
  { key: "fact", label: "Fact Check Quest", note: "Verify before you trust", icon: SearchCheck, href: "/play?game=fact" },
  { key: "safety", label: "AI Safety Lab", note: "Make the safer move", icon: LockKeyhole, href: "/play?game=safety" },
  { key: "workshop", label: "Prompt Workshop", note: "Build, don't guess", icon: Sparkles, href: "/play?game=workshop" },
  { key: "source-hunt", label: "Source Hunt", note: "Sequence the check", icon: Search, href: "/play?game=source-hunt" },
  ...moreGameCatalog.map((game) => ({ key: game.id, label: game.label, note: game.tagline, icon: iconMap[game.id as keyof typeof iconMap] || Brain, href: `/play?game=${game.id}` })),
];

export default function GamePage() {
  const gameParam = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("game") : null;
  const isFact = gameParam === "fact"; const isSafety = gameParam === "safety"; const isWorkshop = gameParam === "workshop"; const isSourceHunt = gameParam === "source-hunt";
  const extraGame = moreGameCatalog.find((item) => item.id === gameParam);
  const title = isSafety ? <>AI Safety<br /><em>Lab</em></> : isFact ? <>Fact<br /><em>Check Quest</em></> : isWorkshop ? <>Prompt<br /><em>Workshop</em></> : isSourceHunt ? <>Source<br /><em>Hunt</em></> : extraGame ? <>{extraGame.label.split(" ")[0]}<br /><em>{extraGame.label.split(" ").slice(1).join(" ")}</em></> : <>Prompt<br /><em>Detective</em></>;
  const description = isSafety ? "Pause before you share. Keep a human in the loop." : isFact ? "Follow the claim. Find the evidence. Keep your confidence calibrated." : isWorkshop ? "Assemble a useful AI brief by building the workflow block by block." : isSourceHunt ? "Sequence an evidence check before a claim travels." : extraGame ? extraGame.tagline : "Read the brief. Spot the stronger request. Keep the thinking.";
  const currentKey = isFact ? "fact" : isSafety ? "safety" : isWorkshop ? "workshop" : isSourceHunt ? "source-hunt" : extraGame?.id || "prompt";
  const [query, setQuery] = useState(""); const [difficulty, setDifficulty] = useState("all"); const [ageBand, setAgeBand] = useState("all");
  const filteredGames = useMemo(() => coreGames.filter((game) => { const meta = gameCatalog.find((item) => item.id === (game.key === "prompt" ? "prompt-detective" : game.key === "fact" ? "fact-check-quest" : game.key === "safety" ? "ai-safety-lab" : game.key === "workshop" ? "prompt-workshop" : game.key === "source-hunt" ? "source-hunt" : game.key)); return (!query || `${game.label} ${game.note} ${meta?.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())) && (difficulty === "all" || meta?.difficulty === difficulty) && (ageBand === "all" || meta?.ageBand === ageBand); }), [query, difficulty, ageBand]);
  return <div className="game-page"><header className="game-header"><a className="game-brand" href="/"><img src={markImage} alt="" /><span><strong>AI</strong> for <em>Students</em></span></a><a className="game-return" href="/"><ArrowLeft size={15} /> Back to the desk</a><AuthControls /></header><main className="game-main"><div className="game-intro"><div><div className="game-intro-top"><span className="game-kicker">LEARNING MATERIAL / PLAY TO LEARN</span></div><h1>{title}</h1></div><div><span className="game-resource"><BookOpen size={14} /> {isWorkshop || isSourceHunt ? "hands-on lab" : "AI field game"}</span><p>{description}</p></div></div><div className="game-filters" aria-label="Filter learning games"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search games or skills" aria-label="Search games or skills" /><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label="Filter by difficulty"><option value="all">All levels</option><option value="starter">Starter</option><option value="building">Building</option><option value="stretch">Stretch</option></select><select value={ageBand} onChange={(event) => setAgeBand(event.target.value)} aria-label="Filter by age band"><option value="all">All ages</option><option value="11-13">11–13</option><option value="14-17">14–17</option><option value="18+">18+</option></select></div><nav className="game-switcher" aria-label="Learning games">{filteredGames.map((game) => { const Icon = game.icon; return <a key={game.key} className={currentKey === game.key ? "is-current" : ""} href={game.href}><Icon size={15} /><span><strong>{game.label}</strong><small>{game.note}</small></span><ArrowRight size={14} /></a>; })}</nav><div className="game-board"><div className="game-board-tab">{extraGame ? extraGame.kicker : isSafety ? "FIELD GAME 03" : isFact ? "FIELD GAME 02" : isWorkshop ? "HANDS-ON LAB 04" : isSourceHunt ? "HANDS-ON LAB 05" : "FIELD GAME 01"} <span>✦</span></div>{(isFact || isSafety) && <img className="game-art-note" src={isSafety ? "/manus-storage/ai-safety-lab-note_1dffd5e2.png" : "/manus-storage/fact-check-quest-board_f72aa636.png"} alt="" />}{extraGame ? <MoreAIGame gameId={extraGame.id} /> : isSafety ? <AISafetyLab /> : isFact ? <FactCheckQuest /> : isWorkshop ? <InteractiveLab mode="workshop" /> : isSourceHunt ? <InteractiveLab mode="source-hunt" /> : <PromptDetective />}</div></main><footer className="game-page-footer"><span>AI for Students</span><span>Learn the tool. Keep the thinking.</span></footer></div>;
}
