import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import './index.css';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('as-theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('as-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kurs/:slug" element={<CoursePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
