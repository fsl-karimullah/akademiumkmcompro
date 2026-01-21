import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../endpoint/api";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
    courses: [],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(endpoint.getProfile, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, email, avatar, courses } = res.data.data;
        setUser({ name, email, avatar, courses: courses || [] });
        setFormData({ name, email });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleMenuClick = (menu) => {
    if (menu === "changePassword") navigate("/forgot-password");
    else if (menu === "logout") {
      localStorage.removeItem("userToken");
      navigate("/login");
    }
    else setSelectedMenu(menu);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("userToken");
      await axios.patch(endpoint.updateProfile, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(prev => ({ ...prev, ...formData }));
      alert("Profil berhasil diperbarui!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Gagal memperbarui profil!");
    } finally {
      setSaving(false);
    }
  };

  const menuItems = [
    {
      id: "dashboard", label: "Dashboard", icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: "profile", label: "Profil Saya", icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: "courses", label: "Kursus Saya", icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "changePassword", label: "Ganti Password", icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: "logout", label: "Keluar", icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Halo, {user.name?.split(" ")[0]} 👋
        </h2>
        <p className="text-gray-500 mt-1">
          Selamat datang di halaman profil Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Kursus Aktif</p>
              <p className="text-3xl font-bold mt-1">{user.courses?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Kursus Selesai</p>
              <p className="text-3xl font-bold mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Sertifikat</p>
              <p className="text-3xl font-bold mt-1">0</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Aksi Cepat</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedMenu("courses")}
            className="px-4 py-2 bg-[var(--themeRed)] text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Lihat Kursus
          </button>
          <button
            onClick={() => navigate("/course")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Jelajahi Kursus
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Profil Saya</h2>
        <p className="text-gray-500 mt-1">Kelola informasi profil Anda</p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--themeRed)] to-red-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--themeRed)] focus:border-transparent transition-all outline-none"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--themeRed)] focus:border-transparent transition-all outline-none"
            placeholder="Masukkan email"
          />
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="px-6 py-3 bg-[var(--themeRed)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Simpan Perubahan
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Kursus Saya</h2>
        <p className="text-gray-500 mt-1">Kelola dan pantau progres pembelajaran Anda</p>
      </div>

      {/* Course Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTabValue(0)}
          className={`px-4 py-3 font-medium transition-colors relative ${tabValue === 0
              ? "text-[var(--themeRed)]"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Kursus Aktif
          {tabValue === 0 && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--themeRed)]"></span>
          )}
        </button>
        <button
          onClick={() => setTabValue(1)}
          className={`px-4 py-3 font-medium transition-colors relative ${tabValue === 1
              ? "text-[var(--themeRed)]"
              : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Kursus Selesai
          {tabValue === 1 && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--themeRed)]"></span>
          )}
        </button>
      </div>

      {tabValue === 0 ? (
        user.courses?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Kursus</h3>
            <p className="text-gray-500 mb-4">Anda belum mengikuti kursus apapun</p>
            <button
              onClick={() => navigate("/course")}
              className="px-6 py-2 bg-[var(--themeRed)] text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Jelajahi Kursus
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Aktif
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[var(--themeRed)] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {course.mentor}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {course.description?.replace(/<[^>]+>/g, "")}
                </p>
                <button
                  onClick={() => navigate(`/course-pay/${course.id}`)}
                  className="w-full py-2 bg-[var(--themeRed)] text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                >
                  Lanjutkan Belajar
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Kursus Selesai</h3>
          <p className="text-gray-500">Kursus yang telah selesai akan muncul di sini</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return renderDashboard();
      case "profile":
        return renderProfile();
      case "courses":
        return renderCourses();
      default:
        return renderDashboard();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-[var(--themeRed)] rounded-full animate-spin"></div>
            <p className="text-gray-500">Memuat profil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[var(--themeRed)] to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>

          <div className="flex flex-col md:flex-row items-center gap-6">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-white/80 mt-1">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Menu</h3>
              </div>
              <nav className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${selectedMenu === item.id
                        ? "bg-[var(--themeRed)] text-white"
                        : item.id === "logout"
                          ? "text-red-500 hover:bg-red-50"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
