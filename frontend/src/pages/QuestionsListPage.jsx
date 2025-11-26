import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestionsApi } from "../api/apiClient";
import QuestionCard from "../components/QuestionCard";
import "./css/QuestionsListPage.css";

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
    <div className="questions-page">
      <div className="questions-header">
        <h2 className="questions-title">Questions</h2>
        <button onClick={handleAskQuestion} className="ask-button">
          Ask Question
        </button>
      </div>

      {questions.map((q) => (
        <QuestionCard key={q._id} question={q} />
      ))}
    </div>
  );
}

export default QuestionsListPage;
