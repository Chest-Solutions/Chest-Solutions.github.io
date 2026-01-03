import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import Docs from './pages/Docs';
import Team from './pages/Team';
import NotFound from './pages/NotFound';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

const App = () => {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen selection:bg-blue-500/30">
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;