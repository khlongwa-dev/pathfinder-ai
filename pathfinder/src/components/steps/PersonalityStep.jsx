import { COLORS } from "../../styles/colors";
import { PERSONALITY_QUESTIONS } from "../../constants/quiz";
import Spinner from "../layout/Spinner";

export default function PersonalityStep({
  quizAnswers,
  setQuizAnswers,
  onAnalyze,
  onBack,
  loading,
  error,
}) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      <div style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: 26,
            fontWeight: 700,
            color: COLORS.cream,
          }}
        >
          Quick{" "}
          <span style={{ color: COLORS.tealLight }}>personality check</span>
        </h2>
        <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 4 }}>
          Rate how much each statement describes you. This helps match careers
          to who you actually are.
        </p>
      </div>

      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          border: `1px solid rgba(255,255,255,0.08)`,
          padding: 24,
          marginBottom: 20,
        }}
      >
        {PERSONALITY_QUESTIONS.map((question, index) => (
          <div key={question.id} style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 14,
                color: COLORS.cream,
                marginBottom: 10,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: COLORS.muted, marginRight: 8, fontSize: 12 }}>
                {index + 1}.
              </span>
              {question.text}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 3, 4, 5].map((value) => {
                const isSelected = quizAnswers[question.id] === value;
                const label =
                  value === 1 ? "Not me" : value === 3 ? "Neutral" : value === 5 ? "Totally me" : value;

                return (
                  <button
                    key={value}
                    onClick={() =>
                      setQuizAnswers((prev) => ({ ...prev, [question.id]: value }))
                    }
                    style={{
                      flex: 1,
                      padding: "8px 0",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      transition: "all 0.15s",
                      background: isSelected
                        ? `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.slate})`
                        : "rgba(255,255,255,0.06)",
                      color: isSelected ? COLORS.white : COLORS.muted,
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p style={{ color: COLORS.error, fontSize: 13, marginBottom: 12 }}>
          ⚠ {error}
        </p>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            flex: 1,
            padding: "13px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(255,255,255,0.1)`,
            color: COLORS.muted,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
        <button
          onClick={onAnalyze}
          disabled={loading}
          style={{
            flex: 3,
            padding: "13px",
            borderRadius: 10,
            border: "none",
            background: loading
              ? "rgba(13,148,136,0.3)"
              : `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.slate})`,
            color: COLORS.white,
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <Spinner /> : "✨ Analyse My Path →"}
        </button>
      </div>
    </div>
  );
}