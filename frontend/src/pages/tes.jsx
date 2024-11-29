import React from 'react'
import { useMediaQuery } from "@uidotdev/usehooks";

export default function navbar() {
  const isLargeScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div>
        <h1>hallo tes</h1>
    </div>
  );
}


// Mandatory Competencies
import React, { useState } from 'react';

const competencies = [
  {
    title: 'Asuhan Keperawatan Holistik',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
          <li>Memastikan asuhan keperawatan mencakup dukungan emosional.</li>
          <li>Mengintegrasikan dukungan keluarga dan komunitas dalam perawatan pasien.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Kemampuan Komunikasi Efektif',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Kepatuhan terhadap Protokol dan Prosedur Medis',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Manajemen Waktu dan Prioritas',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Kemampuan Pemecahan Masalah Klinis',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
];

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mandatory Competencies</h1>
      {competencies.map((competency, index) => (
        <div key={index} className="competency mb-2">
          <div
            className="title bg-blue-500 text-white p-2 rounded cursor-pointer flex justify-between items-center hover:bg-blue-700"
            onClick={() => handleToggle(index)}
          >
            <span>{competency.title}</span>
            <span>
              {activeIndex === index ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              )}
            </span>
          </div>
          {activeIndex === index && <div className="content bg-gray-100 p-2 rounded mt-2">{competency.content}</div>}
        </div>
      ))}
    </div>
  );
};

export default App;




// full nya cuma yg terakhir belom
import React, { useState } from 'react';

const competencies = [
  {
    title: 'Asuhan Keperawatan Holistik',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
          <li>Memastikan asuhan keperawatan mencakup dukungan emosional.</li>
          <li>Mengintegrasikan dukungan keluarga dan komunitas dalam perawatan pasien.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Kemampuan Komunikasi Efektif',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Kepatuhan terhadap Protokol dan Prosedur Medis',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Manajemen Waktu dan Prioritas',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
  {
    title: 'Kemampuan Pemecahan Masalah Klinis',
    content: (
      <div>
        Memberikan perawatan yang mencakup aspek fisik, emosional, dan sosial pasien.
        <ol className="list-decimal ml-6 mt-2">
          <li>Menilai kebutuhan pasien secara menyeluruh untuk merencanakan intervensi yang sesuai.</li>
        </ol>
      </div>
    ),
  },
];

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Mandatory Competencies Card */}
      <div className="card bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Mandatory Competencies</h1>
        {competencies.map((competency, index) => (
          <div key={index} className="competency mb-2">
            <div
              className="title bg-blue-500 text-white p-2 rounded cursor-pointer flex justify-between items-center hover:bg-blue-700"
              onClick={() => handleToggle(index)}
            >
              <span>{competency.title}</span>
              <span>
                {activeIndex === index ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                )}
              </span>
            </div>
            {activeIndex === index && <div className="content bg-gray-100 p-2 rounded mt-2">{competency.content}</div>}
          </div>
        ))}
      </div>

      {/* Additional Competencies Card */}
      <div className="card bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-2 text-center">Additional Competencies</h2>
        <p className="mb-4 text-left w-full">Categorize employees by their division or business unit for efficient talent management.</p>
        <div className="flex justify-center mb-4 w-full">
          <select className="border p-2 rounded w-full">
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
            className="bg-blue-500 text-white p-2 w-full max-w-xs md:max-w-sm hover:bg-blue-700"
            style={{ 
              background: 'linear-gradient(90deg, #1678E6 0%, #0C3C87 100%)',
              borderRadius: '30px'
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Talent Analysis Card */}
      <div className="card bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-5 text-center">Talent Analysis</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 20 }, (_, i) => (
            <button key={i} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              AFFECTIONATE
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;



// card pofil & progres
import React, { useState } from 'react';

const profiles = [
  {
    name: "WAHYU ANGGORO ADI",
    imageUrl: "https://bk.unipasby.ac.id/morevej/2023/09/user-1.png",
    percentage: "61.61%",
    progressBars: [70, 50, 80, 90, 40, 60, 30, 50, 80, 70]
  },
  {
    name: "AHMAD FAUZI",
    imageUrl: "https://bk.unipasby.ac.id/morevej/2023/09/user-1.png",
    percentage: "45.32%",
    progressBars: [40, 60, 20, 30, 60, 80, 50, 40, 20, 60]
  },
  {
    name: "SITI FATIMAH",
    imageUrl: "https://bk.unipasby.ac.id/morevej/2023/09/user-1.png",
    percentage: "77.45%",
    progressBars: [90, 70, 60, 50, 80, 40, 30, 70, 90, 17]
  }
];

const attributes = [
  "Asuhan Keperawatan",
  "Kepatuhan Terhadap",
  "Kemampuan Pemecahan",
  "Empati",
  "Penilaian Klinis",
  "Kemampuan Komunikasi",
  "Manajemen Waktu",
  "Pendidikan",
  "Kerjasama Tim",
  "Etika"
];

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + profiles.length) % profiles.length);
  };

  const handleReset = () => {
    setActiveIndex(0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-start">
        {/* Card Profile */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full flex flex-col items-center bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  <div className="w-24 h-24 bg-gray-400 rounded-full mb-4">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="text-3xl font-bold mb-2">{profile.percentage}</div>
                  <div className="text-xl mb-4">{profile.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              &lt; Prev
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Next &gt;
            </button>
          </div>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reset
          </button>
        </div>

        {/* Card Progress Bar */}
        <div className="w-2/3 ml-6 bg-white shadow-md rounded-lg p-6 grid grid-cols-2 gap-4">
          {attributes.map((attribute, index) => (
            <div key={index} className="mb-4">
              <div className="mb-1">{attribute}</div>
              <div className="w-full bg-gray-200 rounded-full h-5 relative">
                <div
                  className="bg-blue-500 h-5 rounded-full text-white text-xs flex items-center justify-center"
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
  );
};

export default App;





