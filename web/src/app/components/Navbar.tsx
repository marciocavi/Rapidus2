'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Início', icon: '🏠' },
    { href: '/#features', label: 'Features', icon: '⭐' },
    { href: '/#services', label: 'Serviços', icon: '🛠️' },
    { href: '/#parceiros', label: 'Parceiros', icon: '🤝' },
    { href: '/#blog', label: 'Blog', icon: '📝' },
    { href: '/admin/settings', label: 'Admin', icon: '⚙️' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-xl font-bold hover:text-zinc-300 transition-colors duration-200"
        >
          <span className="text-2xl">⚡</span>
          <span>Rapidus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive(item.href) 
                  ? 'bg-zinc-800 text-zinc-100 shadow-lg' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(item.href) 
                    ? 'bg-zinc-800 text-zinc-100' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
