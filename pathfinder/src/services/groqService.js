// Get your free key at https://console.groq.com — no card required
const GROQ_KEY = import.meta.env.VITE_GROQ_KEY;

/**
 * buildSystemPrompt
 * -----------------
 * The system prompt is sent once per request as the first message.
 * It sets the assistant's persona, scope, and SA context for the
 * entire conversation — Groq uses OpenAI-compatible message format
 * so system role goes directly in the messages array.
 */
function buildSystemPrompt({ learnerName, grade, targetCourse }) {
  return `You are PathFinder AI's career research assistant, specialising in South African careers and education.

Your rules:
- Keep every answer to 3-5 sentences maximum — concise and practical
- Always ground answers in the South African context
- Reference SA universities (UCT, Wits, UP, UKZN, UJ, DUT, MUT, SU), SAQA, NQF levels, scarce skills lists, and SETA programmes where relevant
- Never give generic global career advice — bring it back to SA realities, job market, and opportunities
- If asked about salary, give realistic SA ranges in ZAR
- If asked about a university course, mention specific institutions that offer it in SA

The learner you are helping: ${learnerName || "a student"}, Grade ${grade}, interested in ${targetCourse || "exploring career options"}.`;
}

/**
 * sendChatMessage
 * ---------------
 * Sends a new user message to Groq (Llama 3) along with the full
 * conversation history so the model maintains context across turns.
 *
 * Groq uses the OpenAI-compatible /chat/completions endpoint.
 *
 * @param {object} params
 * @param {string} params.userMessage       - the new message from the learner
 * @param {Array}  params.chatHistory       - array of { role, content } objects
 * @param {string} params.learnerName
 * @param {string} params.grade
 * @param {string} params.targetCourse
 * @returns {string} - the assistant's reply text
 * @throws {Error} - re-throws so CareerChat component can handle UI feedback
 */
export async function sendChatMessage({ userMessage, chatHistory, learnerName, grade, targetCourse }) {
  const systemPrompt = buildSystemPrompt({ learnerName, grade, targetCourse });

  // Full conversation history sent on every request — this is how
  // the model "remembers" what was said earlier (stateless by design)
  const messages = [
    { role: "system", content: systemPrompt },
    ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userMessage },
  ];

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-instant",  // Free, fast Llama 3 on Groq infrastructure
      messages,
      max_tokens: 400,
      temperature: 0.6,         // Slightly higher — conversational tone is fine here
    }),
  });

  const data = await response.json();

  // Groq/OpenAI response shape: data.choices[0].message.content
  if (!data.choices?.[0]?.message?.content) {
    throw new Error("Unexpected response shape from Groq: " + JSON.stringify(data));
  }

  return data.choices[0].message.content;
}