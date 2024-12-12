import React, { useState } from "react";
import axios from "axios";
import BgtextureP from "../../assets/bgtextureP.svg";

export default function InsightModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInsightData = async () => {
    // Ambil corporate_id dari Local Storage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not found. Please log in.");
      return;
    }
    const { id_corporate } = JSON.parse(storedUser);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://backend.talentdna.me/api/get_kategori_top",
        { corporate_id: id_corporate },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setInsightData(response.data);
      setIsModalOpen(true); // Buka modal setelah data diambil
    } catch (error) {
      console.error("Error fetching insight data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-2 bg-white shadow-md rounded-xl xl:h-[38%]">
      {/* Insight Section */}
      <div className="mb-4 text-xl font-semibold">
        <h1>Insight</h1>
      </div>
      <div className="text-sm">
        <p className="mb-2">
          Discover your organization’s Top 10 strengths and Bottom 5 development areas. Gain insights to support strategic decisions.
        </p>
        <div
          className="p-2 rounded-[5px]"
          style={{
            background: `url(${BgtextureP})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-white">
            Use this information to guide your people strategy and align talent with company goals.
          </p>
        </div>
        <div className="w-full mt-2 border-t-2 border-gray-300"></div>
        <div className="flex justify-end w-full gap-2 py-3">
          <button
            className="flex items-end justify-end px-2 text-sm font-medium text-blue-600 rounded-lg hover:text-gray-500"
            onClick={fetchInsightData}
            disabled={loading}
          >
            {loading ? "Loading..." : "Insight"}
          </button>
        </div>
      </div>
  
      {/* Modal */}
      {isModalOpen && insightData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-black bg-opacity-50">
          <div className="relative w-full p-6 m-6 md:m-16 lg:m-32 bg-white rounded-lg shadow-lg md:w-3/4 h-[80%] overflow-y-scroll">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsModalOpen(false)}
            >
              <img
                src="https://img.icons8.com/?size=100&id=11997&format=png&color=000000"
                alt="close"
                className="w-6 h-6"
              />
            </button>
  
            <h2 className="mb-4 text-xl font-bold">Organization Insights</h2>
            <div className="flex flex-col justify-center gap-4 lg:flex-row">
                {/* Analysis */}
                {insightData.analysis && (
                <div className="mb-4 lg:w-[80%] text-justify">
                    <h3 className="font-semibold">Analysis:</h3>
                    <p>{insightData.analysis}</p>
                </div>
                )}
                
                <div className="flex flex-col justify-center gap-4 lg:flex-row lg:w-[50%] border border-gray-300 rounded-lg mt-2 h-fit p-4">
                    {/* Top 10 Talents */}
                    {Array.isArray(insightData.average_top_10_talent) && (
                    <div className="mb-4">
                        <h3 className="font-semibold">Top 10 Talents:</h3>
                        <ul className="pl-6 list-disc">
                        {insightData.average_top_10_talent.map(([talent, score], index) => (
                            <li key={index}>
                            {talent} - {score}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
        
                    {/* Bottom 5 Talents */}
                    {Array.isArray(insightData.average_bottom_5_talent) && (
                    <div>
                        <h3 className="font-semibold">Bottom 5 Talents:</h3>
                        <ul className="pl-6 list-disc">
                        {insightData.average_bottom_5_talent.map(([talent, score], index) => (
                            <li key={index}>
                            {talent} - {score}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                </div>
                
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  
