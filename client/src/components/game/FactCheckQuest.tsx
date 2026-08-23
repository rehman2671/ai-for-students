/* Study Desk Editorial game: evidence cards, source quality signals, calm feedback and practical verification habits. */
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw, SearchCheck, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { completeGame, startGame } from "@/lib/learningProgress";
import { trackLearningEvent } from "@/lib/analytics";
import PostGameFeedback from "@/components/game/PostGameFeedback";

type FactQuestion = { claim: string; context: string; choices: { id: string; text: string; correct: boolean; explanation: string }[] };

const factQuestions: FactQuestion[] = [
  { claim: "“AI always gives better answers when you write a longer prompt.”", context: "You see this sentence in a social media post. What is your best next move?", choices: [
    { id: "a", text: "Share it because it sounds like useful advice.", correct: false, explanation: "The claim is too absolute. Prompt quality depends on the task and relevant context, not simply length." },
    { id: "b", text: "Ask what evidence supports ‘always’, then test the advice on a few different tasks.", correct: true, explanation: "Strong fact-checking questions absolute language and checks whether a claim holds across examples." },
    { id: "c", text: "Ask another chatbot if the post is true and trust its yes/no answer.", correct: false, explanation: "A second AI opinion is not independent evidence. You need observable tests or reliable sources." },
  ]},
  { claim: "A search result’s first link is the most reliable source.", context: "You need one fact for a class note. Which approach is strongest?", choices: [
    { id: "a", text: "Use the first result and do not spend time comparing it.", correct: false, explanation: "Search ranking is not the same as authority. The first result may be commercial, outdated or unsourced." },
    { id: "b", text: "Compare a primary source or institution with at least one independent reliable source.", correct: true, explanation: "Source quality and agreement matter. Triangulation helps you catch missing context and errors." },
    { id: "c", text: "Pick the page with the most confident headline.", correct: false, explanation: "Confident wording is not evidence of accuracy. Inspect who published the claim and what supports it." },
  ]},
  { claim: "“This graph proves that the new policy caused the change.”", context: "A chart shows two trends rising at the same time. What should you notice?", choices: [
    { id: "a", text: "A rising line proves that one caused the other.", correct: false, explanation: "Two trends can move together without one causing the other. Other explanations and time windows matter." },
    { id: "b", text: "Check the axes, time period, sample, missing data and whether the source supports a causal conclusion.", correct: true, explanation: "Reading a graph critically means checking how it was made before accepting its interpretation." },
    { id: "c", text: "Ignore the graph because charts are always biased.", correct: false, explanation: "A chart needs scrutiny, not automatic rejection. Its method and source determine how useful it is." },
  ]},
  { claim: "An AI-generated citation is safe to use if it has a realistic title.", context: "AI suggests a paper for your research. What is the responsible action?", choices: [
    { id: "a", text: "Copy it into the bibliography because the title looks academic.", correct: false, explanation: "AI can invent realistic-looking citations. A title alone does not prove that the source exists." },
    { id: "b", text: "Locate the original paper through a library or publisher, then check author, date and claim.", correct: true, explanation: "Verification means finding the original record and checking that it actually supports what you plan to say." },
    { id: "c", text: "Ask the AI to add a DOI so the citation looks complete.", correct: false, explanation: "Adding more details does not verify them. Every citation field must be checked against an original record." },
  ]},
];

const STORAGE_KEY = "ai-students-fact-check-best";

