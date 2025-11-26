import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionsApi } from "../api/apiClient";
import QuestionCard from "../components/QuestionCard";

function QuestionsListPage() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getQuestionsApi();
      setQuestions(data);
    }
    load();
  }, []);

  function handleAskQuestion() {
    navigate("/create-question");
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Questions</h2>
        <button onClick={handleAskQuestion}>Ask Question</button>
      </div>

      {questions.map((q) => (
        <QuestionCard key={q._id} question={q} />
      ))}
    </div>
  );
}

export default QuestionsListPage;
