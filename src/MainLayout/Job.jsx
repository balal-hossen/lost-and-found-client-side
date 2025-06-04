import React, { useEffect, useState } from 'react';

const Job = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched jobs:", data); // এখানে দেখো সব আসছে কিনা
        setJobs(data);
      });
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
