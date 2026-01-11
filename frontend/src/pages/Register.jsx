import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    interest: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      // Register
      await API.post("/auth/register", form);

      // Auto-login
      const loginRes = await API.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", loginRes.data.access_token);

      loginRes.data.role === "teacher"
        ? navigate("/teacher")
        : navigate("/student");

    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account 🚀</h2>
        <p>Start your personalized learning journey</p>

        <input
          placeholder="Full Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <select
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {form.role === "student" && (
          <input
            placeholder="Your Interests (AI, Web, ML)"
            onChange={e => setForm({ ...form, interest: e.target.value })}
          />
        )}

        <button onClick={register}>Register & Continue</button>

        {/* ✅ LOGIN LINK */}
        <p style={{ textAlign: "center", marginTop: "16px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#4f46e5", fontWeight: "600" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
