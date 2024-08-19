import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const menuItems = [
    { icon: 'home', label: 'Dashboard', location: 'blogs'},
    { icon: 'bar-chart', label: 'Booking', location: 'blogs'},
    { icon: 'users', label: 'Room', location: 'blogs'},
    { icon: 'folder', label: 'Blogs', location: 'blogs'},
    // { icon: 'calendar', label: 'Settings' },
    { icon: 'settings', label: 'Settings', location: 'blogs'},
  ];

  const variants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={(isLargeScreen || isOpen) ? 'open' : 'closed'}
        variants={variants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 z-50 w-64 h-full p-6 text-gray-800 bg-gray-100 shadow-lg"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Company Name</h2>
          {!isLargeScreen && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 transition-colors duration-300 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.location}
                className="flex items-center p-2 space-x-3 transition-all duration-300 rounded-md hover:bg-gray-200"
              >
                <span className="text-gray-600">
                  <i className={`fas fa-${item.icon}`}></i>
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="absolute bottom-6 left-6 right-6">
          <hr className="mb-4 border-gray-300" />
          <Link className="flex items-center space-x-3 text-gray-600 transition-colors duration-300 hover:text-gray-800" onClick={logout}>
            <span><i className="fas fa-sign-out-alt"></i></span>
            <span>Log out</span>
          </Link>
        </div>
      </motion.nav>
      {!isLargeScreen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-4 left-4 z-40 text-gray-800 bg-white p-2 rounded-md shadow-lg hover:bg-gray-100 transition-all duration-300 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </>
  );
};

export default SideNav;


