import { COLORS } from "../../styles/colors";
import { SUBJECTS } from "../../constants/subjects";
import { calcAPS } from "../../utils/apsCalculator";

// ── MarkRow ──────────────────────────────────────────────────────
// Individual subject slider row — kept in this file since it's
// only ever used by MarksStep.
function MarkRow({ subject, value, onChange }) {
  const color =
    value >= 70 ? COLORS.success : value >= 50 ? COLORS.gold : COLORS.error;

  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}
      >
        <span
          style={{
            fontSize: 13,
            color: COLORS.cream,
            fontFamily: "'Crimson Pro', Georgia, serif",
          }}
        >
          {subject}
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color,
            fontFamily: "monospace",
          }}
        >
          {value}%
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: 6,
          borderRadius: 99,
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 99,
            background: color,
            transition: "width 0.2s",
          }}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            opacity: 0,
            cursor: "pointer",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}

// ── MarksStep ────────────────────────────────────────────────────
export default function MarksStep({ marks, setMarks, onNext, onBack }) {
  const aps = calcAPS(marks);

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
          Enter your{" "}
          <span style={{ color: COLORS.tealLight }}>subject marks</span>
        </h2>
        <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 4 }}>
          Drag each slider to your latest term percentage.
        </p>
      </div>

      {/* Live APS preview */}
      <div
        style={{
          background: "rgba(13,148,136,0.1)",
          border: `1px solid rgba(13,148,136,0.3)`,
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 13, color: COLORS.tealLight }}>
          Your current APS score
        </span>
        <span
          style={{
            fontSize: 28,
            fontWeight: 700,
            fontFamily: "monospace",
            color: COLORS.goldLight,
          }}
        >
          {aps}
        </span>
      </div>

      {/* Sliders */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          border: `1px solid rgba(255,255,255,0.08)`,
          padding: "24px 24px 10px",
          marginBottom: 20,
        }}
      >
        {SUBJECTS.map((subject) => (
          <MarkRow
            key={subject}
            subject={subject}
            value={marks[subject]}
            onChange={(val) => setMarks((prev) => ({ ...prev, [subject]: val }))}
          />
        ))}
      </div>

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
          onClick={onNext}
          style={{
            flex: 3,
            padding: "13px",
            borderRadius: 10,
            border: "none",
            background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.slate})`,
            color: COLORS.white,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Next: Personality Quiz →
        </button>
      </div>
    </div>
  );
}