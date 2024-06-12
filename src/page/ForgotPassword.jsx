import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('https://ukm.sixeyestech.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim email');
      }

      navigate('/forgot-password-success'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Lupa Kata Sandi</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleForgotPassword}>Kirim Email</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
