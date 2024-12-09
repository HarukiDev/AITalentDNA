import React, { useEffect, useState } from 'react';

const fetchJobs = async () => {
  return [
    {
      id: '1',
      name: 'Dokter Umum',
      competencies: ['1', '2', '3'], // IDs of competencies
    },
    {
      id: '2',
      name: 'Medical Assistant',
      competencies: ['2', '3'],
    },
    {
      id: '3',
      name: 'Therapist',
      competencies: ['1', '3'],
    },
  ];
};

const fetchCompetencies = async () => {
  return [
    { id: '1', name: 'Medical Knowledge' },
    { id: '2', name: 'Patient Assistance' },
    { id: '3', name: 'Therapy Techniques' },
  ];
};

export function AddJobRoleModal({ isOpen, onClose, addJobRole }) {
  const [jobRoleName, setJobRoleName] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);
  const [additionalCompetencies, setAdditionalCompetencies] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [competencySuggestions, setCompetencySuggestions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const loadInitialData = async () => {
        const fetchedJobs = await fetchJobs();
        const fetchedCompetencies = await fetchCompetencies();
        setJobs(fetchedJobs);
        setCompetencies(fetchedCompetencies);
      };
      loadInitialData();
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleJobSearch = (query) => {
    const suggestions = jobs.filter((job) =>
      job.name.toLowerCase().includes(query.toLowerCase())
    );
    setJobSuggestions(suggestions);
  };

  const handleJobSelect = (job) => {
    setJobRoleName(job.name);
    setSelectedJob(job);

    const relatedCompetencies = job.competencies.map((id) =>
      competencies.find((comp) => comp.id === id)
    );
    setSelectedCompetencies(relatedCompetencies);
    setJobSuggestions([]);
  };

  const handleCompetencySearch = (query) => {
    const suggestions = competencies.filter((competency) =>
      competency.name.toLowerCase().includes(query.toLowerCase())
    );
    setCompetencySuggestions(suggestions);
  };

  const handleCompetencySelect = (competency) => {
    if (!additionalCompetencies.some((comp) => comp.id === competency.id)) {
      setAdditionalCompetencies((prev) => [...prev, competency]);
    }
    setCompetencySuggestions([]);
  };

  const handleRemoveAdditionalCompetency = (competencyId) => {
    setAdditionalCompetencies((prev) =>
      prev.filter((comp) => comp.id !== competencyId)
    );
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobRoleName || selectedCompetencies.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
  
    const newJobRole = {
      id: generateUniqueId(), // Gunakan fungsi generateUniqueId
      name: jobRoleName,
      competency: selectedCompetencies.map((comp) => comp.name),
      additionalCompetency: additionalCompetencies.map((comp) => comp.name),
    };
  
    addJobRole(newJobRole);
    onClose();
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-2xl overflow-auto max-h-[90vh] sm:p-6">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Job Role</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="jobRoleName">
              Job Role Name
            </label>
            <input
              type="text"
              id="jobRoleName"
              value={jobRoleName}
              onChange={(e) => {
                setJobRoleName(e.target.value);
                handleJobSearch(e.target.value);
              }}
              placeholder="Search Job Role"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {jobSuggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                {jobSuggestions.map((job) => (
                  <li
                    key={job.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleJobSelect(job)}
                  >
                    {job.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="">
            <label className="block mb-2 font-medium text-gray-700">Selected Competencies</label>
            <ul>
              {selectedCompetencies.map((comp) => (
                <li key={comp.id} className="p-2 bg-gray-100 rounded-md mb-1">
                  {comp.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="additionalCompetency">
              Additional Competencies
            </label>
            <input
              type="text"
              id="additionalCompetency"
              onChange={(e) => handleCompetencySearch(e.target.value)}
              placeholder="Search Additional Competency"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {competencySuggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
                {competencySuggestions.map((competency) => (
                  <li
                    key={competency.id}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleCompetencySelect(competency)}
                  >
                    {competency.name}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-2">
              {additionalCompetencies.map((comp) => (
                <li
                  key={comp.id}
                  className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-1"
                >
                  {comp.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveAdditionalCompetency(comp.id)}
                    className="px-2 py-1 text-sm text-white bg-red-500 rounded-full"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end mt-4 space-x-2 sm:space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-white bg-gray-500 rounded-full shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
            >
              Add Job Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
