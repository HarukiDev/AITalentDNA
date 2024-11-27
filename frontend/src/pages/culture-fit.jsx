import React, { useState } from 'react';

const competencies = [
    {
        title: 'Asuhan Keperawatan Holistik',
        content: (
            <div>
                Asuhan Keperawatan Holistik 
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
];

const profiles = [
    {
        name: "WAHYU ANGGORO ADI",
        imageUrl: "https://bk.unipasby.ac.id/morevej/2023/09/user-1.png",
        percentage: "61.61%",
        progressBars: [70, 50, 80, 90, 40]
    },
    {
        name: "AHMAD FAUZI",
        imageUrl: "https://bk.unipasby.ac.id/morevej/2023/09/user-1.png",
        percentage: "45.32%",
        progressBars: [40, 60, 20, 30, 60]
    },
    {
        name: "SITI FATIMAH",
        imageUrl: "https://bk.unipasby.ac.id/morevej/2023/09/user-1.png",
        percentage: "77.45%",
        progressBars: [90, 70, 60, 50, 80]
    }
];

const attributes = [
    "Berintegritas",
    "Setia",
    "Berkolaborasi",
    "Utamakan Pelanggan",
    "Inovatif"
];

const JobFit = () => {
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

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="font-sans p-5 px-12">
            <header className="flex justify-between items-center mb-12">
                {/* Logo and Navigation */}
                <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                        <img src="https://backend.talentdna.me/img/logo.png" alt="Talent Finder Logo" className="mr-2" style={{ width: '170px' }} />
                    </div>
                    <nav className="flex space-x-4">
                        <a href="/" className="text-blue-700">Home</a>
                        <a href="/employee" className="text-gray-700">Employee</a>
                        <a href="/jobrole" className="text-gray-700">Job Role</a>
                        <a href="/corevalue" className="text-gray-700">Core Value</a>
                    </nav>
                </div>
                {/* Login and Sign In Buttons */}
                <div className="flex space-x-2">
                    <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full">Login</button>
                    <button className="bg-[#536CE3] text-white px-4 py-2 rounded-full">Sign In</button>
                </div>
            </header>
                <div className="flex justify-between items-center mb-4 border-b">
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-700 py-2">Job Fit</a>
                        <a href="#" className="text-blue-500 py-2">Culture Fit</a>
                    </div>
                    <div className="py-2 text-gray-500">Home/Culture Fit</div>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-[30px] font-semibold">Culture Fit</h2>
                        <p className="mb-4">Identify employees who best fit each position.</p>
                    </div>
                    <div className="flex space-x-2">
  <div className="relative w-80">
    <select className="appearance-none p-3 border border-gray-300 rounded-lg w-full focus:outline-none ">
      <option value="" disabled selected>
        Choose a Job
      </option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <option value="option4">Option 4</option>
    </select>
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-gray-400"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
      </svg>
    </div>
  </div>
</div>

                </div>

                <div className="container mx-auto p-4 space-y-8 px-0">
            {/* Mandatory Competencies Card */}
            <div className="card bg-white shadow-md rounded-[5] p-6">
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
            <div className="card bg-white shadow-md rounded-[5] p-6">
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
                            borderRadius: '7px'
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/* Talent Analysis Card */}
            <div className="card bg-white shadow-md rounded-[5] p-6">
                <h2 className="text-2xl font-bold mb-5 text-center">Talent Analysis</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Array.from({ length: 12 }, (_, i) => (
                        <button key={i} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                            AFFECTIONATE
                        </button>
                    ))}
                </div>
            </div>

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
                <div className="w-2/3 ml-6 bg-white shadow-md rounded-[5] p-6 grid grid-cols-2 gap-4">
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
        </div>
    );
};

export default JobFit;
