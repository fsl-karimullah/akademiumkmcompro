import React, { useState } from 'react';
import { Mail, Lock } from '@mui/icons-material';
import { connect } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Login = ({ loginSuccess, loginFailure }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://ukm.sixeyestech.com/api/auth/login', {
        email,
        password
      });

      // Assuming your response contains a token
      const { token } = response.data;
      
      setSuccess(true);
      loginSuccess(token);
      navigate('/videoedukasi');
    } catch (error) {
      setError(error.message);
      loginFailure(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Masuk</h2>
        <div className="mb-6">
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="h-6 w-6 text-gray-400 absolute top-3 left-3" />
          </div>
        </div>
        <div className="mb-6">
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="h-6 w-6 text-gray-400 absolute top-3 left-3" />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
          onClick={handleLogin}
        >
          Masuk
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">Login berhasil!</p>}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginSuccess,
  loginFailure,
};

export default connect(null, mapDispatchToProps)(Login);
