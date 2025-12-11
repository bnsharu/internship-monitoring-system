// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🎓 Internship Monitoring System</h2>

      <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
        {user ? (
          <>
            <span>👤 {user.name}</span>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-btn" to="/login">
              Login
            </Link>
            <Link className="nav-btn" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
