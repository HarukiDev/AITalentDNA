import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, Link  } from "react-router-dom";
import BackgroundImage from '../assets/PAGE_04_CHART.png';
import CenterImage from '../assets/blank_profile.png';
import JobFitAnalysis from "../component/JobFitAnalysis";

export default function DetailProfil() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("additional"); // additional, career, dev, talent, scoring
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scoring, setScoring] = useState([]); // Data for Scoring Tab
  const [loadingScoring, setLoadingScoring] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null); // Reference for displaying generated image

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const { name: Name, corporate_id: corporateId } = location.state || {};

  // Fetch compatibility data
  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        setError("Email not provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/api/check_compatibility", {
          name: Name,
          email: email,
          corporate_id: corporateId,
        });

        if (response.data) {
          setData(response.data);
        } else {
          setError("Data not found");
        }
      } catch (err) {
        setError("Failed to fetch details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, Name, corporateId]);

  // Fetch scoring data
  useEffect(() => {
    const fetchScoring = async () => {
      if (activeTab === "scoring") {
        setLoadingScoring(true);

        try {
          const response = await axios.post("/jobRec/job_recommendation", {
            email,
            id_corporate: corporateId,
            max_n: 5,
          });

          if (response.data && response.data.recommendation) {
            setScoring(response.data.recommendation);
          } else {
            setScoring([]);
          }
        } catch (err) {
          console.error("Failed to fetch scoring data:", err);
          setScoring([]);
        } finally {
          setLoadingScoring(false);
        }
      }
    };

    fetchScoring();
  }, [activeTab, email, corporateId]);

  // Draw canvas for talent chart
  useEffect(() => {
    if (!data) return; // Ensure `data` is available

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const backgroundImage = new Image();
    backgroundImage.src = BackgroundImage; // Gunakan gambar lokal

    const centerImage = new Image();
    centerImage.src = CenterImage; // Gunakan gambar lokal

    let imagesLoaded = 0;

    // Color mapping function
    const colors = (text) => {
      const colorMap = {
        CARING: "E87C00",
        GENUINE: "E87C00",
        COMPETITIVE: "7C7DFF",
        ACCOUNTABLE: "DD3E3A",
        RESOURCEFUL: "DD3E3A",
        STRUCTURED: "DD3E3A",
        DIRECTIVE: "7C7DFF",
        EXPLORER: "7C7DFF",
        FLEXIBLE: "DD3E3A",
        PERSONALIZER: "E87C00",
        STRATEGIZER: "DD3E3A",
        GOAL_GETTER: "7C7DFF",
        FIXER: "DD3E3A",
        INITIATOR: "DD3E3A",
        ENERGIZER: "E87C00",
        SOCIABLE: "E87C00",
        INTUITIVE: "DD3E3A",
        COLLABORATOR: "E87C00",
        AVERSIVE: "7C7DFF",
        FOCUSED: "DD3E3A",
        DEVELOPER: "E87C00",
        CONTEMPLATIVE: "7C7DFF",
        LOGICAL: "DD3E3A",
        ARTICULATIVE: "E87C00",
        CONTEXTUAL: "DD3E3A",
        COLLECTOR: "7C7DFF",
        SELF_CONFIDENT: "7C7DFF",
        INNOVATIVE: "DD3E3A",
        EQUITABLE: "7C7DFF",
        VISIONARY: "7C7DFF",
        SIGNIFICANT: "7C7DFF",
        OPTIMIZER: "7C7DFF",
        HARMONY: "E87C00",
        CONVINCING: "E87C00",
        VIGOROUS: "7C7DFF",
        AFFECTIONATE: "E87C00",
        ADVISOR: "E87C00",
        GENEROUS: "E87C00",
        TROUBLESHOOTER: "DD3E3A",
        COURAGEOUS: "E87C00",
        DECISIVE: "DD3E3A",
        PERFECTIONIST: "7C7DFF",
        FORGIVING: "E87C00",
        AUTHORITATIVE: "DD3E3A",
      };
      for (const keyword in colorMap) {
        if (text?.toUpperCase().includes(keyword)) {
            return `#${colorMap[keyword]}`;
        }
    }
    return "#000000"; // Default ke warna hitam
};

const drawCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas sebelum menggambar ulang

    // Gambar latar belakang
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    // Gambar lingkaran tengah
    ctx.beginPath();
    ctx.arc(600, 400, 130, 0, Math.PI * 2, false);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#d9d9d9";
    ctx.stroke();

    // Klip dan gambar gambar tengah
    ctx.save();
    ctx.beginPath();
    ctx.arc(600, 400, 100, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(centerImage, 500, 300, 200, 200);
    ctx.restore();

    // Data dari API untuk menggambar teks talenta
    const talents = [
        { text: `1. ${data.top_talents[0]}`, x: 365, y: 120, color: colors(data.top_talents[0]) },
        { text: `2. ${data.top_talents[1]}`, x: 230, y: 180, color: colors(data.top_talents[1]) },
        { text: `3. ${data.top_talents[2]}`, x: 180, y: 240, color: colors(data.top_talents[2]) },
        { text: `4. ${data.top_talents[3]}`, x: 150, y: 305, color: colors(data.top_talents[3]) },
        { text: `5. ${data.top_talents[4]}`, x: 120, y: 370, color: colors(data.top_talents[4]) },
        { text: `6. ${data.top_talents[5]}`, x: 120, y: 435, color: colors(data.top_talents[5]) },
        { text: `7. ${data.top_talents[6]}`, x: 140, y: 500, color: colors(data.top_talents[6]) },
        { text: `8. ${data.top_talents[7]}`, x: 180, y: 580, color: colors(data.top_talents[7]) },
        { text: `9. ${data.top_talents[8]}`, x: 230, y: 645, color: colors(data.top_talents[8]) },
        { text: `10. ${data.top_talents[9]}`, x: 370, y: 710, color: colors(data.top_talents[9]) },
    ];

    const bottomTalents = [
        { text: `41. ${data.bottom_talents[0]}`, x: 850, y: 275, color: colors(data.bottom_talents[0]) },
        { text: `42. ${data.bottom_talents[1]}`, x: 885, y: 340, color: colors(data.bottom_talents[1]) },
        { text: `43. ${data.bottom_talents[2]}`, x: 900, y: 405, color: colors(data.bottom_talents[2]) },
        { text: `44. ${data.bottom_talents[3]}`, x: 885, y: 470, color: colors(data.bottom_talents[3]) },
        { text: `45. ${data.bottom_talents[4]}`, x: 840, y: 535, color: colors(data.bottom_talents[4]) },
    ];

    // Gambar teks untuk talenta
    ctx.font = "bold 18px Arial";
    talents.forEach((talent) => {
        ctx.fillStyle = talent.color;
        ctx.fillText(talent.text, talent.x, talent.y);
    });

    bottomTalents.forEach((talent) => {
        ctx.fillStyle = talent.color;
        ctx.fillText(talent.text, talent.x, talent.y);
    });

    // Ekspor canvas sebagai gambar
    const imageUrl = canvas.toDataURL("image/png");
    imageRef.current.src = imageUrl;
};

const imageLoadedHandler = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        drawCanvas();
    }
};

backgroundImage.onload = imageLoadedHandler;
centerImage.onload = imageLoadedHandler;

return () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas saat komponen unmount
};
}, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    name,
    email: userEmail,
    corporate_id,
    "Additional Recommendations": additionalRec,
    "Career Advice": careerAdvice,
    "Development Suggestions": devSuggestions,
    "Talent Analysis": talentAnalysis,
    top_talents,
    bottom_talents
  } = data;

  return (
    <div className="relative px-[12%] h-full py-32 text-justify bg-gray-50">
      {/* Tombol Back */}
      <Link
        to="/dashboard"
        className="absolute flex items-center text-gray-700 top-10 left-10 hover:text-blue-700"
      >
        <img
          src="https://img.icons8.com/?size=100&id=40217&format=png&color=1D4ED8"
          alt="Back"
          className="w-6 h-6 mr-2"
        />
        <span className="font-semibold">Back</span>
      </Link>
      
      <div className="max-w-5xl p-6 mx-auto text-justify bg-white shadow-md rounded-xl">
        {/* User Info */}
        <div className="flex flex-col w-full mb-2 lg:items-end md:mb-6 md:justify-center text-start lg:flex-row">
          <div className="w-full">
            {/* Canvas untuk menggambar */}
            <canvas
              id="talentsCanvas"
              ref={canvasRef}
              width={1200}
              height={800}
              crossOrigin="anonymous"
              style={{ display: "none" }}
            ></canvas>

            {/* Gambar yang dihasilkan */}
            <img
              id="image_report"
              ref={imageRef}
              alt="Generated Chart"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
          <div className="items-end p-4">
            <h1 className="mb-4 text-2xl font-bold">{name}</h1>
            <p className="mb-6 text-gray-700"><span className="font-semibold">Email:</span> {userEmail}</p>
          </div>
        </div>
        

        {/* Tabs Navigation */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex gap-4 overflow-x-scroll md:overflow-auto">
            <button
              className={`pb-2 ${activeTab === 'additional' ? 'border-b-2 border-blue-700 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Recommendations
            </button>
            <button
              className={`pb-2 ${activeTab === 'career' ? 'border-b-2 border-blue-700 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('career')}
            >
              Career Advice
            </button>
            <button
              className={`pb-2 ${activeTab === 'dev' ? 'border-b-2 border-blue-700 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('dev')}
            >
              Development Suggestions
            </button>
            <button
              className={`pb-2 ${activeTab === 'talent' ? 'border-b-2 border-blue-700 text-blue-700' : 'text-gray-600'}`}
              onClick={() => setActiveTab('talent')}
            >
              Talent Analysis
            </button>
            <button
              className={`pb-2 ${activeTab === "scoring" ? "border-b-2 border-blue-700 text-blue-700" : "text-gray-600"}`}
              onClick={() => setActiveTab("scoring")}
            >
              Scoring
            </button>
          </nav>
        </div>

        {/* Tabs Content */}
        {activeTab === 'additional' && (
          <div className="text-justify">
            <h2 className="text-lg font-semibold">Additional Recommendations</h2>
            {additionalRec ? (
              additionalRec.split("\n").map((line, index) => (
                <p key={index} className="mb-2 text-gray-800">
                  {line.includes("**") ? (
                    <strong>{line.replace(/\*\*/g, "")}</strong>
                  ) : (
                    line
                  )}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No additional recommendations available.</p>
            )}
          </div>
        )}

        {activeTab === 'career' && (
          <div className="text-justify">
            <h2 className="text-lg font-semibold">Career Advice</h2>
            {careerAdvice ? (
              careerAdvice.split("\n").map((line, index) => (
                <p key={index} className="mb-2 text-gray-800">
                  {line.includes("**") ? (
                    <strong>{line.replace(/\*\*/g, "")}</strong>
                  ) : (
                    line
                  )}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No career advice available.</p>
            )}
          </div>
        )}

        {activeTab === 'dev' && (
          <div className="text-justify">
            <h2 className="text-lg font-semibold">Development Suggestions</h2>
            {devSuggestions ? (
              devSuggestions.split("\n").map((line, index) => (
                <p key={index} className="mb-2 text-gray-800">
                  {line.includes("**") ? (
                    <strong>{line.replace(/\*\*/g, "")}</strong>
                  ) : (
                    line
                  )}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No development suggestions available.</p>
            )}
          </div>
        )}

        {activeTab === 'talent' && (
          <div className="text-justify">
            <h2 className="text-lg font-semibold">Talent Analysis</h2>
            {talentAnalysis ? (
              talentAnalysis.split("\n").map((line, index) => (
                <p key={index} className="mb-2 text-gray-800">
                  {line.includes("**") ? (
                    <strong>{line.replace(/\*\*/g, "")}</strong>
                  ) : (
                    line
                  )}
                </p>
              ))
            ) : (
              <p className="text-gray-500">No talent analysis available.</p>
            )}
            <div className="mt-4">
              <h2 className="mb-2 text-lg font-semibold text-blue-700">Top Talents</h2>
              <ul className="text-gray-800 list-disc list-inside">
                {top_talents && top_talents.map((talent, index) => (
                  <li key={index}>{talent}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="mb-2 text-lg font-semibold text-blue-700">Bottom Talents</h2>
              <ul className="text-gray-800 list-disc list-inside">
                {bottom_talents && bottom_talents.map((talent, index) => (
                  <li key={index}>{talent}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === "scoring" && (
          <div className="text-justify">
            <h2 className="mb-4 text-lg font-semibold">Recommendation</h2>
            {loadingScoring ? (
              <p className="text-gray-500">Loading Scoring...</p>
            ) : scoring.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {scoring.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 text-center text-blue-700 border border-blue-700 rounded-lg shadow-md"
                  >
                    <h3 className="text-base font-medium">{item.job}</h3>
                    <p className="mt-2 text-sm ">
                      Score: <span className="font-semibold">{item.score.toFixed(2)}%</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No scoring data available.</p>
            )}
            {/* Job Fit Analysis */}
            <JobFitAnalysis email={email} />
          </div>
        )}
      </div>
    </div>
  );
}
