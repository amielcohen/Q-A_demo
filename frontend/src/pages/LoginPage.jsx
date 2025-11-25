import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";
import { loginApi } from "../api/apiClient";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
     const data = await loginApi(email, password);
     dispatch(setCredentials({ token: data.token, user: data.user }));
     localStorage.setItem("token", data.token);

      navigate("/"); // הולך למסך הראשי
    } catch (err) {
      setError("Login failed");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={{ width: "100%", padding: 8 }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
