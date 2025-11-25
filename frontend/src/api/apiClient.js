export const API_BASE = "http://localhost:4000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginApi(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { token, user }
}

export async function getQuestionsApi() {
  const res = await fetch(`${API_BASE}/getQuestions`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to load questions");
  return res.json();
}

// וכן הלאה: createQuestionApi, getQuestionAnswersApi, answerApi...
