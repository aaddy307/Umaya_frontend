'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md shadow-sm border-b border-emerald/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <span className="font-playfair text-2xl md:text-3xl font-bold text-emerald tracking-wider transition-colors group-hover:text-gold">
              UMAYA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-gold font-semibold'
                      : 'text-emerald/80 hover:text-gold'
                  }`}
                >
                  {link.label}
                  {/* Underline Slide Animation for Active Link */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-emerald hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-ivory/98 backdrop-blur-md border-t border-emerald/5 ${
          isOpen ? 'max-h-72 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`text-lg font-medium transition-colors duration-200 py-1 ${
                  isActive
                    ? 'text-gold border-l-2 border-gold pl-3'
                    : 'text-emerald/80 hover:text-gold pl-3'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}