export default function FactCheckQuest() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [best, setBest] = useState(() => Number(typeof window === "undefined" ? 0 : window.localStorage.getItem(STORAGE_KEY) || 0));
  useEffect(() => { if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demo")) { setStarted(true); startGame("fact-check-quest"); } }, []);
  const start = () => { setStarted(true); setIndex(0); setScore(0); setSelected(null); startGame("fact-check-quest"); trackLearningEvent("learning_game_start", { game: "fact-check-quest" }); };
  const current = factQuestions[index];
  const choose = (id: string) => { if (selected) return; setSelected(id); const choice = current.choices.find((item) => item.id === id); trackLearningEvent("learning_game_answer", { game: "fact-check-quest", question: index + 1, correct: Boolean(choice?.correct) }); if (current.choices.find((choice) => choice.id === id)?.correct) { setScore((value) => value + 1); toast.success("Good investigation. Read the evidence note."); } };
  const next = () => { if (!selected) return; if (index === factQuestions.length - 1) { const finalScore = score; completeGame("fact-check-quest", finalScore); trackLearningEvent("learning_game_complete", { game: "fact-check-quest", score: finalScore, total: factQuestions.length }); if (finalScore > best) { setBest(finalScore); window.localStorage.setItem(STORAGE_KEY, String(finalScore)); } setIndex(factQuestions.length); return; } setIndex((value) => value + 1); setSelected(null); };
  const restart = () => { trackLearningEvent("learning_game_exit", { game: "fact-check-quest", question: index + 1 }); setStarted(false); setIndex(0); setScore(0); setSelected(null); };
  if (!started) return <div className="game-picker"><button className="game-back game-hub-back" onClick={() => { window.location.href = "/play" }}><ArrowLeft size={15} /> Learning games</button><div className="game-picker-heading"><span className="game-kicker">FACT CHECK QUEST / FIELD GAME 02</span><h2>Follow the<br /><em>evidence trail.</em></h2><p>Four quick cases that turn “sounds true” into a better verification habit.</p></div><div className="fact-preview"><span className="fact-preview-icon"><SearchCheck size={24} /></span><div><strong>What you will practice</strong><p>Question absolute claims, inspect source quality and verify original evidence.</p></div></div><button className="game-button game-button--primary fact-start" onClick={start}>Open the first case <ArrowRight size={16} /></button>{best > 0 && <div className="best-score"><Sparkles size={15} /> Best evidence score: <strong>{best}/{factQuestions.length}</strong></div>}</div>;
  if (index >= factQuestions.length) return <div className="game-result"><div className="result-mark badge-burst"><SearchCheck size={26} /></div><span className="game-kicker">EVIDENCE TRAIL COMPLETE</span><h2>{score}<small> / {factQuestions.length}</small></h2><p className="result-message">{score >= 3 ? "You are asking the questions that make information safer to use." : "The habit grows with practice: pause, inspect, verify."}</p><div className="result-note"><strong>Your next move</strong><span>Before sharing an AI answer, find the original source and write down what you checked.</span></div><PostGameFeedback game="fact-check-quest" /><div className="game-result-actions"><button className="game-button game-button--primary" onClick={() => { setIndex(0); setScore(0); setSelected(null); }}><RotateCcw size={16} /> Play again</button><button className="game-button game-button--quiet" onClick={restart}>Choose another game</button><a className="game-button game-button--quiet" href={`/certificate?game=fact-check-quest&score=${score}&total=${factQuestions.length}`}>Share certificate <ArrowRight size={15} /></a></div></div>;
  const chosen = current.choices.find((choice) => choice.id === selected);
  return <div className="game-play"><div className="game-progress-row"><span>CASE {String(index + 1).padStart(2, "0")} / 04</span><span>{score} verified</span></div><div className="game-progress"><span style={{ width: `${((index + (selected ? 1 : 0)) / factQuestions.length) * 100}%` }} /></div><div className="fact-claim"><span className="game-kicker">EVIDENCE CARD / CHECK THE CLAIM</span><blockquote>{current.claim}</blockquote><p>{current.context}</p></div><div className="answer-list">{current.choices.map((choice, choiceIndex) => <button key={choice.id} className={`answer-card ${selected === choice.id ? "is-selected" : ""} ${selected && choice.correct ? "is-correct" : ""} ${selected === choice.id && !choice.correct ? "is-wrong" : ""}`} disabled={Boolean(selected)} onClick={() => choose(choice.id)}><span className="answer-letter">{String.fromCharCode(65 + choiceIndex)}</span><span>{choice.text}</span>{selected && choice.correct && <Check className="answer-status" size={17} />}{selected === choice.id && !choice.correct && <X className="answer-status" size={17} />}</button>)}</div>{selected && <div className={`game-feedback ${chosen?.correct ? "game-feedback--good" : "game-feedback--learn"}`}><div className="feedback-icon">{chosen?.correct ? <Check size={17} /> : <Sparkles size={17} />}</div><div><strong>{chosen?.correct ? "The evidence trail checks out." : "Pause and inspect the source."}</strong><p>{chosen?.explanation}</p></div></div>}<div className="game-footer-actions"><a className="game-back" href="/play"><ArrowLeft size={15} /> Prompt Detective</a><button className="game-button game-button--primary" onClick={next} disabled={!selected}>{index === factQuestions.length - 1 ? "See your result" : "Next case"} <ArrowRight size={16} /></button></div></div>;
}
