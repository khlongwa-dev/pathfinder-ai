import { COLORS } from "../../styles/colors";

export default function StatCards({ aps, streamFit }) {
  const cards = [
    { label: "APS SCORE", value: aps, unit: "/ 42", color: COLORS.gold },
    { label: "STREAM FIT", value: `${streamFit.score}%`, color: COLORS.tealLight },
    { label: "VERDICT", value: streamFit.verdict, color: COLORS.success },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        marginBottom: 20,
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: 12,
            padding: "18px 16px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 10, color: COLORS.muted, letterSpacing: "1px", marginBottom: 8 }}>
            {card.label}
          </p>
          <p
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: card.color,
              fontFamily: "monospace",
            }}
          >
            {card.value}
          </p>
          {card.unit && (
            <p style={{ fontSize: 11, color: COLORS.muted }}>{card.unit}</p>
          )}
        </div>
      ))}
    </div>
  );
}