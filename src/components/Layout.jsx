import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import pgLogo from './images/pg_transparent.png';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target?.closest('a, button, [role="button"]')) {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.backgroundColor = 'rgba(174, 0, 255, 0.2)'; // Neon Purple
      } else {
        cursor.style.width = '32px';
        cursor.style.height = '32px';
        cursor.style.backgroundColor = 'rgba(0, 243, 255, 0.2)'; // Neon Blue
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dark text-white">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out ${
          scrolled ? 'bg-dark-lighter/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white flex items-center space-x-2">
            <img
              src={pgLogo}
              alt="ParallaxNex Logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <span className="text-xl font-bold">ParallaxNex</span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex space-x-8 text-white/90">
            {['Home', 'Work', 'Vision', 'Timeline', 'Team'].map((sec) => (
              <li
                key={sec}
                className="hover:text-white transition-colors relative group overflow-hidden"
              >
                <a href={`#${sec.toLowerCase()}`} className="py-2 block">
                  {sec}
                </a>
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                    sec === 'Home' || sec === 'Timeline'
                      ? 'bg-neon-blue'
                      : sec === 'Work' || sec === 'Team'
                      ? 'bg-neon-purple'
                      : 'bg-neon-pink'
                  }`}
                />
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-white p-1 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Menu Drawer */}
          <div
            className={`fixed inset-0 bg-dark-lighter/95 backdrop-blur-lg flex flex-col justify-center items-center transition-all duration-300 md:hidden ${
              mobileMenuOpen ? 'opacity-100 visible z-40' : 'opacity-0 invisible -z-10'
            }`}
            style={{ height: '100vh', top: 0 }}
          >
            <ul className="flex flex-col space-y-6 text-center text-white text-xl max-h-[80vh] overflow-y-auto py-12">
              {['Home', 'Work', 'Vision', 'Timeline', 'Team'].map((sec) => (
                <li key={sec}>
                  <a
                    href={`#${sec.toLowerCase()}`}
                    className="block py-2 px-4 hover:text-neon-blue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sec}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 rounded-md bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 hover:from-neon-blue/30 hover:to-neon-purple/30 backdrop-blur-md border border-white/10 transition-all duration-300"
              >
                <span className="text-white font-medium">Contact</span>
              </a>
            </div>
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-4 py-2 text-white rounded-md border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-dark-lighter pt-20 pb-10 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src={pgLogo}
                  alt="ParallaxNex Logo"
                  className="h-10 w-10 rounded-full object-contain"
                />
                <span className="text-xl font-bold">ParallaxNex</span>
              </div>
              <p className="text-white/60 text-sm mb-6">
                A collaborative partnership between Parallax Global and Nexmize AI, delivering
                innovative solutions at the intersection of design and artificial intelligence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Parallax Global</h4>
              <ul className="space-y-4">
                {['Design Services', 'UX Research', 'Virtual Reality', 'Development', 'Case Studies'].map(
                  (link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Nexmize AI</h4>
              <ul className="space-y-4">
                {['AI Solutions', 'Machine Learning', 'Data Analytics', 'Research Papers', 'AI Ethics'].map(
                  (link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div id="contact">
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/60 mt-0.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-white/60 text-sm">
                    Chandwad, Nashik <br />
                    Maharashtra 423101
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/60"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a
                    href="mailto:parallaxglobal.it@gmail.com"
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    parallaxglobal.it@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/40 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Parallax Global. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy) => (
                  <a
                    key={policy}
                    href="#"
                    className="text-white/40 hover:text-white transition-colors text-sm"
                  >
                    {policy}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-64 -left-64 w-96 h-96 rounded-full bg-neon-blue/5 blur-3xl" />
        <div className="absolute -bottom-64 -right-64 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl" />
      </footer>
    </div>
  );
}
