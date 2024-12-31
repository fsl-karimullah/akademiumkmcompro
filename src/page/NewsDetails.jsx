import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { endpoint } from "../endpoint/api";

const NewsDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [newsDetails, setNewsDetails] = useState(null);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(endpoint.getNewsDetails(id));  
        setNewsDetails(response.data.data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news details.");
        setLoading(false);
      } 
    };

    fetchNewsDetails();
  }, [id]);

  const handleBackClick = () => {
    // Fallback to '/allnews' if `location.state` is undefined
    const fallbackPath = location.state?.from === "home" ? "/" : "/allnews";
    navigate(fallbackPath);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <button
          onClick={handleBackClick} // Updated button handler with fallback
          className="text-blue-500 hover:text-blue-700 text-sm font-medium mb-4 mt-4 ml-4"
        >
          &larr; Kembali
        </button>

        {newsDetails && (
          <>
            <div className="relative">
              <img
                src={newsDetails.thumbnail}
                alt={newsDetails.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 flex items-end p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{newsDetails.title}</h1>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-4">
                {new Date(newsDetails.created_at).toLocaleDateString()}
              </p>
              <div className="border-t pt-4 mt-4 text-gray-700">
                <h2 className="text-xl font-semibold mb-2">Deskripsi Berita</h2>
                <p className="text-lg text-gray-800 leading-relaxed mb-6">{newsDetails.description}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsDetails;
