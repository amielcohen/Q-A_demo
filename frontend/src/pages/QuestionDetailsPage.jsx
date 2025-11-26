import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuestionByIdApi,
  getQuestionAnswersApi,
  answerApi,
} from "../api/apiClient";
import AnswerCard from "../components/AnswerCard";
import "./css/QuestionDetailsPage.css"; 

function QuestionDetailsPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    async function load() {
      const q = await getQuestionByIdApi(id);
      const a = await getQuestionAnswersApi(id);
      setQuestion(q);
      setAnswers(a);
    }
    load();
  }, [id]);

  async function handleAddAnswer(e) {
    e.preventDefault();

    if (!newAnswer.trim()) return;

    const added = await answerApi(id, newAnswer);
    setAnswers((prev) => [...prev, added]);
    setNewAnswer("");
  }

  if (!question) return <p>Loading...</p>;

  const tags = question.tags || [];

  return (
    <div className="question-details-page">
      <h2 className="question-title">{question.title}</h2>
      <p className="question-body">{question.body}</p>

      <div className="question-tags">
        {tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>

      <hr className="section-divider" />

      <section className="answers-section">
        <h3 className="section-title">Answers</h3>
        {answers.length === 0 && (
          <p className="no-answers-text">No answers yet. Be the first!</p>
        )}
        {answers.map((ans) => (
          <AnswerCard key={ans._id} answer={ans} />
        ))}
      </section>

      <form onSubmit={handleAddAnswer} className="answer-form">
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer..."
          className="answer-textarea"
        />
        <button type="submit" className="answer-button">
          Add Answer
        </button>
      </form>
    </div>
  );
}

export default QuestionDetailsPage;
