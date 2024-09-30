import useField from "../hooks/useField";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const title = useField("text");
  const type = useField("text");
  const description = useField("text");
  const companyName = useField("text");
  const contactEmail = useField("text");
  const contactPhone = useField("text");
  const { user } = useAuth();
  const navigate = useNavigate();

  //function to add a new job to the database
  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newJob),
      });
      if (res.ok) {
        const job = await res.json();
        console.log("New job added:", job);
        alert("Job added successfully");
        navigate("/");
      } else {
        console.error("Failed to add job");
      }
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  //handle form submission
  const submitForm = (e) => {
    e.preventDefault();
    if (
      !title.value ||
      !type.value ||
      !description.value ||
      !companyName.value ||
      !contactEmail.value ||
      !contactPhone.value
    ) {
      alert("Please fill in all fields");
      return;
    }
    const newJob = {
      title: title.value,
      type: type.value,
      description: description.value,
      company: {
        name: companyName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      },
    };
    addJob(newJob);
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input {...title} />
        <label>Job type:</label>
        <select {...type}>
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea {...description}></textarea>
        <label>Company Name:</label>
        <input {...companyName} />
        <label>Contact Email:</label>
        <input {...contactEmail} />
        <label>Contact Phone:</label>
        <input {...contactPhone} />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
