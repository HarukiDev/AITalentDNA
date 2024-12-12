import React, { useState, useEffect } from "react";

const JobFitAnalysis = ({ email }) => {
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  // Dummy data for job list
  const dummyJobList = [
    { id: "1", name: "Software Engineer" },
    { id: "2", name: "Data Scientist" },
    { id: "3", name: "Product Manager" },
    { id: "4", name: "UI/UX Designer" },
  ];

  // Simulate fetching job list
  useEffect(() => {
    const fetchJobList = async () => {
      try {
        // Simulating an API response delay with a timeout
        setTimeout(() => {
          setJobList(dummyJobList);
        }, 500); // Delay in milliseconds
      } catch (err) {
        console.error("Failed to fetch job list:", err);
      }
    };

    fetchJobList();
  }, [email]);

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-lg font-semibold">Job List</h3>
      <div className="mb-4">
        <select
          className="px-4 py-2 border rounded-md"
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="">Select a Job</option>
          {jobList.map((job) => (
            <option key={job.id} value={job.id}>
              {job.name}
            </option>
          ))}
        </select>
      </div>
      {selectedJob && (
        <p className="text-gray-500">
          Selected Job: {jobList.find((job) => job.id === selectedJob)?.name}
        </p>
      )}
    </div>
  );
};

export default JobFitAnalysis;
