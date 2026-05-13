// RIASEC model — Realistic, Investigative, Artistic, Social, Enterprising, Conventional
// Each question maps to one trait. Higher scores = stronger alignment.

export const PERSONALITY_QUESTIONS = [
  { id: "q1", text: "I enjoy solving complex puzzles and logical problems", trait: "I" },
  { id: "q2", text: "I like working with and helping other people directly", trait: "S" },
  { id: "q3", text: "I prefer hands-on work building or fixing things", trait: "R" },
  { id: "q4", text: "I enjoy creative work like design, writing, or music", trait: "A" },
  { id: "q5", text: "I like leading teams and making business decisions", trait: "E" },
  { id: "q6", text: "I prefer organized, structured routines and clear rules", trait: "C" },
  { id: "q7", text: "I enjoy conducting research and discovering new things", trait: "I" },
  { id: "q8", text: "I like teaching or explaining things to others", trait: "S" },
];

export const RIASEC_LABELS = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};