import { useState, useRef, useEffect } from "react";
import { COLORS } from "../../styles/colors";
import { sendChatMessage } from "../../services/groqService";
import Spinner from "../layout/Spinner";

export default function CareerChat({ learnerName, grade, targetCourse }) {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  async function handleSend() {
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatInput("");
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);
    setChatLoading(true);

    try {
      const reply = await sendChatMessage({
        userMessage,
        chatHistory,
        learnerName,
        grade,
        targetCourse,
      });
      setChatHistory((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the service right now. Check your Groq API key and try again.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 20,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, color: COLORS.goldLight }}>
          💬 Career Research Assistant
        </p>
        <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
          Ask anything about careers, courses, SA universities, or study tips
        </p>
      </div>

      {/* Message list */}
      <div
        style={{
          height: 240,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {chatHistory.length === 0 && (
          <p
            style={{
              fontSize: 13,
              color: COLORS.muted,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Try: "What does a data scientist actually do?" or "Which SA
            university is best for engineering?"
          </p>
        )}
        {chatHistory.map((message, index) => (
          <div
            key={index}
            style={{
              maxWidth: "85%",
              padding: "10px 14px",
              borderRadius: 10,
              fontSize: 13,
              lineHeight: 1.6,
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              background:
                message.role === "user"
                  ? `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.slate})`
                  : "rgba(255,255,255,0.06)",
              color: message.role === "user" ? COLORS.white : COLORS.cream,
            }}
          >
            {message.content}
          </div>
        ))}
        {chatLoading && (
          <div style={{ alignSelf: "flex-start" }}>
            <Spinner message="Looking that up…" />
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input row */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: `1px solid rgba(255,255,255,0.06)`,
          display: "flex",
          gap: 10,
        }}
      >
        <input
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about any career or course…"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid rgba(255,255,255,0.1)`,
            color: COLORS.cream,
            fontSize: 13,
          }}
        />
        <button
          onClick={handleSend}
          disabled={chatLoading}
          style={{
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
            background: COLORS.teal,
            color: COLORS.white,
            fontSize: 13,
            fontWeight: 600,
            cursor: chatLoading ? "default" : "pointer",
            opacity: chatLoading ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}