import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import axios from "axios";

const Dropdown = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [corporateId, setCorporateId] = useState(null);

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
      fetchOptions(); // Panggil API segera setelah corporateId tersedia
    }
  }, [corporateId]);

  const fetchOptions = async () => {
    setLoading(true);

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

      if (response.data && response.data.results) {
        const formattedOptions = response.data.results.map((item) => ({
          value: item.nip,
          name: item.user,
          email: item.email,
          nip: item.nip,
        }));
        setOptions(formattedOptions);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedName(selectedOption);
    setShowDetails(false);
    setErrorMessage("");
  };

  const handleSearch = () => {
    if (selectedName) {
      setShowDetails(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Please select a name or NIP before searching.");
    }
  };

  const handleReset = () => {
    setSelectedName(null);
    setShowDetails(false);
    setErrorMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <p className="text-sm italic text-center text-gray-600">
        Search by name or NIP to learn more about our team.
      </p>

      {loading && <p className="text-center text-blue-500">Loading options...</p>}

      {!loading && (
        <Select
          options={options}
          value={selectedName}
          onChange={handleChange}
          placeholder="Select a name or NIP"
          isSearchable
          getOptionLabel={(e) => `${e.name} - ${e.nip}`}
          getOptionValue={(e) => e.value}
          formatOptionLabel={(e) => (
            <div>
              <div className="font-medium">
                {e.name} - <span className="text-gray-500">{e.nip}</span>
              </div>
              <div className="text-xs text-gray-400">{e.email}</div>
            </div>
          )}
          className="w-full border border-gray-300 rounded-lg shadow-sm"
        />
      )}

      <div className="flex justify-between gap-4">
        <button
          onClick={handleReset}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none"
        >
          Reset
        </button>
        <button
          onClick={handleSearch}
          className={`flex items-center justify-center px-4 py-2 text-white text-sm font-medium rounded-lg shadow ${
            selectedName ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!selectedName}
        >
          Search
        </button>
      </div>

      {errorMessage && <div className="text-sm text-center text-red-500">{errorMessage}</div>}

      {showDetails && selectedName && (
        <div className="p-4 mt-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-500">{selectedName.name}</h3>
          <p>
            <span className="font-medium">NIP:</span> {selectedName.nip}
          </p>
          <p>
            <span className="font-medium">Email:</span> {selectedName.email}
          </p>
          <div className="mt-4">
            <Link
              to={`/detailprofil?email=${selectedName.email}`}
              state={{ name: selectedName.name }}
              className="text-sm text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
