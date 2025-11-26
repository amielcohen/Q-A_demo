import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestionApi } from "../api/apiClient";

function CreateQuestionPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !body.trim()) {
      setError("Title and body are required");
      return;
    }

    const tags =
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0) || [];

    await createQuestionApi({ title, body, tags });

    // אחרי יצירה חוזרים לרשימת השאלות
    navigate("/");
  }

  return (
    <div style={{ maxWidth: 800, margin: "40px auto" }}>
      <h2>Create Question</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: "100%", height: 120 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="react, hooks, jwt"
            style={{ width: "100%" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ marginTop: 10, padding: 8 }}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateQuestionPage;
