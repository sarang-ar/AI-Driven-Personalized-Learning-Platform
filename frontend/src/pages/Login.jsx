import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);

      res.data.role === "teacher"
        ? navigate("/teacher")
        : navigate("/student");

    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue learning</p>

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        {/* ✅ REGISTER LINK */}
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#4f46e5", fontWeight: "600" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
