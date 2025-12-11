// src/components/AssignStudent.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUI.css";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AssignStudent() {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState({ studentId: "", mentorId: "" });

  const fetch = async () => {
    try {
      const s = await api.get("/api/users?role=student");
      const m = await api.get("/api/users?role=mentor");
      setStudents(s.data);
      setMentors(m.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  const assign = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/users/${selected.studentId}/assign-mentor`, { mentorId: selected.mentorId });
      alert("Assigned");
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || "Error assigning");
    }
  };

  return (
    <div className="card admin-card">
      <h3>Assign Student to Mentor</h3>

      <form className="admin-form" onSubmit={assign}>
        <select required value={selected.studentId} onChange={(e) => setSelected(s => ({ ...s, studentId: e.target.value }))}>
          <option value="">Select student</option>
          {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
        </select>

        <select required value={selected.mentorId} onChange={(e) => setSelected(s => ({ ...s, mentorId: e.target.value }))}>
          <option value="">Select mentor</option>
          {mentors.map(m => <option key={m._id} value={m._1d}>{m.name} ({m.email})</option>)}
        </select>

        <button type="submit">Assign Mentor</button>
      </form>

      <div className="list">
        <h4>Current Assignments</h4>
        {students.map(s => (
          <div key={s._id} className="list-item">
            <div>
              <strong>{s.name}</strong>
              <div className="muted">Mentor: {s.mentor?.name || "—"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
