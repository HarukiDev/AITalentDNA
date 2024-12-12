import React, { useState } from 'react';

const competencies = [
  {
    title: 'Innovation',
    content: (
      <div>
        <ol className="mt-2 ml-6 list-decimal">
          <li>Cepat menyesuaikan diri menghadapi perubahan</li>
          <li>Terus berinovasi dan mengembangkan kreativitas</li>
          <li>Bertindak proaktif</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Agility',
    content: (
      <div>
        <ol className="mt-2 ml-6 list-decimal">
          <li>Meningkatkan kompetensi diri untuk menjawab tantangan yang selalu berubah</li>
          <li>Terus-menerus melakukan perbaikan mengikuti perkembangan teknologi</li>
          <li>Meningkatkan kompetensi diri untuk menjawab tantangan yang selalu berubah</li>
          <li>Cepat menyesuaikan diri menghadapi perubahan</li>
          <li>Melakukan perbaikan tiada henti</li>
          <li>Terus berinovasi dan mengembangkan kreativitas</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Collaboration',
    content: (
      <div>
        <ol className="mt-2 ml-6 list-decimal">
          <li>Memberi kesempatan kepada berbagai pihak untuk berkontribusi</li>
          <li>Terbuka dalam bekerja sama untuk menghasilkan nilai tambah</li>
          <li>Menggerakkan pemanfaatan berbagai sumber daya untuk tujuan bersama</li>
        </ol>
      </div>
    ),
  },
];

const profiles = [
  {
    name: 'RETONO KUSUMORNI',
    imageUrl: 'https://bk.unipasby.ac.id/morevej/2023/09/user-1.png',
    percentage: '61.61%',
    progressBars: [70, 50, 80, 90, 40],
  },
  {
    name: 'HARIYADI',
    imageUrl: 'https://bk.unipasby.ac.id/morevej/2023/09/user-1.png',
    percentage: '45.32%',
    progressBars: [40, 60, 20, 30, 60],
  },
  {
    name: 'BAYU HANATASENA',
    imageUrl: 'https://bk.unipasby.ac.id/morevej/2023/09/user-1.png',
    percentage: '77.45%',
    progressBars: [90, 70, 60, 50, 87],
  },
];

const attributes = [
  'Innovation',
  'Collaoration',
  'Agility',
  'Resilience',
  'Ethics',
];

export default function Jobfit() {
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Default to the first profile
  const [showProfiles, setShowProfiles] = useState(false);

  const options = [
    'I CARE',
    '5 VALUES ESQ',
    '4K',
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close dropdown after selecting
  };

  const handleSubmit = () => {
    setShowProfiles(true); // Show profiles and progress bars when Submit is clicked
  };

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
};

  return (
    <div id="jobfit">
      <div className="flex flex-col items-center justify-between mb-5 md:flex-row">
        <div>
          <h2 className="text-[30px] font-semibold">Culture Fit</h2>
          <p className="mb-4">Identify employees who share your companys core values.</p>
        </div>
        <div className="flex space-x-2">
          {/* Dropdown Search */}
          <div className="relative w-80">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full p-3 text-left transition-colors border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedOption || 'Select a Position'}
              <svg
                className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-40">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Competencies Card */}
      <div className="p-6 mb-6 bg-white rounded-lg shadow-md card">
        <h1 className="mb-4 text-2xl font-bold text-center">Mandatory Competencies</h1>
        {selectedOption ? (
          competencies.map((competency, index) => (
            <div key={index} className="mb-4 competency">
              <div
                className="flex items-center justify-between p-3 text-white bg-blue-500 rounded cursor-pointer title hover:bg-blue-700"
                onClick={() => handleToggle(index)}
              >
                <span>{competency.title}</span>
                <span>
                  {activeIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                    </svg>
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <div className="p-4 mt-2 bg-gray-100 rounded content">
                  {competency.content}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Please select a position to view the competencies.</p>
        )}
      </div>

      {/* Additional Competencies Card */}
      {selectedOption && (
        <div className="p-6 bg-white rounded-lg shadow-md card">
          <h2 className="mb-2 text-2xl font-bold text-center">Additional Competencies</h2>
          <p className="w-full mb-4 text-left">Categorize employees by their division or business unit for efficient talent management.</p>
          <div className="flex justify-center w-full mb-4">
            <select className="w-full p-2 border rounded">
              <option value="" disabled selected>
                Select Category (optional)
              </option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-full max-w-xs p-2 text-white bg-blue-500 md:max-w-sm hover:bg-blue-700"
              style={{
                background: 'linear-gradient(90deg, #1678E6 0%, #0C3C87 100%)',
                borderRadius: '7px',
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Display Profiles and Progress Bars */}
{showProfiles && (
  <div className="flex flex-col items-center mt-6">
    {/* Talent Analysis Card */}
    <div className="w-full p-6 mb-6 bg-white rounded-lg shadow-md card">
      <h2 className="mb-5 text-2xl font-bold text-center">Talent Analysis</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {Array.from({ length: 20 }, (_, i) => (
          <button key={i} className="p-2 text-white bg-blue-500 rounded hover:bg-blue-700">
            AFFECTIONATE
          </button>
        ))}
      </div>
    </div>

    {/* Profile and Progress Bar Section */}
    <div className="flex flex-col w-full space-x-4 md:flex-row">
      {/* Profile Card */}
      <div className="flex flex-col items-center w-full md:w-1/3">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full flex flex-col items-center bg-white shadow-md rounded-lg p-4 mb-4 ${index === activeIndex ? 'block' : 'hidden'}`}
          >
            <div className="w-24 h-24 mb-4 bg-gray-400 rounded-full">
              <img
                src={profile.imageUrl}
                alt={profile.name}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="mb-2 text-3xl font-bold">{profile.percentage}</div>
            <div className="mb-4 text-xl">{profile.name}</div>
          </div>
        ))}
        <div className="flex mt-4 space-x-4">
          <button
            onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length)}
            className="px-4 py-2 transition bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            &lt; Prev
          </button>
          <button
            onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % profiles.length)}
            className="px-4 py-2 transition bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Next &gt;
          </button>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-2/3">
        <div className="grid grid-cols-2 gap-4">
          {attributes.map((attribute, index) => (
            <div key={index} className="mb-4">
              <div className="mb-1">{attribute}</div>
              <div className="relative w-full h-5 bg-gray-200 rounded-full">
                <div
                  className="flex items-center justify-center h-5 text-xs text-white bg-blue-500 rounded-full"
                  style={{
                    width: `${profiles[activeIndex].progressBars[index]}%`,
                  }}
                >
                  {profiles[activeIndex].progressBars[index]}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
