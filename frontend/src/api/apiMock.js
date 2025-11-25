// src/api/apiMock.js

// "מאגר" שאלות בזיכרון
let questions = [
  {
    id: "1",
    title: "How do I use React useEffect?",
    body: "I need an explanation with examples.",
    tags: ["react", "hooks"],
  },
  {
    id: "2",
    title: "What is JWT?",
    body: "I want to know why it's used in authentication.",
    tags: ["auth", "security"],
  },
];

export async function loginMock(email, password) {
  return {
    token: "FAKE_JWT_TOKEN_123",
    user: {
      nickname: "amiel",
      fullName: "עמיאל כהן",
      email,
    },
  };
}

export async function getQuestionsMock() {
  // פשוט מחזיר את המערך
  return questions;
}

export async function createQuestionMock({ title, body, tags }) {
  const newQuestion = {
    id: Date.now().toString(),
    title,
    body,
    tags,
  };
  questions.push(newQuestion);
  return newQuestion;
}

export async function getQuestionByIdMock(id) {
  // מחפש שאלה לפי id
  return questions.find((q) => q.id === id);
}

// תשובות רק למוק
export async function getAnswersMock(questionId) {
  return [
    {
      id: "a1",
      questionId,
      body: "You can use useEffect to run side effects.",
      user: { nickname: "john" },
    },
    {
      id: "a2",
      questionId,
      body: "Remember to add dependencies!",
      user: { nickname: "devGuy" },
    },
  ];
}

export async function addAnswerMock(questionId, body) {
  return {
    id: Date.now().toString(),
    questionId,
    body,
    user: { nickname: "amiel" },
  };
}
