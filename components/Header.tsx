
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' || pathname.startsWith('/works');
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f5f5f4] border-b border-stone-200">
      <nav className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-baseline md:items-center gap-4">
        <Link to="/" className="group">
          <h1 className="text-2xl md:text-3xl font-bold tracking-[0.15em] text-stone-900 leading-none">
            BENN PATTARA
          </h1>
          <p className="text-[10px] md:text-[11px] tracking-[0.3em] font-medium text-stone-500 mt-2 uppercase">
            Product Manager & UX Designer
          </p>
        </Link>

        <div className="flex gap-6 md:gap-8 items-center text-[11px] font-bold tracking-[0.15em] uppercase">
          <Link
            to="/"
            className={`hover:text-stone-400 transition-colors ${isActive('/') ? 'text-stone-900 underline underline-offset-8 decoration-1' : 'text-stone-400'}`}
          >
            Works
          </Link>
          <Link
            to="/tools"
            className={`hover:text-stone-400 transition-colors ${isActive('/tools') ? 'text-stone-900 underline underline-offset-8 decoration-1' : 'text-stone-400'}`}
          >
            Tools
          </Link>
          <Link
            to="/about"
            className={`hover:text-stone-400 transition-colors ${isActive('/about') ? 'text-stone-900 underline underline-offset-8 decoration-1' : 'text-stone-400'}`}
          >
            About
          </Link>
          <a
            href="mailto:bennpattara@gmail.com"
            className="px-6 py-2 bg-stone-900 text-white rounded-none hover:bg-stone-800 transition-colors"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
