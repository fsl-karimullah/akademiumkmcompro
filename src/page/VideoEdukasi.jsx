import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import { endpoint } from '../endpoint/api';

const VideoEdukasi = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try { 
        const token = localStorage.getItem('userToken');
       
        const response = await fetch(endpoint.getEducation, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
 
        const data = await response.json();
        console.log(data.data);
        setVideos(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVideos();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/videoedukasidetail/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <header className="bg-[var(--themeRed)] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Video Edukasi UMKM</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-1">
              <HomeIcon />
              <span>Home</span>
            </Link>
            {/* <Link to="/videos" className="flex items-center space-x-1">
              <ListIcon />
              <span>List Video</span>
            </Link> */}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Selamat Datang di Platform Edukasi untuk UMKM</h2>
          <p className="mb-8">Pelajari berbagai strategi dan tips untuk mengembangkan bisnis Anda melalui video edukasi kami.</p>
        </section>

        {error ? (
          <section className="text-center text-red-500">
            <p>Error: {error}</p>
          </section>
        ) : (
          <section className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Video Terbaru</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.map(video => (
                <div key={video.id} className="bg-gray-100 p-4 rounded shadow cursor-pointer" onClick={() => handleCardClick(video.id)}>
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded mb-2" />
                  <h4 className="text-xl font-bold">{video.title}</h4>
                  <p className="text-gray-700">{video.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; 2024 Brand-in Indonesia. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default VideoEdukasi;
