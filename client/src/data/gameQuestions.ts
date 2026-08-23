/* Study Desk Editorial game data: fixed, reviewed scenarios teach prompt clarity, context and verification. */
export type GameLesson = "clarity" | "context" | "verify";

export type GameQuestion = {
  id: string;
  lesson: GameLesson;
  concept: string;
  scenario: string;
  choices: { id: string; text: string; correct: boolean; explanation: string }[];
};

export const lessons: { id: GameLesson; label: string; description: string }[] = [
  { id: "clarity", label: "Clear goals", description: "Spot the prompt that knows what it wants." },
  { id: "context", label: "Useful context", description: "Give AI enough information to be helpful." },
  { id: "verify", label: "Verify the answer", description: "Build checking into the workflow." },
];

export const questions: GameQuestion[] = [
  { id: "q1", lesson: "clarity", concept: "A clear goal", scenario: "You want to understand photosynthesis. Which prompt gives you the best starting point?", choices: [
    { id: "a", text: "Tell me everything about photosynthesis.", correct: false, explanation: "It names a topic, but not the learner, depth or format. The result could be too broad to study." },
    { id: "b", text: "Explain photosynthesis for a beginner in 150 words, then give me one everyday analogy and three check-your-understanding questions.", correct: true, explanation: "This prompt sets a goal, audience, length and useful practice. It turns a broad topic into a clear learning task." },
    { id: "c", text: "Photosynthesis answer please.", correct: false, explanation: "It is too vague. A useful prompt tells the tool what kind of answer would help you learn." },
  ]},
  { id: "q2", lesson: "clarity", concept: "An output format", scenario: "You have messy lecture notes and want to revise them. Which instruction is most useful?", choices: [
    { id: "a", text: "Make my notes better.", correct: false, explanation: "‘Better’ is not a measurable output. The tool does not know whether you want a summary, questions or a plan." },
    { id: "b", text: "Do whatever you think is best with these notes.", correct: false, explanation: "Giving away the decision makes the result unpredictable and may hide gaps in your own understanding." },
    { id: "c", text: "Organize these notes into five key ideas, a glossary of difficult terms and six active-recall questions. Keep all claims tied to my notes.", correct: true, explanation: "It specifies the structure and protects the boundary of the source material, making the output easier to check." },
  ]},
  { id: "q3", lesson: "context", concept: "Relevant context", scenario: "You want feedback on a short essay. What should you include with your request?", choices: [
    { id: "a", text: "Paste the essay and ask the tool to rewrite it perfectly.", correct: false, explanation: "A full rewrite can hide your voice and does not teach you what to improve." },
    { id: "b", text: "Share the assignment goal, audience, marking criteria and what kind of feedback you want—then ask for questions before suggested edits.", correct: true, explanation: "Relevant context helps the tool give targeted feedback while keeping you in control of the writing." },
    { id: "c", text: "Ask: ‘Is this good?’ and paste only the introduction.", correct: false, explanation: "The question and context are too limited to produce useful, specific feedback." },
  ]},
  { id: "q4", lesson: "context", concept: "Useful constraints", scenario: "You need a presentation outline for a five-minute class talk. Which prompt is strongest?", choices: [
    { id: "a", text: "Make a presentation about climate change.", correct: false, explanation: "The topic is too broad and does not describe the audience, length or desired structure." },
    { id: "b", text: "Give me a presentation that gets a high grade.", correct: false, explanation: "A grade is an outcome, not enough context for a useful outline." },
    { id: "c", text: "Create a five-minute outline for first-year students: one hook, three evidence-based points, one counterpoint and a 30-second conclusion.", correct: true, explanation: "The audience, time limit and structure are clear constraints that make the result usable." },
  ]},
  { id: "q5", lesson: "verify", concept: "Build in checking", scenario: "AI gives you three facts for a research note. What is the responsible next step?", choices: [
    { id: "a", text: "Copy the facts because the answer sounds confident.", correct: false, explanation: "Confidence is not evidence. AI can produce plausible but incorrect information." },
    { id: "b", text: "Ask the same tool to promise that every fact is correct.", correct: false, explanation: "A second confident response is not independent verification." },
    { id: "c", text: "Ask for source leads, check each claim against reliable original sources and record what you verified.", correct: true, explanation: "Verification is part of the workflow. Source leads can help, but you still need to inspect the evidence yourself." },
  ]},
  { id: "q6", lesson: "verify", concept: "Keep your thinking", scenario: "You are stuck on a homework problem. Which request supports learning best?", choices: [
    { id: "a", text: "Solve this exactly so I can submit it.", correct: false, explanation: "Submitting an unexamined generated answer can violate academic rules and leaves the learning gap untouched." },
    { id: "b", text: "Give me a hint, ask me what I have tried and show the next step only after I respond.", correct: true, explanation: "This creates a tutoring loop: you attempt, reflect and receive support without outsourcing the whole task." },
    { id: "c", text: "Write the answer in my style and do not explain it.", correct: false, explanation: "It hides the reasoning and encourages work that cannot be confidently called your own." },
  ]},
  { id: "q7", lesson: "clarity", concept: "Audience", scenario: "You need a biology explanation for a younger sibling. Which prompt is clearest?", choices: [{ id: "a", text: "Explain cells.", correct: false, explanation: "The topic is named but the learner and level are missing." }, { id: "b", text: "Explain cells for a 12-year-old using one analogy and a five-question mini-quiz.", correct: true, explanation: "The audience, format and learning goal are explicit." }, { id: "c", text: "Make cells easy.", correct: false, explanation: "Easy is subjective and gives no usable structure." }] },
  { id: "q8", lesson: "clarity", concept: "Success criteria", scenario: "You want feedback on a presentation. What should you ask for?", choices: [{ id: "a", text: "Tell me if it is nice.", correct: false, explanation: "Nice is not a review standard." }, { id: "b", text: "Score the outline against clarity, evidence and timing, then give one revision priority for each.", correct: true, explanation: "Specific criteria make the feedback actionable." }, { id: "c", text: "Improve anything weak.", correct: false, explanation: "It does not define what weak means." }] },
  { id: "q9", lesson: "context", concept: "Source boundary", scenario: "You want a summary of a provided article. Which instruction protects accuracy?", choices: [{ id: "a", text: "Summarize it and fill in anything missing from memory.", correct: false, explanation: "Filling gaps invites unsupported additions." }, { id: "b", text: "Use only the article, flag unclear claims and quote the paragraph that supports each key point.", correct: true, explanation: "The source boundary and evidence trail make the summary easier to audit." }, { id: "c", text: "Make it sound authoritative.", correct: false, explanation: "Tone does not establish evidence." }] },
  { id: "q10", lesson: "context", concept: "Useful examples", scenario: "You want an AI tutor to match your preferred answer style. What helps most?", choices: [{ id: "a", text: "Say ‘be good’.", correct: false, explanation: "The preference is too vague." }, { id: "b", text: "Show one answer you found helpful and explain what made it useful.", correct: true, explanation: "A concrete example communicates the desired pattern." }, { id: "c", text: "Ask it to copy a random website.", correct: false, explanation: "The source may be unsuitable and the target style is unclear." }] },
  { id: "q11", lesson: "context", concept: "Ask before assuming", scenario: "Your assignment brief is ambiguous. What should your prompt request?", choices: [{ id: "a", text: "Invent the missing requirements.", correct: false, explanation: "Invented assumptions can send the work in the wrong direction." }, { id: "b", text: "List the ambiguities and ask me three clarifying questions before drafting.", correct: true, explanation: "Clarification reduces avoidable rework and keeps decisions visible." }, { id: "c", text: "Write the longest possible answer.", correct: false, explanation: "Length does not resolve ambiguity." }] },
  { id: "q12", lesson: "verify", concept: "Check calculations", scenario: "AI gives a percentage for your lab report. What should you do?", choices: [{ id: "a", text: "Use it because the number looks reasonable.", correct: false, explanation: "Plausible numbers can still be wrong." }, { id: "b", text: "Recalculate it from the original values and compare the method.", correct: true, explanation: "Independent calculation checks both the result and the reasoning." }, { id: "c", text: "Ask AI to repeat the same calculation.", correct: false, explanation: "Repeating the same process is not independent verification." }] },
  { id: "q13", lesson: "verify", concept: "Separate draft from fact", scenario: "You are brainstorming a history project. Which workflow is safest?", choices: [{ id: "a", text: "Treat every generated detail as a fact.", correct: false, explanation: "Brainstorming can mix useful ideas with invented details." }, { id: "b", text: "Use AI for possible angles, then verify names, dates and quotations before using them.", correct: true, explanation: "It preserves ideation while separating it from factual claims." }, { id: "c", text: "Avoid checking because brainstorming is informal.", correct: false, explanation: "A draft can still become a published error." }] },
  { id: "q14", lesson: "verify", concept: "Compare interpretations", scenario: "Two summaries disagree about a paper. What is the best response?", choices: [{ id: "a", text: "Choose the more confident summary.", correct: false, explanation: "Confidence is not a quality test." }, { id: "b", text: "Return to the original paper, identify the exact disagreement and record the evidence.", correct: true, explanation: "The original source resolves interpretation disputes better than tone." }, { id: "c", text: "Average both claims.", correct: false, explanation: "A compromise can still be unsupported." }] },
  { id: "q15", lesson: "verify", concept: "Use uncertainty", scenario: "The evidence is incomplete. What should your prompt ask AI to do?", choices: [{ id: "a", text: "Sound certain anyway.", correct: false, explanation: "False certainty makes uncertainty harder to notice." }, { id: "b", text: "Label what is known, what is uncertain and what evidence would resolve it.", correct: true, explanation: "Visible uncertainty supports better judgment and follow-up research." }, { id: "c", text: "Delete the caveats.", correct: false, explanation: "Caveats can be essential context." }] },
];
