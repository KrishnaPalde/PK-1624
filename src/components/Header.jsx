import React, { useState, useEffect } from "react";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Booking", to: "/bookings" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact us", to: "/contactus" },
  { label: "Log In", to: "/login" },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setHasScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "bg-[#255d69] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container px-4 mx-auto py-2">
        <div className="flex items-center justify-between py-4">
          <Link to="/">
            <div className="flex items-center justify-center gap-2 text-xl font-extrabold">
              <div className="shrink-0 rounded-full h-[35px] w-[45px] flex items-center justify-center">
                <img
                  loading="lazy"
                  src={logo}
                  alt="logo"
                  className="w-[9rem] h-[3rem] object-cover"
                />
              </div>
              <div
                className={`ml-1 mt-1 ${
                  hasScrolled ? "text-[#efcb6d]" : "text-[#255d69]"
                }`}
              >
                Tranquil Trails
              </div>
            </div>
          </Link>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-2xl focus:outline-none"
            >
              {isOpen ? (
                <FiX className={`${hasScrolled ? "text-white" : "text-black"}`} />
              ) : (
                <FiMenu className={`${hasScrolled ? "text-white" : "text-black"}`} />
              )}
            </button>
          </div>
          <nav
            className={`hidden md:flex md:items-center md:gap-4 ${
              hasScrolled ? "text-white" : "text-black"
            }`}
          >
            {navItems.map((item, index) => (
              <Link key={index} to={item.to}>
                <NavItem label={item.label} />
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook
                  className={`${
                    hasScrolled
                      ? "text-white hover:text-[#316ff6]"
                      : "text-black hover:text-[#316ff6]"
                  } transition-colors duration-200`}
                  size={25}
                />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter
                  className={`${
                    hasScrolled
                      ? "text-white hover:text-[#1da1f2]"
                      : "text-black hover:text-[#1da1f2]"
                  } transition-colors duration-200`}
                  size={25}
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  className={`${
                    hasScrolled
                      ? "text-white hover:text-[#833ab4]"
                      : "text-black hover:text-[#833ab4]"
                  } transition-colors duration-200`}
                  size={25}
                />
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } md:hidden absolute top-full left-0 w-full overflow-hidden bg-white shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 space-y-4">
          {navItems.map((item, index) =>
            item.label === "Log In" ? (
              <Link
                key={index}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center text-white transition-colors duration-300 rounded-lg bg-[#efcb6d] hover:bg-[#d3b15c]"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={index}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-lg font-medium text-gray-800 transition-colors duration-200 hover:text-[#768a97]"
              >
                {item.label}
              </Link>
            )
          )}

          <div className="flex justify-center pt-4 space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                className="text-black hover:text-[#3FA2F6] transition-colors duration-200"
                size={24}
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter
                className="text-black hover:text-[#1da1f2] transition-colors duration-200"
                size={24}
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                className="text-black hover:text-[#833ab4] transition-colors duration-200"
                size={25}
              />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                className="text-black hover:text-[#0a66c2] transition-colors duration-200"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
