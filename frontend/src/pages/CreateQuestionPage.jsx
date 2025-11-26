import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestionApi } from "../api/apiClient";
import "./css/CreateQuestionPage.css"; 

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

    navigate("/");
  }

  return (
    <div className="create-question-page">
      <h2 className="page-title">Create Question</h2>

      <form onSubmit={handleSubmit} className="create-question-form">
        <div className="form-control">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-control">
          <label className="form-label">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-textarea"
          />
        </div>

        <div className="form-control">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="react, hooks, jwt"
            className="form-input"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-button">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateQuestionPage;
