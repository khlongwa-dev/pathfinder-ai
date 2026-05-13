import { COLORS } from "../../styles/colors";

export default function CareerMatches({ careerMatches }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "1px", marginBottom: 12 }}>
        TOP CAREER MATCHES
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {careerMatches?.map((career, index) => {
          const matchColor =
            career.match >= 80
              ? COLORS.success
              : career.match >= 60
              ? COLORS.gold
              : COLORS.muted;

          const isHighDemand = career.demandInSA === "High";

          return (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 12,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Match % */}
              <div style={{ textAlign: "center", minWidth: 48 }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "monospace",
                    color: matchColor,
                  }}
                >
                  {career.match}%
                </div>
                <div style={{ fontSize: 9, color: COLORS.muted }}>FIT</div>
              </div>

              {/* Title + reason */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.cream,
                    marginBottom: 2,
                  }}
                >
                  {career.title}
                </p>
                <p style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.5 }}>
                  {career.reason}
                </p>
              </div>

              {/* Demand badge */}
              <div
                style={{
                  padding: "3px 8px",
                  borderRadius: 99,
                  fontSize: 10,
                  fontWeight: 600,
                  background: isHighDemand
                    ? "rgba(16,185,129,0.15)"
                    : "rgba(245,158,11,0.15)",
                  color: isHighDemand ? COLORS.success : COLORS.gold,
                  border: `1px solid ${
                    isHighDemand ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"
                  }`,
                  whiteSpace: "nowrap",
                }}
              >
                {career.demandInSA} demand
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}