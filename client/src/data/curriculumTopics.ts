export type TopicTrack = "foundations" | "study" | "research" | "career" | "creation" | "coding" | "safety" | "everyday";

export type CurriculumTopic = { id: string; title: string; track: TopicTrack; level: "starter" | "builder" | "advanced"; game: "prompt-detective" | "fact-check-quest" | "ai-safety-lab" | "future" };

const make = (track: TopicTrack, level: CurriculumTopic["level"], game: CurriculumTopic["game"], titles: string[]): CurriculumTopic[] => titles.map((title, index) => ({ id: `${track}-${index + 1}`, title, track, level, game }));

export const curriculumTopics: CurriculumTopic[] = [
  ...make("foundations", "starter", "prompt-detective", ["What AI can and cannot do", "How chatbots generate responses", "Prompts and instructions", "Context windows", "Tokens in plain language", "Structured outputs", "Examples and patterns", "Roles and audiences", "Constraints", "Formats and templates", "Iteration", "Prompt debugging", "Model differences", "Multimodal AI", "AI vocabulary"]),
  ...make("study", "starter", "prompt-detective", ["Explain a difficult concept", "Socratic tutoring", "Hints before answers", "Active recall", "Spaced revision", "Flashcards", "Practice quizzes", "Study-plan design", "Lecture-note cleanup", "Essay feedback", "Language practice", "Math step checking", "Code walkthroughs", "Presentation rehearsal", "Learning reflection"]),
  ...make("research", "builder", "fact-check-quest", ["Search strategy", "Primary versus secondary sources", "Source authority", "Source recency", "Claim decomposition", "Evidence quality", "Citation verification", "AI hallucinations", "Conflicting sources", "Reading charts", "Correlation and causation", "Sample size", "Missing context", "Research notes", "Reproducible checking"]),
  ...make("career", "builder", "prompt-detective", ["CV structure", "Achievement bullets", "Job-description analysis", "Interview practice", "Professional email", "Portfolio feedback", "Skill-gap planning", "Networking messages", "Freelance proposals", "Client briefs", "Meeting summaries", "Work prioritization", "Career research", "Salary-information checking", "Workplace communication"]),
  ...make("creation", "builder", "prompt-detective", ["Idea generation", "Story outlines", "Visual briefs", "Presentation structure", "Social captions", "Video scripts", "Podcast planning", "Brand voice", "Editing without losing voice", "Translation review", "Accessibility captions", "Creative constraints", "Style references", "Revision passes", "Originality and attribution"]),
  ...make("coding", "builder", "fact-check-quest", ["Explain code", "Debugging hypotheses", "Test-case design", "Input validation", "Error messages", "Documentation", "API concepts", "Data structures", "SQL safety", "Version-control habits", "Code review", "Security basics", "Dependency checking", "Performance reasoning", "Responsible automation"]),
  ...make("safety", "advanced", "ai-safety-lab", ["Data minimization", "Private information", "Password safety", "Academic integrity", "Copyright boundaries", "Plagiarism risk", "High-stakes advice", "Medical information", "Legal information", "Financial information", "Deepfakes", "Harassment and reporting", "Bias and fairness", "Human oversight", "AI disclosure"]),
  ...make("everyday", "starter", "ai-safety-lab", ["Inbox triage", "Travel planning", "Meal planning", "Accessibility support", "Household checklists", "Personal organization", "Comparing products", "Understanding forms", "Plain-language rewriting", "Decision journals", "Fact-checking social posts", "Scam detection", "Digital wellbeing", "Family AI rules", "Responsible sharing"]),
];

export const topicTracks: { id: TopicTrack; label: string; description: string }[] = [
  { id: "foundations", label: "AI foundations", description: "Understand the ideas behind the tools." },
  { id: "study", label: "Study smarter", description: "Use AI as a tutor, not a shortcut." },
  { id: "research", label: "Research and evidence", description: "Check claims before they travel." },
  { id: "career", label: "Career and work", description: "Turn AI into a practical work habit." },
  { id: "creation", label: "Create with intention", description: "Make more without losing your voice." },
  { id: "coding", label: "Code with care", description: "Build, test and review responsibly." },
  { id: "safety", label: "Safety and ethics", description: "Protect people, privacy and process." },
  { id: "everyday", label: "Everyday AI", description: "Make ordinary tasks clearer and safer." },
];

export const curriculumTopicCount = curriculumTopics.length;
