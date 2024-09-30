import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJob();
  }, [id]);

  const updateJob = async (updatedJob) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedJob),
      });
      if (res.ok) {
        const job = await res.json();
        console.log("Job updated:", job);
        navigate(`/jobs/${id}`);
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Failed to update job", error);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (
      !title ||
      !type ||
      !description ||
      !companyName ||
      !contactEmail ||
      !contactPhone
    ) {
      alert("Please fill in all fields");
      return;
    }
    const updatedJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };
    updateJob(updatedJob);
  };

  const cancelEdit = () => {
    navigate(`/jobs/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="create">
      <h2>Edit Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Company Name:</label>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <button type="submit">Update Job</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
