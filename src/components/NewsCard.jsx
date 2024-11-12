
import React from "react";
import { useNavigate } from "react-router-dom";

const NewsCard = ({ id, title, thumbnail, description, created_at }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${id}`);
  };

  return (
    <div 
      onClick={handleClick} 
      className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col cursor-pointer hover:shadow-2xl transition-shadow"
    >
      <img className="w-full h-48 object-cover" src={thumbnail} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-2 truncate">{description}</p>
        <p className="text-xs text-gray-500 mt-4">{new Date(created_at).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default NewsCard;
