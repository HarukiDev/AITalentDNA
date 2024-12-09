import React, { useEffect, useState } from "react";

export function EditJobRoleModal({
  isOpen,
  onClose,
  jobRole,
  updateJobRole,
}) {
  const competencies = [
    "Adaptability",
    "Analytical Thinking",
    "Collaboration",
    "Communication",
    "Creativity",
    "Critical Thinking",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Time Management",
  ];

  const [jobRoleName, setJobRoleName] = useState("");
  const [selectedCompetencies, setSelectedCompetencies] = useState([]);
  const [additionalCompetencies, setAdditionalCompetencies] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [newAdditionalCompetency, setNewAdditionalCompetency] = useState("");

  useEffect(() => {
    if (isOpen && jobRole) {
      setJobRoleName(jobRole.name || "");
      setSelectedCompetencies(jobRole.competency || []);
      setAdditionalCompetencies(jobRole.additionalCompetency || []);
    }
  }, [isOpen, jobRole]);

  useEffect(() => {
    if (newAdditionalCompetency) {
      setFilteredSuggestions(
        competencies.filter(
          (item) =>
            item.toLowerCase().includes(newAdditionalCompetency.toLowerCase()) &&
            !additionalCompetencies.includes(item)
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [newAdditionalCompetency, competencies, additionalCompetencies]);

  if (!isOpen) return null;

  const handleSuggestionClick = (suggestion) => {
    setAdditionalCompetencies([...additionalCompetencies, suggestion]);
    setNewAdditionalCompetency("");
    setFilteredSuggestions([]);
  };

  const handleRemoveAdditionalCompetency = (index) => {
    setAdditionalCompetencies(
      additionalCompetencies.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJobRole = {
      ...jobRole,
      name: jobRoleName,
      competency: selectedCompetencies,
      additionalCompetency: additionalCompetencies,
    };

    updateJobRole(updatedJobRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Edit Job Role
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Job Role Name
            </label>
            <input
              type="text"
              value={jobRoleName}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Additional Competencies
            </label>
            <div className="space-y-2">
              {additionalCompetencies.map((competency, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border border-gray-300 rounded"
                >
                  <span>{competency}</span>
                  <button
                    type="button"
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleRemoveAdditionalCompetency(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Add Additional Competency
            </label>
            <div className="relative">
              <input
                type="text"
                value={newAdditionalCompetency}
                onChange={(e) => setNewAdditionalCompetency(e.target.value)}
                placeholder="Type to search..."
                className="w-full p-2 border border-gray-300 rounded"
              />
              {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Update Job Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
