import { Link } from "react-router-dom";

function QuestionCard({ question }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <h3>{question.title}</h3>
      <p>{question.body}</p>

      <div style={{ marginTop: 8 }}>
        {question.tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#eee",
              padding: "2px 6px",
              marginRight: 5,
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to={`/questions/${question.id}`}
        style={{ display: "inline-block", marginTop: 10, fontSize: 14 }}
      >
        View Question →
      </Link>
    </div>
  );
}

export default QuestionCard;
