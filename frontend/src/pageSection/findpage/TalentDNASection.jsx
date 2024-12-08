import React, { useState } from "react";
import BestMatchesPopup from "../../component/findbytalentdna/bestmatchespopup"; // Import the BestMatchesPopup

const TalentDNASection = () => {
  const [selectedDrive, setSelectedDrive] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [selectedAction, setSelectedAction] = useState([]);
  const [isButtonPressed, setIsButtonPressed] = useState({ search: false, reset: false, bestMatches: false });
  const [showPopup, setShowPopup] = useState(false);
  const [bestMatches, setBestMatches] = useState(null);

  const handleCheckboxChange = (category, value) => {
    const updateSelected = (selected) =>
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

    if (category === "Drive") setSelectedDrive(updateSelected(selectedDrive));
    if (category === "Network") setSelectedNetwork(updateSelected(selectedNetwork));
    if (category === "Action") setSelectedAction(updateSelected(selectedAction));
  };

  const handleReset = () => {
    setSelectedDrive([]);
    setSelectedNetwork([]);
    setSelectedAction([]);
  };

  const handleButtonClick = (button) => {
    setIsButtonPressed((prev) => ({ ...prev, [button]: true }));
    setTimeout(() => {
      setIsButtonPressed((prev) => ({ ...prev, [button]: false }));
    }, 200);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSelectBestMatches = (matches) => {
    setBestMatches(matches);
    setShowPopup(false);
  };

  const categories = {
    Drive: [
      "Aversive",
      "Collector",
      "Competitive",
      "Contemplative",
      "Directive",
      "Equitable",
      "Explorer",
      "Goal-Getter",
      "Noble",
      "Optimizer",
      "Perfectionist",
      "Self-Confident",
      "Significant",
      "Vigorous",
      "Visionary",
    ],
    Network: [
      "Advisor",
      "Affectionate",
      "Articulative",
      "Caring",
      "Collaborator",
      "Convincing",
      "Courageous",
      "Developer",
      "Energizer",
      "Forgiving",
      "Generous",
      "Genuine",
      "Harmony",
      "Personalizer",
      "Sociable",
    ],
    Action: [
      "Accountable",
      "Authoritative",
      "Contextual",
      "Decisive",
      "Fixer",
      "Flexible",
      "Focused",
      "Initiator",
      "Innovative",
      "Intuitive",
      "Logical",
      "Resourceful",
      "Strategizer",
      "Structured",
      "Troubleshooter",
    ],
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Find by Talent DNA</h2>
      <p style={styles.description}>
        Discover your unique talents and capabilities by selecting characteristics from three main categories:{" "}
        <b>Drive</b>, <b>Network</b>, and <b>Action</b>. Use these filters to tailor the search results according to your preferences.
      </p>
      <div style={styles.categoryContainer}>
        {Object.entries(categories).map(([categoryName, items]) => (
          <div key={categoryName} style={styles.category}>
            <h3 style={{ ...styles.categoryTitle, backgroundColor: styles[categoryName].color }}>
              {categoryName.toUpperCase()}
            </h3>
            <div style={styles.checkboxContainer}>
              {items.map((item) => (
                <label key={item} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={
                      categoryName === "Drive"
                        ? selectedDrive.includes(item)
                        : categoryName === "Network"
                        ? selectedNetwork.includes(item)
                        : selectedAction.includes(item)
                    }
                    onChange={() => handleCheckboxChange(categoryName, item)}
                    style={styles.checkbox}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={() => {
            handleReset();
            handleButtonClick("reset");
          }}
          style={{
            ...styles.resetButton,
            ...(isButtonPressed.reset ? styles.buttonGlowRed : {}),
          }}
        >
          Reset
        </button>
        <button
          onClick={() => handleButtonClick("search")}
          style={{
            ...styles.searchButton,
            ...(isButtonPressed.search ? styles.buttonGlowBlue : {}),
          }}
        >
          Search
        </button>
        <button
          onClick={handleShowPopup}
          style={{
            ...styles.bestMatchesButton,
            ...(isButtonPressed.bestMatches ? styles.buttonGlowGreen : {}),
          }}
        >
          Show Your Best Matches
        </button>
      </div>

      {showPopup && (
        <BestMatchesPopup
          onClose={handleClosePopup}
          onSelect={handleSelectBestMatches}
        />
      )}

      {bestMatches && <div style={styles.bestMatchesDisplay}>Your Best Matches: {bestMatches} Matches</div>}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "900px",
    margin: "auto",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    fontFamily: "'Roboto', sans-serif",
  },
  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  description: {
    textAlign: "center",
    fontSize: "16px",
    color: "#666",
    marginBottom: "25px",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "20px",
  },
  category: {
    flex: "1 1 calc(33.333% - 20px)",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  categoryTitle: {
    color: "#fff",
    textAlign: "center",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#444",
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "8px",
    transform: "scale(1.2)",
    accentColor: "#007bff", // Warna biru untuk checkbox
  },
  buttonContainer: {
    marginTop: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  resetButton: {
    backgroundColor: "#ff3b30",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  searchButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  bestMatchesButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  },
  bestMatchesDisplay: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "16px",
    color: "#444",
    fontStyle: "italic",
  },
  buttonGlowRed: {
    boxShadow: "0 0 20px rgba(255, 59, 48, 0.8)",
  },
  buttonGlowBlue: {
    boxShadow: "0 0 20px rgba(0, 123, 255, 0.8)",
  },
  buttonGlowGreen: {
    boxShadow: "0 0 20px rgba(40, 167, 69, 0.8)",
  },
  Drive: { color: "#1f00b8" },
  Network: { color: "#ffc107" },
  Action: { color: "#28a745" },
};

export default TalentDNASection;
