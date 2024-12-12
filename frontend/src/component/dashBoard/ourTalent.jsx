import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function OurTalent() {
  const [user, setUser] = useState(null);
  const [corporateId, setCorporateId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah item per halaman
  const [talents, setTalents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories] = useState({
    Drive: [
      "AVERSIVE",
      "COLLECTOR",
      "COMPETITIVE",
      "CONTEMPLATIVE",
      "DIRECTIVE",
      "EQUITABLE",
      "EXPLORER",
      "GOAL-GETTER",
      "NOBLE",
      "OPTIMIZER",
      "PERFECTIONIST",
      "SELF-CONFIDENT",
      "SIGNIFICANT",
      "VIGOROUS",
      "VISIONARY",
    ],
    Network: [
      "ADVISOR",
      "AFFECTIONATE",
      "ARTICULATIVE",
      "CARING",
      "COLLABORATOR",
      "CONVINCING",
      "COURAGEOUS",
      "DEVELOPER",
      "ENERGIZER",
      "FORGIVING",
      "GENEROUS",
      "GENUINE",
      "HARMONY",
      "PERSONALIZER",
      "SOCIABLE",
    ],
    Action: [
      "ACCOUNTABLE",
      "AUTHORITATIVE",
      "CONTEXTUAL",
      "DECISIVE",
      "FIXER",
      "FLEXIBLE",
      "FOCUSED",
      "INITIATOR",
      "INNOVATIVE",
      "INTUITIVE",
      "LOGICAL",
      "RESOURCEFUL",
      "STRATEGIZER",
      "STRUCTURED",
      "TROUBLESHOOTER",
    ],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setCorporateId(parsedUser.id_corporate); // Ambil corporate_id dari local storage
    } else {
      window.location.href = "/LoginPage";
    }
  }, []);

  useEffect(() => {
    if (corporateId) {
      fetchTalents(); // Panggil API segera setelah corporateId tersedia
    }
  }, [corporateId]);

  const fetchTalents = async () => {
    setLoading(true);
    setError(null);

    const allTalents = [
      ...categories.Drive,
      ...categories.Network,
      ...categories.Action,
    ];

    const requestData = {
      talents: allTalents,
      id_corporate: corporateId,
      kategori: [], // Tidak menggunakan kategori
      type: 0, // Default type
    };

    console.log("Request Data Sent:", requestData);

    try {
      const response = await axios.post("/find/search", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response Data:", response.data);

      if (response.data && response.data.results) {
        setTalents(response.data.results);
      } else {
        setTalents([]);
        setError("No talents found.");
      }
    } catch (err) {
      console.error("Error fetching talents:", err);
      setError(err.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = talents.length > 0 ? Math.ceil(talents.length / itemsPerPage) : 1;

  const currentTalents = talents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="px-6 py-2 bg-white shadow-md rounded-xl">
        <div className="mb-4 text-xl font-semibold">
          <h1>Our Talent</h1>
        </div>
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && talents.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:h-[400px] lg:h-[400px]">
            {currentTalents.map((talent, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 text-sm leading-tight text-center lg:gap-5 lg:text-base bg-[#EDF2FF] p-2 rounded-xl"
              >
                <div className="w-10">
                  <img
                    src="https://img.icons8.com/?size=100&id=7819&format=png&color=1D4ED8" //ini sebenarnya ada image tapi ya gk ke render imagenya kosong gitu
                    alt={talent.user}
                    className="object-cover w-full h-auto border border-solid rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start justify-start w-full">
                  <h1 className="font-semibold font-sm text-start">{talent.user}</h1>
                  <p className="text-sm text-gray-500">NIP: {talent.nip || "N/A"}</p>
                  <p className="text-sm text-gray-500">Score: {talent.score.toFixed(2)}%</p>
                </div>
                <Link
                  className="flex items-center justify-center gap-1"
                  to={`/detailprofil?email=${talent.email}`}
                  state={{ name: talent.user, corporate_id: corporateId }}
                >
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/?size=100&id=123417&format=png&color=3477C9"
                    alt="search-in-list"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="w-full mt-2 border-t-2 border-gray-300"></div>
        {!loading && talents.length > 0 && (
          <div className="flex items-center justify-between w-full py-3">
            <button
              className={`px-3 py-1 text-sm font-medium rounded-lg ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:text-gray-500"
              }`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:text-gray-500"
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
