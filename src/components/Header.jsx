import React, { useState } from "react";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import { FaFacebookSquare , FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; 
import {FiMenu, FiX} from "react-icons/fi";
import logo from '../assets/logo.png';

const navItems = [
  { label: "Home", to: "/" },
  // { label: "Blog", to: "/blogs" },
  { label: "Booking", to: "/bookings" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact us", to: "/contactus" },
  { label: "Log In", to: "/login" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative z-50 w-full bg-white bg-opacity-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4 text-xl font-extrabold text-black">
          <div className="shrink-0 rounded-full h-[35px] w-[35px]">
            <img src={logo} alt="logo" />
            </div>
          <div>Tranquil Trails</div>
        </div>
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-2xl focus:outline-none">
            {isOpen ? <FiX className="text-black" /> : <FiMenu className="text-black" />}
          </button>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-4">
          {navItems.map((item, index) => (
            <Link key={index} to={item.to}>
              <NavItem label={item.label} />
            </Link>
          ))}
  
          <div className="flex items-center gap-4 ml-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={25} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={25} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={25} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={25} />
            </a>
          </div>
        </nav>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:hidden absolute top-full left-0 w-full overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out rounded-[30px]`}
      >
        <div className="p-4 space-y-4">
          {navItems.map((item, index) => (
            item.label === "Log In" 
            ? <Link 
                key={index} 
                to={item.to} 
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center text-white transition-colors duration-300 rounded-lg bg-[#335064] hover:bg-[#2e495b]"
              >
                {item.label}
              </Link>
            : <Link 
                key={index} 
                to={item.to} 
                onClick={() => setIsOpen(false)}
                className="block py-2 text-lg font-medium text-gray-800 transition-colors duration-200 hover:text-[#768a97]"
              >
                {item.label}
              </Link>
          ))}
          
          <div className="flex justify-center pt-4 space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={24} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={24} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-800 hover:text-[#3FA2F6] transition-colors duration-200" size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

