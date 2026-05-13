import { COLORS } from "../../styles/colors";

export default function CourseFitCard({ targetCourse, courseFit, alternativeCourses }) {
  if (!targetCourse) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 12,
        padding: 18,
        marginBottom: 20,
      }}
    >
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: COLORS.goldLight }}>
        🏛 Course Fit: {targetCourse}
      </p>
      <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7 }}>
        {courseFit.reason}
      </p>

      {alternativeCourses?.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <p style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>
            ALTERNATIVE COURSES TO CONSIDER
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {alternativeCourses.map((course) => (
              <span
                key={course}
                style={{
                  padding: "4px 10px",
                  borderRadius: 99,
                  fontSize: 12,
                  background: "rgba(13,148,136,0.1)",
                  border: `1px solid rgba(13,148,136,0.2)`,
                  color: COLORS.tealLight,
                }}
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}