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
      className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all hover:shadow-xl h-full border border-gray-100"
    >
      <img
        className="w-full h-48 object-cover"
        src={thumbnail}
        alt={title}
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold text-[var(--themeRed)] truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 h-12 overflow-hidden truncate">
            {description}
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          {new Date(created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
