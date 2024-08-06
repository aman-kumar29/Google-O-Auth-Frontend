import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/auth/google/callback" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
);

export default AppRoutes;