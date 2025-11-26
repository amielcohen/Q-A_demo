// src/api/apiClient.js
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

// חדש: יצירת שאלה אמיתית
export async function createQuestionApi({ title, body, tags }) {
  const res = await fetch(`${API_BASE}/createQuestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ title, body, tags }),
  });
  if (!res.ok) throw new Error("Failed to create question");
  return res.json();
}

// חדש: תשובות לשאלה
export async function getQuestionAnswersApi(questionId) {
  const res = await fetch(
    `${API_BASE}/getQuestionAnswers?questionId=${questionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    }
  );
  if (!res.ok) throw new Error("Failed to load answers");
  return res.json();
}

// חדש: שליחת תשובה
export async function answerApi(questionId, body) {
  const res = await fetch(`${API_BASE}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ questionId, body }),
  });
  if (!res.ok) throw new Error("Failed to add answer");
  return res.json();
}

// אופציונלי – למצוא שאלה לפי id בצד הקליינט
export async function getQuestionByIdApi(id) {
  const all = await getQuestionsApi();
  return all.find((q) => q._id === id);
}
