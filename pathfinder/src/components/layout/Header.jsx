import { COLORS } from "../../styles/colors";
import { STEPS } from "../../constants/streams";

export default function Header({ currentStep }) {
  return (
    <header
      style={{
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.gold})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          🧭
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.3px",
              color: COLORS.cream,
            }}
          >
            PathFinder AI
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: -2 }}>
            Career Guidance for SA Learners
          </div>
        </div>
      </div>

      {/* Step indicator pills */}
      <div style={{ display: "flex", gap: 6 }}>
        {STEPS.map((label, index) => {
          const isActive = currentStep === index;
          const isDone = currentStep > index;
          return (
            <div
              key={label}
              style={{
                padding: "4px 12px",
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 500,
                transition: "all 0.3s",
                background: isActive
                  ? COLORS.teal
                  : isDone
                  ? "rgba(13,148,136,0.2)"
                  : "rgba(255,255,255,0.05)",
                color: isActive
                  ? COLORS.white
                  : isDone
                  ? COLORS.tealLight
                  : COLORS.muted,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>
    </header>
  );
}