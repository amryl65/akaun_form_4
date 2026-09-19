import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotaModul from './pages/NotaModul';
import KuizLejar from './pages/KuizLejar';
import Glosari from './pages/Glosari';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<NotaModul />} />
          <Route path="/kuiz" element={<KuizLejar />} />
          <Route path="/glosari" element={<Glosari />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
