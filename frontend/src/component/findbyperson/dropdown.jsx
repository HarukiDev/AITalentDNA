import React, { useState } from "react";
import Select from "react-select";

const Dropdown = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const options = [
    {
      value: "John",
      name: "John Doe",
      division: "Marketing",
      email: "john.doe@example.com",
      description: "Software Engineer in Marketing Division",
    },
    {
      value: "Jane",
      name: "Jane Smith",
      division: "Product",
      email: "jane.smith@example.com",
      description: "Product Manager in Product Division",
    },
    {
      value: "Alex",
      name: "Alex Johnson",
      division: "Design",
      email: "alex.johnson@example.com",
      description: "UI/UX Designer in Design Division",
    },
  ];

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
      setErrorMessage("Please select a name or division before searching.");
    }
  };

  const handleReset = () => {
    setSelectedName(null);
    setShowDetails(false);
    setErrorMessage("");
  };

  return (
    <div style={styles.container}>
      <p style={styles.header}>
        Search by name or division to learn more about our team.
      </p>

      <Select
        options={options}
        value={selectedName}
        onChange={handleChange}
        placeholder="Select a name or division"
        isSearchable={true}
        getOptionLabel={(e) => `${e.name} - ${e.division}`}
        getOptionValue={(e) => e.value}
        formatOptionLabel={(e) => (
          <div>
            <div>
              <strong>{e.name}</strong> - {e.division}
            </div>
            <div style={{ fontSize: "0.9em", color: "#6c757d" }}>{e.email}</div>
          </div>
        )}
        styles={customSelectStyles}
      />

      <div style={styles.buttonContainer}>
        <button
          onClick={handleReset}
          style={styles.resetButton}
          onMouseEnter={(e) => (e.target.style.boxShadow = styles.hoverResetShadow)}
          onMouseLeave={(e) => (e.target.style.boxShadow = styles.normalShadow)}
        >
          Reset
        </button>
        <button
          onClick={handleSearch}
          style={{
            ...styles.searchButton,
            backgroundColor: selectedName ? "#007bff" : "#d3d3d3",
            cursor: selectedName ? "pointer" : "not-allowed",
          }}
          disabled={!selectedName}
          onMouseEnter={(e) =>
            selectedName &&
            (e.target.style.boxShadow = styles.hoverSearchShadow)
          }
          onMouseLeave={(e) => (e.target.style.boxShadow = styles.normalShadow)}
        >
          Search
        </button>
      </div>

      {errorMessage && <div style={styles.error}>{errorMessage}</div>}

      {showDetails && selectedName && (
        <div style={styles.details}>
          <h3 style={styles.detailsHeader}>{selectedName.name}</h3>
          <p>
            <strong>Division:</strong> {selectedName.division}
          </p>
          <p>
            <strong>Email:</strong> {selectedName.email}
          </p>
          <p>
            <strong>Description:</strong> {selectedName.description}
          </p>
        </div>
      )}

      {/* Tambahkan CSS Responsif */}
      <style>
        {`
          @media (max-width: 768px) {
            div {
              padding: 10px;
            }
            .react-select__control {
              width: 100% !important;
            }
            .react-select__menu {
              font-size: 14px;
            }
          }
          @media (max-width: 480px) {
            h3 {
              font-size: 18px;
            }
            p {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: { margin: "20px auto", maxWidth: "600px", textAlign: "center" },
  header: { color: "#6c757d", fontSize: "16px", fontStyle: "italic", marginBottom: "20px" },
  buttonContainer: { display: "inline-flex", gap: "10px", marginTop: "20px" },
  resetButton: {
    padding: "10px 15px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  searchButton: {
    padding: "10px 15px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  },
  hoverResetShadow: "0 0 15px rgba(244, 67, 54, 0.7)",
  hoverSearchShadow: "0 0 15px rgba(0, 123, 255, 0.7)",
  normalShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  error: { marginTop: "10px", color: "red", fontStyle: "italic" },
  details: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  detailsHeader: { color: "#007bff" },
};

const customSelectStyles = {
  control: (base) => ({
    ...base,
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    borderColor: "#007bff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    borderColor: "#ccc",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#007bff"
      : state.isFocused
      ? "#f0f0f0"
      : "#fff",
    color: state.isSelected ? "#fff" : "#000",
  }),
};

export default Dropdown;
