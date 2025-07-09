import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import LandingPage from './pages/LandingPage';
import LoginRegisterForm from './components/LoginRegisterForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRegisterForm />} />
        <Route path="/register" element={<LoginRegisterForm />} />
      </Routes>
    </div>
  );
};

export default App;