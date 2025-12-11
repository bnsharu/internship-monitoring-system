import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardUI.css";

export default function StudentPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [internships, setInternships] = useState([]);

  // Fetch all records that belong to this student
  const fetchInternships = async () => {
    try {
     const api = axios.create();

      const filtered = res.data.filter(
        (i) => i.studentName.toLowerCase() === user.name.toLowerCase()
      );
      setInternships(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>👨‍🎓 Student Dashboard</h2>
      <p className="welcome">Welcome, {user.name}!</p>

      <div className="grid">
        
        <div className="card">
          <h3>📄 Your Internship Records</h3>
          {internships.length === 0 ? (
            <p>No internship records found.</p>
          ) : (
            <ul>
              {internships.map((item) => (
                <li key={item._id}>
                  <strong>{item.company}</strong> — {item.duration} <br />
                  Status: <span className="status">{item.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card highlight">
          <h3>📊 Progress Overview</h3>
          <p>Total Internships: {internships.length}</p>
          <p>
            Completed:{" "}
            {internships.filter((i) => i.status === "Completed").length}
          </p>
          <p>
            Ongoing:{" "}
            {internships.filter((i) => i.status === "Ongoing").length}
          </p>
        </div>

      </div>
    </div>
  );
}
