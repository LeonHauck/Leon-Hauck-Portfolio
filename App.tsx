
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';

import MatrixBackground from './components/MatrixBackground';

import { LanguageProvider, useLanguage } from './components/LanguageContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  const matrixWords = t('matrix');

  // Each page starts at the top instead of inheriting the previous page's scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <MatrixBackground words={matrixWords} />
      <Navbar />
      <main key={location.pathname} className="flex-1 pb-28 md:pb-16 md:pt-16 relative animate-fade-up">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certificates" element={<Certifications />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
