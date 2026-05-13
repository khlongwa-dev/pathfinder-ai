import { COLORS } from "../../styles/colors";

export default function SubjectsToBoost({ subjects }) {
  return (
    <div
      style={{
        background: "rgba(239,68,68,0.06)",
        border: `1px solid rgba(239,68,68,0.15)`,
        borderRadius: 12,
        padding: 18,
        marginBottom: 20,
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, color: "#FCA5A5", marginBottom: 10 }}>
        ⚡ Focus these subjects for bigger impact
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {subjects?.map((subject) => (
          <span
            key={subject}
            style={{
              padding: "4px 12px",
              borderRadius: 99,
              fontSize: 12,
              background: "rgba(239,68,68,0.1)",
              border: `1px solid rgba(239,68,68,0.2)`,
              color: "#FCA5A5",
            }}
          >
            {subject}
          </span>
        ))}
      </div>
    </div>
  );
}