import React, { useState } from 'react';

const validCompetencies = [
  "Sales Management",
  "Marketing Strategy",
  "Technical Analysis",
  "Leadership Development",
  "Medical Diagnostics",
];

// Define indicators for each category
const categoryIndicators = {
  Sales: [
    "Mampu mengidentifikasi kebutuhan pelanggan dan menawarkan solusi yang sesuai.",
    "Menyampaikan nilai produk dengan cara yang menarik dan persuasif.",
    "Menutup penjualan dengan mencapai kesepakatan yang saling menguntungkan.",
    "Membangun hubungan yang kuat dengan pelanggan.",
  ],
  Marketing: [
    "Menyusun strategi pemasaran yang efektif.",
    "Memahami tren pasar terkini.",
    "Mengelola kampanye pemasaran digital.",
    "Mengukur hasil strategi pemasaran.",
  ],
  Technical: [
    "Menguasai alat dan teknologi terbaru.",
    "Memecahkan masalah teknis secara efisien.",
    "Memberikan solusi inovatif.",
    "Mengevaluasi kinerja sistem.",
  ],
  Leadership: [
    "Menginspirasi dan memotivasi tim.",
    "Membuat keputusan strategis.",
    "Mengelola konflik dengan bijaksana.",
    "Membimbing anggota tim untuk mencapai tujuan.",
  ],
  Dokter: [
    "Mendiagnosis penyakit dengan tepat.",
    "Menyusun rencana pengobatan yang efektif.",
    "Berkomunikasi dengan pasien secara empati.",
    "Melakukan tindakan medis dengan profesionalisme.",
  ],
};

export function AddCompetencyModal({ isOpen, onClose, addCompetency }) {
  const [competencyName, setCompetencyName] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [showIndicatorModal, setShowIndicatorModal] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const newErrors = {};
    if (!competencyName.trim()) newErrors.competencyName = "Competency name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!category) newErrors.category = "Category is required.";
    if (selectedIndicators.length === 0) newErrors.indicators = "At least one indicator must be selected.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!competencyName) {
      newErrors.competencyName = "Competency Name is required.";
    } else if (!suggestions.includes(competencyName)) {
      newErrors.competencyName = "Please select a valid competency name from the suggestions.";
    }

    if (description.length < 15) {
      newErrors.description = "Competency Description must be at least 15 characters.";
    }

    if (!/^\d+$/.test(level)) {
      newErrors.level = "Level must be a numeric value.";
    }

    if (!category) {
      newErrors.category = "Category is required.";
    }

    if (selectedIndicators.length === 0) {
      newErrors.indicators = "At least one indicator must be selected.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompetencyNameChange = (value) => {
    setCompetencyName(value);
    const filtered = validCompetencies.filter((competency) =>
      competency.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setCompetencyName(suggestion);
    setShowSuggestions(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit({
        competencyName,
        description,
        category,
        level,
        selectedIndicators,
      });
    }
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
  
    const newCompetency = {
      id: generateUniqueId(), // Menambahkan ID unik
      name: competencyName,
      description,
      indicators: selectedIndicators,
      category,
      level,
    };
  
    addCompetency(newCompetency);
    resetForm();
    onClose();
  };
  

  const resetForm = () => {
    setCompetencyName('');
    setDescription('');
    setSelectedIndicators([]);
    setCategory('');
    setLevel('');
    setErrors({});
  };

  const handleIndicatorSelection = (selected) => {
    setSelectedIndicators(selected);
    setShowIndicatorModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-2xl"
        style={{
          maxHeight: "90vh", // Maksimal tinggi modal
          overflowY: "auto", // Menambahkan scroll untuk isi modal
        }}
      >
         <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Competency</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="competencyName">
              Competency Name
            </label>
            <input
              type="text"
              id="competencyName"
              value={competencyName}
              onChange={(e) => handleCompetencyNameChange(e.target.value)}
              placeholder="Enter Competency Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.competencyName && (
              <div className="text-red-500 text-sm">{errors.competencyName}</div>
            )}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="border border-gray-300 rounded-lg mt-2">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-blue-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="description">
              Competency Desc
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Competency Description"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="level">
              Level (Opsional)
            </label>
            <input
              type="text"
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Enter Competency Level"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.level && <div className="text-red-500 text-sm">{errors.level}</div>}
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700" htmlFor="category">
              Indicators Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSelectedIndicators([]);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {Object.keys(categoryIndicators).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">Indicators</label>
            <button
              type="button"
              onClick={() => setShowIndicatorModal(true)}
              className="px-5 py-2 text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
              disabled={!category}
            >
              Select
            </button>
            {selectedIndicators.length > 0 && (
              <ul className="mt-2 text-gray-700">
                {selectedIndicators.map((indicator, index) => (
                  <li key={index}>- {indicator}</li>
                ))}
              </ul>
            )}
            {errors.indicators && <div className="text-red-500 text-sm">{errors.indicators}</div>}
          </div>
    
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full shadow-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
            >
              Add Competency
            </button>
          </div>
        </form>
      </div>
      {showIndicatorModal && (
        <IndicatorModal
          availableIndicators={categoryIndicators[category] || []}
          selectedIndicators={selectedIndicators}
          onClose={() => setShowIndicatorModal(false)}
          onSelect={handleIndicatorSelection}
        />
      )}
    </div>
  );
}

function IndicatorModal({ availableIndicators, selectedIndicators, onClose, onSelect }) {
  const [localSelection, setLocalSelection] = useState(selectedIndicators);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIndicators = availableIndicators.filter((indicator) =>
    indicator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleIndicator = (indicator) => {
    if (localSelection.includes(indicator)) {
      setLocalSelection(localSelection.filter((item) => item !== indicator));
    } else {
      setLocalSelection([...localSelection, indicator]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div
        className="w-full max-w-md p-4 bg-white rounded-lg shadow-2xl sm:max-w-xl sm:p-6 overflow-y-auto"
        style={{
          maxHeight: "90vh", // Maksimal tinggi modal agar scrolling aktif di layar kecil
        }}
      >
        <h2 className="text-lg font-semibold text-gray-800 sm:text-xl">
          Select Indicators
        </h2>
        <input
          type="text"
          placeholder="Search Indicators"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base sm:p-3 mb-3"
        />
        <div
          className="space-y-2 overflow-y-auto border-t border-gray-200 pt-2"
          style={{
            maxHeight: "50vh", // Membatasi area scroll untuk daftar indikator
          }}
        >
          <ul>
            {filteredIndicators.map((indicator, index) => (
              <li key={index} className="flex items-center space-x-3 sm:space-x-4">
                <input
                  type="checkbox"
                  id={`indicator-${index}`}
                  checked={localSelection.includes(indicator)}
                  onChange={() => toggleIndicator(indicator)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 sm:w-5 sm:h-5"
                />
                <label
                  htmlFor={`indicator-${index}`}
                  className="text-sm text-gray-700 sm:text-base"
                >
                  {indicator}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-end mt-4 space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-full shadow-md hover:bg-gray-600 sm:px-5 sm:py-2 sm:text-base"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSelect(localSelection)}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 sm:px-5 sm:py-2 sm:text-base"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

}
