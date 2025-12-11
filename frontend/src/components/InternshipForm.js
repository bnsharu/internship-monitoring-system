function InternshipForm({ form, handleChange, handleSubmit, editId }) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input name="studentName" value={form.studentName} onChange={handleChange} placeholder="Student Name" required/>
      <input name="mentorName" value={form.mentorName} onChange={handleChange} placeholder="Mentor Name" required/>
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" required/>
      <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration"/>
      
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Ongoing</option>
        <option>Completed</option>
      </select>

      <button type="submit">{editId ? "Update" : "Add Internship"}</button>
    </form>
  );
}

export default InternshipForm;
