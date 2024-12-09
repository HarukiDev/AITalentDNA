import React, { useEffect, useState } from 'react';

export function EditCompetencyModal({ isOpen, onClose, competency, updateCompetency }) {
  const [formState, setFormState] = useState({
    competencyName: '',
    description: '',
    level: '',
    category: '',
    selectedIndicators: [],
  });
  const [errors, setErrors] = useState({});

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
  };

  // Saat modal dibuka, isi field dengan data competency
  useEffect(() => {
    if (isOpen && competency) {
      setFormState({
        competencyName: competency.name || '',
        description: competency.description || '', // Ambil data dari tabel (atau default string kosong)
        level: competency.level || '',
        category: competency.category || '',
        selectedIndicators: competency.indicators || [],
      });
    }
  }, [isOpen, competency]);

  const validateForm = () => {
    const newErrors = {};
    if (!formState.competencyName.trim()) newErrors.competencyName = "Competency name is required.";
    if (!formState.description.trim()) newErrors.description = "Description is required.";
    if (!formState.category) newErrors.category = "Category is required.";
    if (formState.selectedIndicators.length === 0) newErrors.indicators = "At least one indicator must be selected.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedCompetency = {
      ...competency,
      name: formState.competencyName,
      description: formState.description,
      level: formState.level,
      category: formState.category,
      indicators: formState.selectedIndicators,
    };

    updateCompetency(updatedCompetency);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (indicator, isChecked) => {
    setFormState((prev) => ({
      ...prev,
      selectedIndicators: isChecked
        ? [...prev.selectedIndicators, indicator]
        : prev.selectedIndicators.filter((i) => i !== indicator),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      {/* Container untuk modal dengan efek scrolling */}
      <div className="relative w-full max-h-screen overflow-y-auto max-w-3xl">
        <div className="p-6 bg-white rounded-lg shadow-2xl">
          <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Edit Competency</h2>
          <form onSubmit={handleSubmit}>
            {/* Competency Name */}
            <div className="mb-4">
  <label className="block mb-2 font-medium text-gray-700" htmlFor="competencyName">Competency Name</label>
  <input
    type="text"
    id="competencyName"
    value={formState.competencyName}
    readOnly
    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  {errors.competencyName && <div className="text-red-500 text-sm">{errors.competencyName}</div>}
</div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="description">Competency Description</label>
              <textarea
                id="description"
                value={formState.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter Competency Description"
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>

            {/* Level */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="level">Level (Opsional) </label>
              <input
                type="text"
                id="level"
                value={formState.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                placeholder="Enter Competency Level"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.level && <div className="text-red-500 text-sm">{errors.level}</div>}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700" htmlFor="category">Indicators Category</label>
              <select
                id="category"
                value={formState.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
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

            {/* Indicators */}
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700">Indicators</label>
              <ul className="mt-2 text-gray-700">
                {formState.category && categoryIndicators[formState.category]?.map((indicator, index) => (
                  <li key={index}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formState.selectedIndicators.includes(indicator)}
                        onChange={(e) => handleCheckboxChange(indicator, e.target.checked)}
                      />
                      <span>{indicator}</span>
                    </label>
                  </li>
                ))}
              </ul>
              {errors.indicators && <div className="text-red-500 text-sm">{errors.indicators}</div>}
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
                type="submit"
                className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600"
              >
                Update Competency
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
