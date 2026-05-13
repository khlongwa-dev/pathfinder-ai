import { useState } from "react";
import { COLORS } from "./styles/colors";
import { SUBJECTS } from "./constants/subjects";
import { analyzeWithGemini } from "./services/geminiService";

import Header from "./components/layout/Header";
import WelcomeStep from "./components/steps/WelcomeStep";
import MarksStep from "./components/steps/MarksStep";
import PersonalityStep from "./components/steps/PersonalityStep";
import ResultsStep from "./components/steps/ResultsStep";

// Global styles injected once at the app root
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.navy}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.teal}; border-radius: 99px; }
  input, select, button, textarea { font-family: 'DM Sans', sans-serif; }
  input:focus, select:focus, textarea:focus { outline: none; }
  input[type=range] { -webkit-appearance: none; }
`;

export default function App() {
  // ── Navigation ──────────────────────────────────────────────
  const [step, setStep] = useState(0);

  // ── Step 0 — Learner info ───────────────────────────────────
  const [learnerName, setLearnerName] = useState("");
  const [grade, setGrade] = useState("10");
  const [targetStream, setTargetStream] = useState("science");
  const [targetCourse, setTargetCourse] = useState("");

  // ── Step 1 — Marks ──────────────────────────────────────────
  const [marks, setMarks] = useState(() =>
    Object.fromEntries(SUBJECTS.map((s) => [s, 55]))
  );

  // ── Step 2 — Personality ────────────────────────────────────
  const [quizAnswers, setQuizAnswers] = useState({});

  // ── Step 3 — Results ────────────────────────────────────────
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Analysis handler — calls Gemini service ─────────────────
  async function handleAnalyze() {
    setLoading(true);
    setError("");
    try {
      const analysisResult = await analyzeWithGemini({
        learnerName,
        grade,
        targetStream,
        targetCourse,
        marks,
        quizAnswers,
      });
      setResult(analysisResult);
      setStep(3);
    } catch (e) {
      setError(
        "Analysis failed. Please check your Gemini API key in your .env file. " +
          e.message
      );
    } finally {
      setLoading(false);
    }
  }

  // ── Reset — clears all state back to step 0 ─────────────────
  function handleReset() {
    setStep(0);
    setResult(null);
    setError("");
    setQuizAnswers({});
    setMarks(Object.fromEntries(SUBJECTS.map((s) => [s, 55])));
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.navy,
        fontFamily: "'DM Sans', sans-serif",
        color: COLORS.cream,
      }}
    >
      <style>{globalStyles}</style>

      <Header currentStep={step} />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px" }}>
        {step === 0 && (
          <WelcomeStep
            learnerName={learnerName} setLearnerName={setLearnerName}
            grade={grade} setGrade={setGrade}
            targetStream={targetStream} setTargetStream={setTargetStream}
            targetCourse={targetCourse} setTargetCourse={setTargetCourse}
            onNext={() => setStep(1)}
          />
        )}

        {step === 1 && (
          <MarksStep
            marks={marks}
            setMarks={setMarks}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}

        {step === 2 && (
          <PersonalityStep
            quizAnswers={quizAnswers}
            setQuizAnswers={setQuizAnswers}
            onAnalyze={handleAnalyze}
            onBack={() => setStep(1)}
            loading={loading}
            error={error}
          />
        )}

        {step === 3 && result && (
          <ResultsStep
            result={result}
            learnerName={learnerName}
            grade={grade}
            targetCourse={targetCourse}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}