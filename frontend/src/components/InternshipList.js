import StatusBadge from "./StatusBadge";

function InternshipList({ internships, handleEdit, handleDelete }) {
  return (
    <ul>
      {internships.map((i) => (
        <li key={i._id}>
          <div>
            <b>{i.studentName}</b> - {i.company}
            <StatusBadge status={i.status} />
          </div>

          <div>Mentor: {i.mentorName}</div>
          <div>Duration: {i.duration}</div>
          <div className="time">
            {new Date(i.createdAt).toLocaleString()}
          </div>

          <button className="edit" onClick={() => handleEdit(i)}>Edit</button>
          <button className="delete" onClick={() => handleDelete(i._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default InternshipList;
