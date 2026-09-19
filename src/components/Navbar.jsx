import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, PenTool, BookMarked } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1>Prinsip Perakaunan Tingkatan 4</h1>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link flex items-center ${location.pathname === '/' ? 'active' : ''}`}
        >
          <BookOpen size={18} style={{ marginRight: '8px' }}/>
          Nota Modul
        </Link>
        <Link 
          to="/kuiz" 
          className={`nav-link flex items-center ${location.pathname === '/kuiz' ? 'active' : ''}`}
        >
          <PenTool size={18} style={{ marginRight: '8px' }}/>
          Kuiz Lejar
        </Link>
        <Link 
          to="/glosari" 
          className={`nav-link flex items-center ${location.pathname === '/glosari' ? 'active' : ''}`}
        >
          <BookMarked size={18} style={{ marginRight: '8px' }}/>
          Glosari
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
