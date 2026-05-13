import { COLORS } from "../../styles/colors";

export default function Spinner({ message = "PathFinder is thinking…" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 20,
          height: 20,
          border: `3px solid ${COLORS.tealLight}`,
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span style={{ color: COLORS.tealLight, fontSize: 14 }}>{message}</span>
    </div>
  );
}