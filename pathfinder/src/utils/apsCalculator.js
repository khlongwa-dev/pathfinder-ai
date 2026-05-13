/**
 * calcAPS
 * -------
 * Takes a marks object { "Mathematics": 75, "English Home Language": 60, ... }
 * Returns the APS score as a number (max 42 — top 7 subjects × 7 points each).
 *
 * SA APS point scale:
 *   80–100% → 7 points
 *   70–79%  → 6 points
 *   60–69%  → 5 points
 *   50–59%  → 4 points
 *   40–49%  → 3 points
 *   30–39%  → 2 points
 *   0–29%   → 1 point
 *
 * Life Orientation is included in the raw marks but most SA universities
 * cap its contribution or exclude it from APS. This calculator includes it
 * in the top 7 sort — flag this in your presentation as a simplification.
 */
export function calcAPS(marks) {
  const top7 = Object.values(marks)
    .sort((a, b) => b - a)
    .slice(0, 7);

  return top7.reduce((sum, mark) => {
    if (mark >= 80) return sum + 7;
    if (mark >= 70) return sum + 6;
    if (mark >= 60) return sum + 5;
    if (mark >= 50) return sum + 4;
    if (mark >= 40) return sum + 3;
    if (mark >= 30) return sum + 2;
    return sum + 1;
  }, 0);
}

/**
 * getAPSLabel
 * -----------
 * Returns a human-readable label for a given APS score
 * based on general SA university admission ranges.
 */
export function getAPSLabel(aps) {
  if (aps >= 35) return "Excellent — qualifies for most programmes";
  if (aps >= 28) return "Strong — qualifies for many degree programmes";
  if (aps >= 21) return "Moderate — qualifies for diploma and some degree programmes";
  return "Developing — TVET and foundation programmes available";
}