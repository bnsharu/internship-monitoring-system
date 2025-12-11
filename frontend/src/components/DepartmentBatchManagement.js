// src/components/DepartmentBatchManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminUI.css";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function DepartmentBatchManagement() {
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [dForm, setDForm] = useState({ name: "", description: "" });
  const [bForm, setBForm] = useState({ name: "", year: "", description: "" });

  const fetch = async () => {
    try {
      const d = await api.get("/api/departments");
      const b = await api.get("/api/batches");
      setDepartments(d.data);
      setBatches(b.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  const createDept = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/departments", dForm);
      setDForm({ name: "", description: "" });
      fetch();
    } catch (err) { alert(err.response?.data?.message || "Error"); }
  };

  const createBatch = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/batches", bForm);
      setBForm({ name: "", year: "", description: "" });
      fetch();
    } catch (err) { alert(err.response?.data?.message || "Error"); }
  };

  const delDept = async (id) => {
    if (!window.confirm("Delete dept?")) return;
    await api.delete(`/api/departments/${id}`);
    fetch();
  };

  const delBatch = async (id) => {
    if (!window.confirm("Delete batch?")) return;
    await api.delete(`/api/batches/${id}`);
    fetch();
  };

  return (
    <div className="card admin-card">
      <h3>Departments</h3>
      <form className="admin-form" onSubmit={createDept}>
        <input placeholder="Dept name" value={dForm.name} onChange={(e) => setDForm({ ...dForm, name: e.target.value })} required />
        <input placeholder="Description" value={dForm.description} onChange={(e) => setDForm({ ...dForm, description: e.target.value })} />
        <button type="submit">Create Department</button>
      </form>

      <div className="list">
        {departments.map(d => (
          <div key={d._id} className="list-item">
            <div>{d.name}<div className="muted">{d.description}</div></div>
            <div><button className="btn-danger" onClick={() => delDept(d._id)}>Delete</button></div>
          </div>
        ))}
      </div>

      <hr />

      <h3>Batches</h3>
      <form className="admin-form" onSubmit={createBatch}>
        <input placeholder="Batch name (eg 2024-2025)" value={bForm.name} onChange={(e) => setBForm({ ...bForm, name: e.target.value })} required />
        <input placeholder="Year" value={bForm.year} onChange={(e) => setBForm({ ...bForm, year: e.target.value })} />
        <input placeholder="Description" value={bForm.description} onChange={(e) => setBForm({ ...bForm, description: e.target.value })} />
        <button type="submit">Create Batch</button>
      </form>

      <div className="list">
        {batches.map(b => (
          <div key={b._id} className="list-item">
            <div>{b.name}<div className="muted">{b.year} — {b.description}</div></div>
            <div><button className="btn-danger" onClick={() => delBatch(b._id)}>Delete</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
