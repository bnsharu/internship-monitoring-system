// src/components/AdminPage.js
import React from "react";
import AdminStudentManagement from "./AdminStudentManagement";
import AdminMentorManagement from "./AdminMentorManagement";
import AssignStudent from "./AssignStudent";
import DepartmentBatchManagement from "./DepartmentBatchManagement";
import "./AdminUI.css";

export default function AdminPage() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>Admin Panel</h3>
        <nav>
          <a href="#students">Students</a>
          <a href="#mentors">Mentors</a>
          <a href="#assign">Assign Mentor</a>
          <a href="#deptbatch">Departments & Batches</a>
        </nav>
      </aside>

      <main className="admin-main">
        <section id="students">
          <AdminStudentManagement />
        </section>

        <section id="mentors">
          <AdminMentorManagement />
        </section>

        <section id="assign">
          <AssignStudent />
        </section>

        <section id="deptbatch">
          <DepartmentBatchManagement />
        </section>
      </main>
    </div>
  );
}
