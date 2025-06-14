import React, { useEffect, useState } from 'react';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/items`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched jobs:", data);
        setJobs(data);
      })
      .catch(err => console.error("Failed to fetch jobs:", err));
  }, []);

  return (
    <div>
      <h1>Total Jobs: {jobs.length}</h1>
      {
        jobs.map(job => (
          <div key={job._id} className="border p-4 my-2 rounded">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Job;
