import React, { useState, useEffect } from 'react';

export function EditCandidateModal({ isOpen, onClose, candidate, updateCandidate }) {
  const [candidateName, setCandidateName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (isOpen && candidate) {
      // Set nilai default dari kandidat yang sedang diedit
      setCandidateName(candidate.name || '');
      setEmail(candidate.email || '');
      setPosition(candidate.position || '');
    }
  }, [isOpen, candidate]);

  if (!isOpen) return null; // Jangan render modal jika tidak terbuka

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!candidateName || !email || !position) {
      alert('Please fill in all fields');
      return;
    }

    // Update data kandidat
    const updatedCandidate = {
      ...candidate,
      name: candidateName,
      email,
      position,
    };

    // Panggil fungsi update dari parent component
    updateCandidate(updatedCandidate);

    // Tutup modal setelah submit
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Edit Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="position">
                Position
              </label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Enter position"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tombol Aksi */}
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
              Update Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
