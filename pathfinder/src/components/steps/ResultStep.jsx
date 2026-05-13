import { COLORS } from "../../styles/colors";
import StatCards from "../results/StatCards";
import InsightCards from "../results/InsightCards";
import CourseFitCard from "../results/CourseFitCard";
import CareerMatches from "../results/CareerMatches";
import SubjectsToBoost from "../results/SubjectsToBoost";
import CareerChat from "../results/CareerChat";

export default function ResultsStep({
  result,
  learnerName,
  grade,
  targetCourse,
  onReset,
}) {
  return (
    <div style={{ animation: "fadeUp 0.5s ease" }}>
      {/* Report header */}
      <div
        style={{
          background: `linear-gradient(135deg, rgba(13,148,136,0.15), rgba(245,158,11,0.08))`,
          border: `1px solid rgba(13,148,136,0.2)`,
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: COLORS.teal,
            letterSpacing: "1px",
            marginBottom: 4,
          }}
        >
          YOUR PATHFINDER REPORT
        </p>
        <h2
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 8,
            color: COLORS.cream,
          }}
        >
          {learnerName ? `${learnerName}'s` : "Your"} career path analysis
        </h2>
        <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7 }}>
          {result.encouragement}
        </p>
      </div>

      <StatCards aps={result.aps} streamFit={result.streamFit} />

      <InsightCards
        streamReason={result.streamFit.reason}
        apsInsight={result.apsAnalysis.insight}
      />

      <CourseFitCard
        targetCourse={targetCourse}
        courseFit={result.courseFit}
        alternativeCourses={result.alternativeCourses}
      />

      <CareerMatches careerMatches={result.careerMatches} />

      <SubjectsToBoost subjects={result.subjectsToBoost} />

      <CareerChat
        learnerName={learnerName}
        grade={grade}
        targetCourse={targetCourse}
      />

      <button
        onClick={onReset}
        style={{
          width: "100%",
          padding: "13px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.05)",
          border: `1px solid rgba(255,255,255,0.1)`,
          color: COLORS.muted,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        ← Start a new analysis
      </button>
    </div>
  );
}