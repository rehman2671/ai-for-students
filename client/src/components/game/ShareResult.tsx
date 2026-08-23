import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { trackLearningEvent } from "@/lib/analytics";

const labels: Record<string, string> = { "prompt-detective": "Prompt Detective", "fact-check-quest": "Fact Check Quest", "ai-safety-lab": "AI Safety Lab", "prompt-workshop": "Prompt Workshop", "source-hunt": "Source Hunt" };

export default function ShareResult({ game, score, total }: { game: string; score: number; total: number }) {
  const [copied, setCopied] = useState(false);
  const label = labels[game] || "AI for Students";
  const shareUrl = typeof window === "undefined" ? "https://aiforstudents.example" : `${window.location.origin}/certificate?game=${encodeURIComponent(game)}&score=${score}&total=${total}`;
  const text = `I completed ${label} on AI for Students: ${score}/${total}. Learn AI, keep the thinking.`;
  const copy = async () => { await navigator.clipboard?.writeText(`${text} ${shareUrl}`); setCopied(true); trackLearningEvent("learning_result_share", { game, channel: "copy" }); setTimeout(() => setCopied(false), 1800); };
  const nativeShare = async () => { if (!navigator.share) return copy(); await navigator.share({ title: `${label} result`, text, url: shareUrl }); trackLearningEvent("learning_result_share", { game, channel: "native" }); };
  const encoded = encodeURIComponent(`${text} ${shareUrl}`);
  return <div className="result-share"><div><strong>Share the learning</strong><span>Your score only—no answers or personal data are included.</span></div><div className="result-share-actions"><button className="game-button game-button--primary" onClick={nativeShare}>{copied ? <Check size={15} /> : <Share2 size={15} />} {copied ? "Copied" : "Share result"}</button><button className="share-icon-button" onClick={copy} aria-label="Copy result link"><Copy size={15} /></button><a className="share-icon-button" href={`https://wa.me/?text=${encoded}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp">WA</a><a className="share-icon-button" href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" aria-label="Share on Telegram">TG</a><a className="share-icon-button" href={`https://twitter.com/intent/tweet?text=${encoded}`} target="_blank" rel="noreferrer" aria-label="Share on X">X</a></div></div>;
}
