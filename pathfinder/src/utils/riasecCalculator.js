import { PERSONALITY_QUESTIONS } from "../constants/quiz";

/**
 * calcRIASEC
 * ----------
 * Takes a quizAnswers object { q1: 4, q2: 2, q3: 5, ... }
 * Returns RIASEC scores { R: 0, I: 9, A: 0, S: 6, E: 0, C: 0 }
 *
 * Only answers rated 3 or above contribute to the score,
 * meaning neutral-to-strong agreement drives the personality profile.
 */
export function calcRIASEC(quizAnswers) {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  PERSONALITY_QUESTIONS.forEach((question) => {
    const answer = quizAnswers[question.id];
    if (answer >= 3) {
      scores[question.trait] += answer;
    }
  });

  return scores;
}

/**
 * getDominantTraits
 * -----------------
 * Returns the top 2 RIASEC traits by score as an array of trait keys.
 * Useful for summarising the learner's personality type (e.g. ["I", "S"]).
 */
export function getDominantTraits(riasecScores) {
  return Object.entries(riasecScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([trait]) => trait);
}