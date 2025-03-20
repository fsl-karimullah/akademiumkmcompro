import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate,useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Home from './page/Home';
import LoginBisnis from './page/LoginBisnis';
import VideoEdukasi from './page/VideoEdukasi';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword';
import ForgotPasswordSuccess from './page/ForgotPasswordSuccess';
import Login from './page/Login';
import LandingPage from './page/LandingPage';
import Consulting from './page/Consulting';
import Funding from './page/Funding';
import VideoEdukasiDetail from './page/VideoEdukasiDetail';
import UnderConstructionScreen from './page/Construction';
import BantuBranding from './page/BantuBranding';
import WebinarsPage from './page/WebinarsPage';
import WebinarDetail from './page/WebinarDetail';
import ListTemplate from './page/ListTemplate';
import NewsDetails from './page/NewsDetails';
import AllNews from './page/AllNews';
import Edukasi from './page/Edukasi';
import EdukasiDetail from './page/EdukasiDetail';
import MentorPage from './page/Mentor/MentorPage';
import EdukasiDetailPay from './page/EdukasiDetailPay';

function App() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation(); 
  const currentPath = location.pathname;

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userToken') !== null;
    setIsAuthenticated(userLoggedIn);
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return null; 
  }

  return (
    <Routes>
      <Route path="/" element={<Home currentPath={currentPath} />} />
      <Route path="/webinars" element={<WebinarsPage currentPath={currentPath} />} />
      <Route path="/mentor" element={<MentorPage currentPath={currentPath} />} />
      <Route path="/news/:id" element={<NewsDetails currentPath={currentPath} />} />
      <Route path="/allnews" element={<AllNews currentPath={currentPath} />} />
      <Route path="/list-templates" element={<ListTemplate currentPath={currentPath} />} />
      <Route path="/webinars/:id" element={<WebinarDetail currentPath={currentPath} />} />
      <Route path="/bantu-branding" element={<BantuBranding currentPath={currentPath} />} />
      <Route path="/konsultasi" element={<Consulting currentPath={currentPath} />} />
      <Route path="/coming-soon" element={<UnderConstructionScreen currentPath={currentPath} />} />
      <Route path="/loginbisnis" element={<LoginBisnis currentPath={currentPath} />} />
      <Route path="/videoedukasi" element={isAuthenticated ? <VideoEdukasi currentPath={currentPath} /> : <Navigate to="/login" />} />
      <Route path="/course" element={isAuthenticated ? <Edukasi currentPath={currentPath} /> : <Navigate to="/login" />} />
      <Route path="/course-pay/:id" element={isAuthenticated ? <EdukasiDetailPay currentPath={currentPath} /> : <Navigate to="/login" />} />
      <Route path="/course/:id" element={isAuthenticated ? <EdukasiDetail currentPath={currentPath} /> : <Navigate to="/login" />} />
      <Route path="/videoedukasidetail/:id" element={isAuthenticated ? <VideoEdukasiDetail currentPath={currentPath} /> : <Navigate to="/login" />} />
      <Route path="/register" element={<Register currentPath={currentPath} />} />
      <Route path="/login" element={<Login currentPath={currentPath} />} />
      <Route path="/forgot-password" element={<ForgotPassword currentPath={currentPath} />} />
      <Route path="/forgot-password-success" element={<ForgotPasswordSuccess currentPath={currentPath} />} />
      <Route path="/landing" element={isAuthenticated ? <LandingPage  currentPath={currentPath}/> : <Navigate to="/login" />} />
      <Route path="/pendanaan" element={isAuthenticated ? <Funding currentPath={currentPath} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
