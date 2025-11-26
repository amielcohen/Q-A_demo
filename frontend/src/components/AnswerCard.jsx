function AnswerCard({ answer }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
      }}
    >
      <p>{answer.body}</p>
     <small style={{ color: "#555" }}>
        By {answer.userId?.nickname || "Unknown user"}
     </small>
    </div>
  );
}

export default AnswerCard;
