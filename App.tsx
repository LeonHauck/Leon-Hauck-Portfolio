
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';

import MatrixBackground from './components/MatrixBackground';

import { LanguageProvider, useLanguage } from './components/LanguageContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const matrixWords = t('matrix');

  return (
    <div className="flex flex-col min-h-screen relative">
      <MatrixBackground words={matrixWords} />
      <main className="flex-1 pb-24 relative">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/certificates" element={<Certifications />} />
        </Routes>
      </main>
      <BottomNav />
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
