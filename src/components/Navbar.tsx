import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';


function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function LO(){
    localStorage.removeItem("token")
    localStorage.removeItem("id")
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/analyzer', label: 'Analyzer' },
    { path: '/about', label: 'About' },
    { path: '/research', label: 'Research' },
    { path: '/login', label: 'LogOut'}
  ];

  const navItemsLog = [
    {path: '/login', label:'Login'},
    {path: '/register', label:'Signup'},
  ]

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EmotionAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {localStorage.getItem("token") != undefined ? navItems.map(({ path, label }) => (
              label === 'LogOut' ? <Link key={path} to={path} onClick={LO}>{label}</Link> : 
              <Link
                key={path}
                to={path}
                className="relative px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {label}
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-indigo-600 bottom-0"
                    initial={false}
                  />
                )}
              </Link>
            )):navItemsLog.map(({ path, label }) => (
              label === 'LogOut' ? <Link key={path} to={path} onClick={LO}>{label}</Link> : 
              <Link
                key={path}
                to={path}
                className="relative px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
              >
                {label}
                {location.pathname === path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-indigo-600 bottom-0"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden absolute w-full bg-white shadow-lg z-50"
      >
        <div className="px-4 py-2 space-y-1">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md ${
                location.pathname === path
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;