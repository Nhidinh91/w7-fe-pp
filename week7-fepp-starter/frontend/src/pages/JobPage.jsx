import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const JobPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);
        console.log("Jobs fetched:", data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJob();
  }, [id]);

  const deleteJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      console.log("Job deleted");
      alert("Job deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting job", error);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      {isAuthenticated ? (
        <>
          <Link to={`/edit-job/${id}`}>
            <button>Edit Job</button>
          </Link>
          <button onClick={deleteJob}>Delete Job</button>
        </>
      ) : null}
    </div>
  );
};

export default JobPage;
