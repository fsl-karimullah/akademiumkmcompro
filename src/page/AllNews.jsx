// src/pages/AllNews.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { endpoint } from "../endpoint/api";

const AllNews = ({ currentPath }) => {
    const navigate = useNavigate();
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                const response = await axios.get(endpoint.getNews);
                setNewsData(response.data.data);
                setLoading(false);
            } catch (err) {
                setError("Gagal memuat data berita.");
                setLoading(false);
            }
        };

        fetchAllNews();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };

    const formatDate = (dateString) => {
        const options = {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Separate featured article and rest
    const featuredNews = newsData[0];
    const latestNews = newsData.slice(1, 5);
    const trendingNews = newsData.slice(5, 10);
    const remainingNews = newsData.slice(10);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar currentPath={currentPath} />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-[var(--themeRed)] rounded-full animate-spin"></div>
                        <p className="text-gray-500">Memuat artikel...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar currentPath={currentPath} />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-center">
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-[var(--themeRed)] text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentPath={currentPath} />

            {/* Header Section */}
            <header className="bg-[var(--themeRed)] text-white py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center">📰 Berita & Artikel</h1>
                    <p className="text-center mt-2 text-red-100 max-w-2xl mx-auto">
                        Temukan berita terbaru, tips bisnis, dan inspirasi untuk UMKM Indonesia
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">

                {/* Featured Article Section */}
                {featuredNews && (
                    <section className="mb-12">
                        <div
                            onClick={() => handleCardClick(featuredNews.id)}
                            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl"
                        >
                            <div className="relative h-[400px] md:h-[500px]">
                                <img
                                    src={featuredNews.thumbnail}
                                    alt={featuredNews.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <span className="inline-block px-4 py-1 bg-[var(--themeRed)] text-white text-sm font-medium rounded-full mb-4">
                                        Artikel Utama
                                    </span>
                                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                                        {featuredNews.title}
                                    </h2>
                                    <p className="text-gray-200 text-sm md:text-base mb-4 max-w-3xl line-clamp-2">
                                        {truncateText(featuredNews.description, 200)}
                                    </p>
                                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(featuredNews.created_at)}
                                        </span>
                                        {featuredNews.source && (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                                                </svg>
                                                {featuredNews.source}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Latest News - Main Content */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-1 h-8 bg-[var(--themeRed)] rounded-full"></span>
                                Berita Terbaru
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {latestNews.map((news) => (
                                <article
                                    key={news.id}
                                    onClick={() => handleCardClick(news.id)}
                                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={news.thumbnail}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(news.created_at)}
                                        </p>
                                        <h3 className="font-bold text-gray-800 mb-2 group-hover:text-[var(--themeRed)] transition-colors line-clamp-2">
                                            {news.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {truncateText(news.description, 100)}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Trending Headlines - Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[var(--themeRed)] rounded-full"></span>
                                Trending
                            </h2>

                            <div className="space-y-4">
                                {trendingNews.map((news, index) => (
                                    <article
                                        key={news.id}
                                        onClick={() => handleCardClick(news.id)}
                                        className="flex gap-4 cursor-pointer group pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                                    >
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={news.thumbnail}
                                                alt={news.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <span className="absolute -top-2 -left-2 w-6 h-6 bg-[var(--themeRed)] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 text-sm group-hover:text-[var(--themeRed)] transition-colors line-clamp-2 mb-1">
                                                {news.title}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {formatDate(news.created_at)}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {trendingNews.length === 0 && (
                                <p className="text-gray-500 text-sm text-center py-4">Tidak ada berita trending</p>
                            )}
                        </div>
                    </aside>
                </div>

                {/* More Articles */}
                {remainingNews.length > 0 && (
                    <section className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <span className="w-1 h-8 bg-[var(--themeRed)] rounded-full"></span>
                                Artikel Lainnya
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remainingNews.map((news) => (
                                <article
                                    key={news.id}
                                    onClick={() => handleCardClick(news.id)}
                                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={news.thumbnail}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="text-xs text-gray-500 mb-2">
                                            {formatDate(news.created_at)}
                                        </p>
                                        <h3 className="font-bold text-gray-800 text-sm group-hover:text-[var(--themeRed)] transition-colors line-clamp-2">
                                            {news.title}
                                        </h3>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {newsData.length === 0 && (
                    <div className="text-center py-16">
                        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Artikel</h3>
                        <p className="text-gray-500">Nantikan artikel menarik dari kami!</p>
                    </div>
                )}
            </main>

            {/* Footer CTA */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Butuh Informasi Lebih Lanjut?</h2>
                    <p className="text-gray-600 mb-6">Kunjungi halaman utama untuk melihat berbagai program dan layanan kami</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-[var(--themeRed)] text-white font-semibold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
                    >
                        🏠 Kembali ke Beranda
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AllNews;
