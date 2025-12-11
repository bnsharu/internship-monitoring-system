// src/components/AdminMentorManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUI.css";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AdminMentorManagement() {
  const [mentors, setMentors] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      const res = await api.get("/api/users?role=mentor");
      setMentors(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createMentor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/users", { ...form, role: "mentor" });
      setForm({ name: "", email: "", password: "" });
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    setLoading(false);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete mentor?")) return;
    await api.delete(`/api/users/${id}`);
    fetch();
  };

  return (
    <div className="card admin-card">
      <h3>Manage Mentors</h3>

      <form className="admin-form" onSubmit={createMentor}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Mentor"}</button>
      </form>

      <div className="list">
        {mentors.map(m => (
          <div key={m._id} className="list-item">
            <div>
              <strong>{m.name}</strong> <small>({m.email})</small>
            </div>
            <div>
              <button className="btn-danger" onClick={() => remove(m._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
