import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '01.', name: 'Home' },
    { path: '/projects', label: '02.', name: 'Projects' },
    { path: '/contact', label: '03.', name: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
    }`}>
      <nav className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#64ffda]">
          S.
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-mono text-sm hover:text-[#64ffda] transition-colors ${
                location.pathname === item.path ? 'text-[#64ffda]' : 'text-gray-300'
              }`}
            >
              <span className="text-[#64ffda] mr-1">{item.label}</span>
              {item.name}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            className="px-4 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors font-mono text-sm"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-300 hover:text-[#64ffda]"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-sm py-8">
          <div className="container flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`font-mono text-lg hover:text-[#64ffda] transition-colors ${
                  location.pathname === item.path ? 'text-[#64ffda]' : 'text-gray-300'
                }`}
              >
                <span className="text-[#64ffda] mr-2">{item.label}</span>
                {item.name}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              className="px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors font-mono"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;