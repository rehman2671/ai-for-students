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
];
