import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, Package } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Products', path: '/products', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                <ShoppingBag className="h-10 w-10" />
                <span className="text-2xl font-bold">Productify</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-700 text-white shadow-md'
                        : 'text-blue-100 hover:bg-blue-500 hover:bg-opacity-80 hover:text-white'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Productify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
