import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuestionByIdMock,
  getAnswersMock,
  addAnswerMock,
} from "../api/apiMock";
import AnswerCard from "../components/AnswerCard";

function QuestionDetailsPage() {
  const { id } = useParams(); // ה-id שמגיע מה-URL
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    async function load() {
      const q = await getQuestionByIdMock(id);
      const a = await getAnswersMock(id);
      setQuestion(q);
      setAnswers(a);
    }
    load();
  }, [id]);

  async function handleAddAnswer(e) {
    e.preventDefault();

    const added = await addAnswerMock(id, newAnswer);
    setAnswers((prev) => [...prev, added]);
    setNewAnswer("");
  }

  if (!question) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>{question.title}</h2>
      <p>{question.body}</p>

      <div style={{ marginTop: 10 }}>
        {question.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#eee",
              padding: "2px 8px",
              marginRight: 6,
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Answers</h3>
      {answers.map((ans) => (
        <AnswerCard key={ans.id} answer={ans} />
      ))}

      <form onSubmit={handleAddAnswer} style={{ marginTop: 20 }}>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer..."
          style={{ width: "100%", height: 80 }}
        />
        <button type="submit" style={{ marginTop: 10, padding: 8 }}>
          Add Answer
        </button>
      </form>
    </div>
  );
}

export default QuestionDetailsPage;
