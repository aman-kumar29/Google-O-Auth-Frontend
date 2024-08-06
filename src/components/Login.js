import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const redirectUri = 'http://localhost:3000/auth/google/callback';

  const handleGoogleLogin = async () => {
    try {
      const response = await api.get('/auth/login/google', {
        params: { redirect_uri: redirectUri },
      });
      window.location.href = response.data.authorization_url;
    } catch (error) {
      console.error('Error during Google login initiation:', error);
    }
  };

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await api.get('/auth/auth/google', {
            params: { code, redirect_uri: redirectUri },
          });
          console.log(response.data);
          localStorage.setItem('access_token', response.data.data.access_token);
          localStorage.setItem('user_email', jwtDecode(response.data.data.access_token).email);
          navigate('/profile');
        } catch (error) {
          console.error('Error during Google authentication:', error);
        }
      }
    };

    handleGoogleAuth();
  }, [navigate, redirectUri]);

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Signup/Login with Google</button>
    </div>
  );
};

export default Login;
