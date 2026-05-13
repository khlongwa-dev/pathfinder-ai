import { COLORS } from "../../styles/colors";

function InsightCard({ title, text }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 12,
        padding: 18,
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: COLORS.goldLight }}>
        {title}
      </p>
      <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}

export default function InsightCards({ streamReason, apsInsight }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 20,
      }}
    >
      <InsightCard title="📚 Stream Analysis" text={streamReason} />
      <InsightCard title="🎯 APS Insight" text={apsInsight} />
    </div>
  );
}