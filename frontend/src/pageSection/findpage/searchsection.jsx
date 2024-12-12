import React, { useState } from "react";
import Dropdown from "../../component/findbyperson/dropdown";

const FindByNamePage = () => {
  const [selectedName, setSelectedName] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState("");

  const handleSearch = () => {
    if (!selectedName) {
      alert("Please select a name.");
      return;
    }

    const details = {
      John: "John Doe is a Senior Software Engineer with 5 years of experience.",
      Jane: "Jane Smith is a Marketing Specialist with a passion for digital campaigns.",
      Alex: "Alex Johnson is a Data Scientist who loves solving complex problems.",
    };

    setEmployeeDetails(details[selectedName]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <h1 style={styles.heading}>
          <i className="fas fa-search" style={{ marginRight: "8px" }}></i>
          Search By Name
        </h1>
        <p style={styles.description}>
          <strong>Discover Talent:</strong> Select a name to view professional insights.
          <br />
          <strong>Expertise:</strong> Learn about skills and achievements.
          <br />
          <strong>Growth:</strong> Get tailored recommendations for development.
        </p>
      </div>
      <Dropdown onChange={(e) => setSelectedName(e.target.value)} />
      {employeeDetails && (
        <div style={styles.result}>
          <h2 style={styles.resultHeading}>Employee Details</h2>
          <p>{employeeDetails}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
    maxWidth: "600px",
    margin: "2rem auto",
    backgroundColor: "#FAFAFA",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
  },
  heroSection: {
    padding: "1.5rem",
    backgroundColor: "#EAF4F4",
    borderRadius: "12px",
    marginBottom: "2rem",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem", // Responsif default
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: "0.75rem",
  },
  description: {
    fontSize: "1rem",
    color: "#34495E",
    lineHeight: "1.8",
  },
  result: {
    marginTop: "1.5rem",
    padding: "1.5rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  resultHeading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: "1rem",
  },
};

// CSS untuk Media Queries
const mediaQueries = `
@media (max-width: 768px) {
  div[style] {
    max-width: 100% !important;
    margin: 1rem;
    padding: 1rem;
  }
  div[style].heroSection {
    padding: 1rem !important;
    margin-bottom: 1.5rem !important;
  }
  div[style].result {
    padding: 1rem !important;
  }
  h1[style].heading {
    font-size: 1.8rem !important;
  }
  h2[style].resultHeading {
    font-size: 1.3rem !important;
  }
  p[style].description {
    font-size: 0.9rem !important;
  }
}
@media (max-width: 480px) {
  div[style] {
    padding: 0.8rem !important;
  }
  h1[style].heading {
    font-size: 1.5rem !important;
  }
  h2[style].resultHeading {
    font-size: 1.2rem !important;
  }
}
`;

export default FindByNamePage;
