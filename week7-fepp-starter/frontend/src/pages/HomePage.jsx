import JobListings from "../components/JobListings";
import { useEffect, useState } from "react";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await res.json();
        setJobs(data);
        console.log("Jobs fetched:", data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="home">
      {jobs.length !== 0 ? <JobListings jobs={jobs} /> : <p>No jobs found</p>}
    </div>
  );
};

export default Home;
