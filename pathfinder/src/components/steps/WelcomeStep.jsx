import { COLORS } from "../../styles/colors";
import { STREAMS } from "../../constants/streams";

export default function WelcomeStep({
  learnerName, setLearnerName,
  grade, setGrade,
  targetStream, setTargetStream,
  targetCourse, setTargetCourse,
  onNext,
}) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🎓</div>
        <h1
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 36,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 12,
            color: COLORS.cream,
          }}
        >
          Know your path.
          <br />
          <span style={{ color: COLORS.tealLight }}>Own your future.</span>
        </h1>
        <p
          style={{
            color: COLORS.muted,
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.7,
            fontSize: 15,
          }}
        >
          PathFinder analyses your academic performance and personality to guide
          you toward the right subject stream, university course, and career —
          built for South African learners.
        </p>
      </div>

      {/* Form card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: 16,
          border: `1px solid rgba(255,255,255,0.08)`,
          padding: 28,
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: 18,
            marginBottom: 20,
            color: COLORS.goldLight,
          }}
        >
          Let's start with the basics
        </h3>

        {/* Name + Grade row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              YOUR NAME
            </label>
            <input
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="e.g. Sipho Dlamini"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid rgba(255,255,255,0.1)`,
                color: COLORS.cream,
                fontSize: 14,
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              GRADE
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                border: `1px solid rgba(255,255,255,0.1)`,
                color: COLORS.cream,
                fontSize: 14,
              }}
            >
              {["8", "9", "10", "11", "12"].map((g) => (
                <option key={g} value={g} style={{ background: COLORS.navy }}>
                  Grade {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stream selector */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 8 }}>
            TARGET SUBJECT STREAM
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {Object.entries(STREAMS).map(([key, val]) => (
              <div
                key={key}
                onClick={() => setTargetStream(key)}
                style={{
                  padding: "12px 10px",
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "center",
                  background:
                    targetStream === key
                      ? "rgba(13,148,136,0.2)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    targetStream === key ? COLORS.teal : "rgba(255,255,255,0.08)"
                  }`,
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 4 }}>{val.emoji}</div>
                <div
                  style={{
                    fontSize: 11,
                    color: targetStream === key ? COLORS.tealLight : COLORS.muted,
                  }}
                >
                  {val.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target course */}
        <div>
          <label style={{ fontSize: 12, color: COLORS.muted, display: "block", marginBottom: 6 }}>
            TARGET UNIVERSITY COURSE (optional)
          </label>
          <input
            value={targetCourse}
            onChange={(e) => setTargetCourse(e.target.value)}
            placeholder="e.g. BSc Computer Science, BCom Accounting, BA Psychology"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              border: `1px solid rgba(255,255,255,0.1)`,
              color: COLORS.cream,
              fontSize: 14,
            }}
          />
        </div>
      </div>

      <button
        onClick={onNext}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 10,
          border: "none",
          background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.slate})`,
          color: COLORS.white,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.3px",
        }}
      >
        Enter My Marks →
      </button>
    </div>
  );
}