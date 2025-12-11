// src/components/AdminStudentManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUI.css";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AdminStudentManagement() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "", batch: "" });
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      const res = await api.get("/api/users?role=student");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/users", { ...form, role: "student" });
      setForm({ name: "", email: "", password: "", department: "", batch: "" });
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await api.delete(`/api/users/${id}`);
    fetch();
  };

  return (
    <div className="card admin-card">
      <h3>Manage Students</h3>

      <form className="admin-form" onSubmit={createStudent}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <input name="department" value={form.department} onChange={handleChange} placeholder="Department (id)" />
        <input name="batch" value={form.batch} onChange={handleChange} placeholder="Batch (id)" />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Student"}</button>
      </form>

      <div className="list">
        {students.map(s => (
          <div key={s._id} className="list-item">
            <div>
              <strong>{s.name}</strong> <small>({s.email})</small>
              <div className="muted">Role: {s.role} Dept: {s.department?.name || "-"} Batch: {s.batch?.name || "-"}</div>
            </div>
            <div>
              <button className="btn-danger" onClick={() => remove(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
