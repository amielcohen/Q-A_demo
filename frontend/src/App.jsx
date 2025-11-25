// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import QuestionsListPage from "./pages/QuestionsListPage";
import QuestionDetailsPage from "./pages/QuestionDetailsPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={token ? <QuestionsListPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/questions/:id"
        element={token ? <QuestionDetailsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/create-question"
        element={token ? <CreateQuestionPage /> : <Navigate to="/login" />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
