import React, { useState } from 'react';

export default function AddCandidateModal({ isOpen, onClose, addCandidate }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  if (!isOpen) return null; // Don't render if the modal is not open

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!fullName || !email || !role) {
      alert('Please fill in all fields');
      return;
    }

    // Create a new candidate object
    const newCandidate = {
      name: fullName,
      email,
      role,
    };

    // Call the addCandidate function passed as a prop to update the state in the parent component
    addCandidate(newCandidate);

    // Reset the form fields and close the modal
    setFullName('');
    setEmail('');
    setRole('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-full max-w-lg p-6 m-4 bg-white rounded-lg shadow-2xl">
        <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">Add Candidate</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="position">
                Role
              </label>
              <input
                type="text"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter position"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
