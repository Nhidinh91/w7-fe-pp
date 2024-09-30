import JobListing from "./JobListing";

const JobListings = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing key={job.id} {...job} />
      ))}
    </div>
  );
};

export default JobListings;
