import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home";
import LoginBisnis from "./page/LoginBisnis";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  return (
    <Routes>
      <Route path="/" element={<Home currentPath={currentPath} />} />
      <Route path="/loginbisnis" element={<LoginBisnis currentPath={currentPath} />} />
    </Routes>
  );
}

export default App;
