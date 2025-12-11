// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import InternshipForm from "./components/InternshipForm";
import InternshipList from "./components/InternshipList";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./components/AdminPage";
import MentorPage from "./components/MentorPage";

// Protected route
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState({
    studentName: "",
    mentorName: "",
    company: "",
    duration: "",
    status: "Pending",
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(`/api/internships?search=${search}`);
    setInternships(res.data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/internships/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("/api/internships", form);
    }

    setForm({
      studentName: "",
      mentorName: "",
      company: "",
      duration: "",
      status: "Pending",
    });

    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/internships/${id}`);
    fetchData();
  };

  const handleEdit = (record) => {
    setForm(record);
    setEditId(record._id);
  };

  const DashboardPage = () => (
    <div className="container">
      <Dashboard internships={internships} />
      <SearchBar search={search} setSearch={setSearch} />
      <InternshipForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        editId={editId}
      />
      <h2>📋 Internship Records</h2>
      <InternshipList
        internships={internships}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Footer />
    </div>
  );

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-Based Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor"
          element={
            <ProtectedRoute role="mentor">
              <MentorPage />
            </ProtectedRoute>
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
