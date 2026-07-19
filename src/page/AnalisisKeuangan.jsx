import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Assuming Footer exists
import { useNavigate } from "react-router-dom";

const AnalisisKeuangan = ({ currentPath }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Silakan pilih file terlebih dahulu (CSV/PDF).");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("userToken");
      const apiUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${apiUrl}/api/analyze-finance`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal melakukan analisis data.");
      }

      setResult(data.data.analysis);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan pada sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar currentPath={currentPath} />
      
      <main style={{ minHeight: "80vh", padding: "40px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#1a1a2e", marginBottom: 16 }}>
              Analisis Keuangan Pintar <span style={{ color: "#d61355" }}>dengan AI</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: 1.6 }}>
              Unggah laporan keuangan Anda dari POS (Point of Sales) seperti Moka, POSe, dll. Sistem AI kami akan menganalisis total kas, rekonsiliasi, dan memberikan ringkasan performa bisnis Anda secara otomatis.
            </p>
          </div>

          {/* Upload Section */}
          <div style={{
            background: "white", padding: 32, borderRadius: 24,
            boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #f3f4f6",
            marginBottom: 32
          }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 20, color: "#1a1a2e" }}>
              Mulai Analisis
            </h2>
            
            <div style={{
              border: "2px dashed #d1d5db", borderRadius: 16, padding: 40,
              textAlign: "center", background: "#f9fafb", cursor: "pointer",
              transition: "all 0.3s"
            }}>
              <input
                type="file"
                accept=".csv, .pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload" style={{ cursor: "pointer", display: "block" }}>
                <div style={{ fontSize: "3rem", marginBottom: 12 }}>📁</div>
                <div style={{ fontWeight: 600, color: "#374151", marginBottom: 8, fontSize: "1.1rem" }}>
                  {file ? file.name : "Klik untuk unggah Laporan (CSV / PDF)"}
                </div>
                <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                  Maksimal ukuran file: 5MB
                </div>
              </label>
            </div>

            {error && (
              <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: "#fef2f2", color: "#dc2626", fontSize: "0.95rem" }}>
                ⚠️ {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={loading || !file}
              style={{
                marginTop: 24, width: "100%", padding: 16, borderRadius: 12,
                background: loading || !file ? "#e5e7eb" : "linear-gradient(135deg, #d61355, #ff6b6b)",
                color: loading || !file ? "#9ca3af" : "white",
                fontWeight: 700, fontSize: "1.1rem", border: "none",
                cursor: loading || !file ? "not-allowed" : "pointer",
                boxShadow: loading || !file ? "none" : "0 4px 12px rgba(214,19,85,0.25)",
                transition: "all 0.2s"
              }}
            >
              {loading ? "AI Sedang Menganalisis... ⏳" : "Analisis Sekarang 🚀"}
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div style={{
              background: "#fff0f4", padding: 32, borderRadius: 24,
              border: "1px solid #fee2e2", animation: "navFadeIn 0.5s ease"
            }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 16, color: "#d61355" }}>
                📊 Hasil Analisis AI
              </h2>
              <div style={{ 
                color: "#374151", 
                lineHeight: 1.8, 
                fontSize: "1.05rem",
                whiteSpace: "pre-wrap",
                background: "white",
                padding: 24,
                borderRadius: 16,
                border: "1px solid #f3f4f6"
              }}>
                {result}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default AnalisisKeuangan;
