import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FindByNamePage from "../pageSection/findpage/searchsection";
import FindByTalentDNAPage from "../pageSection/findpage/TalentDNASection";
import NavbarDashboard from "../pageSection/navBarDashboard";

const FindPage = () => {
  const [activeSection, setActiveSection] = useState("findByName");
  const [showScrollTop, setShowScrollTop] = useState(false); // State untuk tombol scroll to top
  const navigate = useNavigate();

  // Pantau posisi scroll untuk menampilkan/menyembunyikan tombol scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fungsi untuk menggulir halaman ke atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSection = () => {
    switch (activeSection) {
      case "findByName":
        return <FindByNamePage />;
      case "findByTalentDNA":
        return <FindByTalentDNAPage />;
      default:
        return <FindByNamePage />;
    }
  };

  return (
    <div>
      <NavbarDashboard />

      <div className="px-[12%] h-full py-32">
        <button
          onClick={() => navigate("/dashboard")}
          style={styles.backButton}
        >
          ←
        </button>

        <div style={styles.container}>
          <div style={styles.navbar}>
            <button
              onClick={() => setActiveSection("findByName")}
              style={{
                ...styles.navButton,
                ...(activeSection === "findByName" ? styles.activeButton : {}),
              }}
            >
              Find By Name
            </button>
            <button
              onClick={() => setActiveSection("findByTalentDNA")}
              style={{
                ...styles.navButton,
                ...(activeSection === "findByTalentDNA"
                  ? styles.activeButton
                  : {}),
              }}
            >
              Find By TalentDNA
            </button>
          </div>

          <div>{renderSection()}</div>
        </div>

        {/* Tombol Scroll to Top */}
        {showScrollTop && (
          <button onClick={scrollToTop} style={styles.scrollTopButton}>
            ⬆️
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    borderRadius: "8px",
    margin: "2rem auto",
    maxWidth: "800px",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  navButton: {
    padding: "10px 20px",
    border: "1px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    marginRight: "0.5rem",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  activeButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  backButton: {
    marginBottom: "1rem",
    padding: "10px 15px",
    backgroundColor: "#f1f1f1",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "inline-block",
  },
  scrollTopButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    padding: "10px 15px",
    fontSize: "20px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
};

export default FindPage;
