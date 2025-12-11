function Dashboard({ internships }) {
  const total = internships.length;
  const completed = internships.filter(i => i.status === "Completed").length;
  const ongoing = internships.filter(i => i.status === "Ongoing").length;

  return (
    <div className="dashboard">
      <div className="card">Total: {total}</div>
      <div className="card">Ongoing: {ongoing}</div>
      <div className="card">Completed: {completed}</div>
    </div>
  );
}

export default Dashboard;
