import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DashboardUI.css";

export default function MentorPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [internships, setInternships] = useState([]);

  // Fetch all records for mentor
  const fetchData = async () => {
    try {
      const api = axios.create();

      const filtered = res.data.filter(
        (i) => i.mentorName.toLowerCase() === user.name.toLowerCase()
      );
      setInternships(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>🧑‍🏫 Mentor Dashboard</h2>
      <p className="welcome">Welcome, {user.name}!</p>

      <div className="grid">

        <div className="card">
          <h3>👨‍🎓 Assigned Students</h3>
          {internships.length === 0 ? (
            <p>No assigned students.</p>
          ) : (
            internships.map((item) => (
              <div key={item._id} className="mentor-student-box">
                <p><strong>Student:</strong> {item.studentName}</p>
                <p><strong>Company:</strong> {item.company}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </div>
            ))
          )}
        </div>

        <div className="card highlight">
          <h3>📈 Internship Summary</h3>
          <p>Total Assigned: {internships.length}</p>
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
