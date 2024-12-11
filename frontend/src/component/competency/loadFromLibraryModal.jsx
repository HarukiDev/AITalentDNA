import React, { useEffect, useState } from "react";

export default function LoadFromCompetencyLibraryModal({
  isOpen,
  onClose,
  loadCompetencies,
}) {
  const [competencies, setCompetencies] = useState([
    {
      id: 5,
      name: "Leadership",
      level: "Advanced",
      description: "Ability to lead teams effectively",
      indicators: [
        "Inspires team members",
        "Drives team goals",
        "Provides constructive feedback",
      ],
    },
    {
      id: 6,
      name: "Technical Expertise",
      level: "Intermediate",
      description: "In-depth knowledge in specific technical areas",
      indicators: [
        "Solves complex technical problems",
        "Mentors junior staff",
        "Maintains technical certifications",
      ],
    },
    {
      id: 7,
      name: "Creative Thinking",
      level: "Advanced",
      description: "Developing innovative solutions to problems",
      indicators: [
        "Generates novel ideas",
        "Improves processes",
        "Challenges conventional approaches",
      ],
    },
    {
      id: 8,
      name: "Communication",
      level: "Basic",
      description: "Effective verbal and written communication skills",
      indicators: [
        "Delivers clear messages",
        "Engages audience effectively",
        "Adapts communication style",
      ],
    },
    {
      id: 9,
      name: "Analytical Thinking",
      level: "Advanced",
      description: "Evaluating data to make informed decisions",
      indicators: [
        "Analyzes trends",
        "Identifies risks and opportunities",
        "Develops data-driven strategies",
      ],
    },
  ]);

  const [selectedCompetencies, setSelectedCompetencies] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedCompetencies([]);
    }
  }, [isOpen]);

  const toggleSelectCompetency = (competency) => {
    setSelectedCompetencies((prevValues) =>
      prevValues.some((item) => item.id === competency.id)
        ? prevValues.filter((item) => item.id !== competency.id)
        : [...prevValues, competency]
    );
  };

  const handleAddCompetencies = () => {
    loadCompetencies(selectedCompetencies);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-2xl">
        {/* Header */}
        <h2 className="text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
          Load from Competency Library
        </h2>

        {/* Search Input */}
        <div className="relative w-full my-4">
          <input
            type="text"
            placeholder="Search Competencies"
            className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-4 top-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm6 6h.01M16 16l3.5 3.5"
            />
          </svg>
        </div>

        {/* Competencies List */}
        <div className="overflow-y-auto max-h-80 px-4 space-y-4 border-t pt-4">
          {competencies.map((competency) => (
            <div
              key={competency.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedCompetencies.some((item) => item.id === competency.id)
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => toggleSelectCompetency(competency)}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCompetencies.some(
                    (item) => item.id === competency.id
                  )}
                  onChange={() => toggleSelectCompetency(competency)}
                  className="w-5 h-5 rounded focus:ring-blue-500"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {competency.name}
                </h3>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <strong>Level:</strong> {competency.level}
                </p>
                <p>
                  <strong>Description:</strong> {competency.description}
                </p>
                <p>
                  <strong>Indicators:</strong>
                </p>
                <ul className="pl-5 list-disc">
                  {competency.indicators.map((indicator, index) => (
                    <li key={index}>{indicator}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Competencies */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            Selected Competencies
          </h3>
          <div className="overflow-y-auto max-h-40 p-3 space-y-2 bg-gray-50 border rounded-lg">
            {selectedCompetencies.map((competency) => (
              <div key={competency.id} className="p-3 bg-gray-100 rounded-lg">
                <h4 className="font-medium text-gray-800">{competency.name}</h4>
                <p className="text-sm text-gray-600">
                  {competency.description}
                </p>
              </div>
            ))}
            {selectedCompetencies.length === 0 && (
              <p className="text-sm text-gray-500">No competencies selected.</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full shadow-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAddCompetencies}
            className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedCompetencies.length === 0}
          >
            Add Competencies
          </button>
        </div>
      </div>
    </div>
  );
}
