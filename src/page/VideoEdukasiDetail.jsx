import React from 'react';
import { Link } from 'react-router-dom';

const VideoEdukasiDetail = () => {
  const videos = [
    { id: 1, title: "Cara Memulai Bisnis", thumbnail: "https://via.placeholder.com/150" },
    { id: 2, title: "Strategi Pemasaran Digital", thumbnail: "https://via.placeholder.com/150" },
    { id: 3, title: "Mengelola Keuangan UMKM", thumbnail: "https://via.placeholder.com/150" },
    // Add more dummy video data as needed
  ];

  return (
    <div className="bg-white text-gray-800">
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Daftar Video Edukasi UMKM</h1>
          <nav>
            <Link to="/" className="px-4">Home</Link>
            <Link to="/videos" className="px-4">List Video</Link>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Semua Video Edukasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map(video => (
            <div key={video.id} className="bg-gray-100 p-4 rounded shadow">
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded mb-2" />
              <h4 className="text-xl font-bold">{video.title}</h4>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          &copy; 2024 Video Edukasi UMKM. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default VideoEdukasiDetail;
