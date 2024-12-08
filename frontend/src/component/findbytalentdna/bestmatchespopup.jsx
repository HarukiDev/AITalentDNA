import React, { useState } from "react";

const BestMatchesPopup = ({ onClose, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleSearch = () => {
    // Simulasi pencarian (Anda dapat mengganti ini dengan API call)
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleSelect = () => {
    onSelect(selectedOption);
  };

  return (
    <div style={styles.popupOverlay}>
      <div style={styles.popup}>
        <div style={styles.header}>
          <h3>Select Your Best Matches</h3>
          <span style={styles.closeIcon} onClick={onClose}>
            &times;
          </span>
        </div>
        <div style={styles.content}>
          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedOption === 5}
                onChange={() => handleCheckboxChange(5)}
              />
              5 Best Matches
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedOption === 10}
                onChange={() => handleCheckboxChange(10)}
              />
              10 Best Matches
            </label>
          </div>
        </div>
        <div style={styles.footer}>
          <button onClick={handleSelect} style={styles.popupButton}>
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  popupOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "400px",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  closeIcon: {
    fontSize: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#888",
  },
  content: {
    textAlign: "left",
  },
  checkboxContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    gap: "8px",
  },
  searchContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "8px",
  },
  searchButton: {
    padding: "8px 12px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  footer: {
    marginTop: "20px",
  },
  popupButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
  },
};

export default BestMatchesPopup;
