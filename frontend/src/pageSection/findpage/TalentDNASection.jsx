import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TalentDNASection = () => {
  const [selectedCategories, setSelectedCategories] = useState({
    Drive: [],
    Network: [],
    Action: [],
  });
  const [categories, setCategories] = useState({
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
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(""); // Untuk validasi kategori
  const [categoriesFromDB, setCategoriesFromDB] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [corporateId, setCorporateId] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCorporateId(parsedUser.id_corporate);
    } else {
      window.location.href = "/LoginPage";
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/find/categories");
        if (response.data && response.data.categories) {
          setCategoriesFromDB(response.data.categories);
        } else {
          setCategoriesFromDB([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoriesFromDB([]);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (category, value) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const handleReset = () => {
    setSelectedCategories({ Drive: [], Network: [], Action: [] });
    setSelectedCategory("");
    setSearchResults([]);
    setLimit(10);
    setError(null);
    setValidationError(""); // Reset error
  };

  const handleSearch = async () => {
    const allSelected = [
      ...selectedCategories.Drive,
      ...selectedCategories.Network,
      ...selectedCategories.Action,
    ];

    if (allSelected.length === 0) {
      setValidationError("You must select at least one characteristics.");
      return;
    }

    if (!corporateId) {
      setError("Corporate ID not found.");
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError(""); // Clear validation error

    const requestData = {
      talents: allSelected,
      id_corporate: corporateId,
      kategori: selectedCategory ? [selectedCategory] : [],
      type: 0,
      limit: limit,
    };

    console.log("Request Data Sent:", requestData);

    try {
      const response = await axios.post("/find/search", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data && response.data.results) {
        setSearchResults(response.data.results);
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300); // Scroll ke hasil setelah data diterima
      } else {
        setSearchResults([]);
        setError("No results found.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-center">Find by Talent DNA</h2>
      <p className="mb-6 text-center text-gray-600">
        Discover your unique talents and capabilities by selecting characteristics.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Object.entries(categories).map(([categoryName, items]) => (
          <div key={categoryName} className="p-4 rounded-lg shadow bg-gray-50">
            <h3 className="text-lg font-semibold text-center">{categoryName.toUpperCase()}</h3>
            <div className="mt-4">
              {items.map((item) => (
                <label key={item} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={item}
                    onChange={() => handleCheckboxChange(categoryName, item)}
                    className="mr-2 text-blue-600"
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <select
        id="category"
        className="w-full p-2 mt-4 border border-gray-300 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category (Optional)</option>
        {categoriesFromDB.length > 0 ? (
          categoriesFromDB.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option value="">No categories available</option>
        )}
      </select>
      <div className="flex flex-col items-center justify-center gap-4 mt-6 md:flex-row">
        <select
          id="limit"
          className="p-2 border border-gray-300 rounded w-"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={1}>1 Result</option>
          <option value={5}>5 Results</option>
          <option value={10}>10 Results</option>
        </select>
        <div className="flex items-center justify-center w-full gap-2">
          <button
            onClick={handleSearch}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center p-2 border border-black rounded-full"
          >
            <img 
              src="https://img.icons8.com/?size=100&id=59872&format=png&color=#1D4ED8" 
              alt="clear history" 
              className="w-6 h-5"
            />
          </button>
        </div>
        
      </div>
      {validationError && (
        <p className="mt-2 text-center text-red-500">{validationError}</p>
      )}
      <div ref={resultRef} className="mt-8">
        {loading && <p className="text-center text-blue-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((result, index) => (
              <Link
                key={index}
                to={`/detailprofil?email=${result.email}`}
                state={{ name: result.user, corporate_id: corporateId }}
                className="p-4 bg-gray-100 border rounded-lg hover:bg-blue-50"
              >
                <div>
                  <p className="text-sm text-gray-700 truncate">NIP: {result.nip}</p>
                  <h4 className="text-lg font-semibold truncate">{result.user}</h4>
                  <p className="text-sm text-gray-500 truncate">Score: {result.score.toFixed(2)}%</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TalentDNASection;
