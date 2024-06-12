import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import Home from './page/Home';
import LoginBisnis from './page/LoginBisnis';
import VideoEdukasi from './page/VideoEdukasi';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword';
import ForgotPasswordSuccess from './page/ForgotPasswordSuccess';
import Login from './page/Login';

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
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    setIsAuthenticated(!!userLoggedIn);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home currentPath={currentPath} />} />
      <Route path="/loginbisnis" element={<LoginBisnis currentPath={currentPath} />} />
      <Route
        path="/videoedukasi"
        element={isAuthenticated ? <VideoEdukasi currentPath={currentPath} /> : <Navigate to="/login" />}
      />
      <Route path="/register" element={<Register currentPath={currentPath} />} />
      <Route path="/login" element={<Login currentPath={currentPath} />} />
      <Route path="/forgot-password" element={<ForgotPassword currentPath={currentPath} />} />
      <Route path="/forgot-password-success" element={<ForgotPasswordSuccess currentPath={currentPath} />} />
    </Routes>
  );
}

export default App;
