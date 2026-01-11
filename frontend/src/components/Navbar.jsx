import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!token) return null; // hide navbar if not logged in

  return (
    <nav
      style={{
        background: "#111827",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h3 style={{ color: "white" }}>AI Learning Platform</h3>
      <button
        onClick={logout}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 14px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </nav>
  );
}
