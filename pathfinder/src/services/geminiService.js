import { STREAMS } from "../constants/streams";
import { calcAPS } from "../utils/apsCalculator";
import { calcRIASEC } from "../utils/riasecCalculator";

// Get your free key at https://aistudio.google.com — no card required
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

/**
 * buildPrompt
 * -----------
 * Constructs the full text prompt sent to Gemini.
 * All learner data is embedded inline so the model
 * reasons about real numbers, not placeholders.
 */
function buildPrompt({ learnerName, grade, targetStream, targetCourse, marks, aps, riasec }) {
  const streamLabel = STREAMS[targetStream].label;
  const marksStr = Object.entries(marks)
    .map(([subject, mark]) => `${subject}: ${mark}%`)
    .join(", ");

  return `You are PathFinder AI, a South African school career guidance assistant.
Analyse this learner profile and respond ONLY with a valid JSON object.
No markdown, no code fences, no explanation outside the JSON.

Learner: ${learnerName || "Student"}, Grade ${grade}
Subject Marks: ${marksStr}
APS Score: ${aps}
Target Subject Stream: ${streamLabel}
Target University Course: ${targetCourse || "Not yet decided"}
Personality Scores (RIASEC, higher = stronger match): R=${riasec.R}, I=${riasec.I}, A=${riasec.A}, S=${riasec.S}, E=${riasec.E}, C=${riasec.C}

Return JSON with these exact keys — do not add or remove any:
{
  "streamFit": {
    "score": <number 0-100>,
    "verdict": "<Great Fit | Good Fit | Needs Work>",
    "reason": "<2 sentences explaining the fit>"
  },
  "apsAnalysis": {
    "current": ${aps},
    "verdict": "<string>",
    "insight": "<2 sentences about what this APS unlocks at SA universities>"
  },
  "courseFit": {
    "verdict": "<string>",
    "reason": "<2 sentences on how marks + personality align with the target course>"
  },
  "subjectsToBoost": ["<subject>", "<subject>", "<subject>"],
  "careerMatches": [
    { "title": "<career>", "match": <0-100>, "reason": "<1 sentence>", "demandInSA": "<High|Medium|Low>" },
    { "title": "<career>", "match": <0-100>, "reason": "<1 sentence>", "demandInSA": "<High|Medium|Low>" },
    { "title": "<career>", "match": <0-100>, "reason": "<1 sentence>", "demandInSA": "<High|Medium|Low>" }
  ],
  "alternativeCourses": ["<Course at SA university>", "<Course at SA university>"],
  "encouragement": "<Warm, honest 2-sentence message to this specific learner>"
}`;
}

/**
 * analyzeWithGemini
 * -----------------
 * Primary analysis engine. Sends learner data to Gemini 1.5 Flash
 * and returns a structured result object.
 *
 * @param {object} params - { learnerName, grade, targetStream, targetCourse, marks, quizAnswers }
 * @returns {object} - parsed result + aps score
 * @throws {Error} - re-throws so the calling component can handle UI feedback
 */
export async function analyzeWithGemini(params) {
  const { marks, quizAnswers } = params;
  const aps = calcAPS(marks);
  const riasec = calcRIASEC(quizAnswers);
  const prompt = buildPrompt({ ...params, aps, riasec });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,      // Lower = more deterministic JSON output
          maxOutputTokens: 1200,
        },
      }),
    }
  );

  const data = await response.json();

  // Gemini response shape: data.candidates[0].content.parts[0].text
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error("Unexpected response shape from Gemini: " + JSON.stringify(data));
  }

  const rawText = data.candidates[0].content.parts[0].text;

  // Strip any accidental markdown fences the model adds despite instructions
  const cleaned = rawText.replace(/```json|```/g, "").trim();

  const parsed = JSON.parse(cleaned);

  return { ...parsed, aps };
}