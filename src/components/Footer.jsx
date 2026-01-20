import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Instagram } from "lucide-react";
import axios from "axios";
import { useBooking } from "../contexts/BookingFormContext";
import { capitalize } from "@mui/material";

const env = import.meta.env;

const Footer = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateBookingInfo } = useBooking();

  const socialIcons = [
    {
      src: Instagram,
      alt: "Instagram",
      link: "https://www.instagram.com/tranquil_trails_home",
    },
  ];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          `${env.VITE_HOST_URL}/api/allRooms`
        );

        // Extract unique cities
        const uniqueCities = [
          ...new Set(response.data.map(room => room.city))
        ];

        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleCityClick = (city) => {
    updateBookingInfo({ city });
    navigate("/bookings");
  };

  const footerLinks = [
    {
      title: "Cities",
      links: cities.map(city => ({
        name: capitalize(city),
        onClick: () => handleCityClick(city),
      })),
    },
    {
      title: "Quick links",
      links: [
        { name: "Booking", url: "/bookings" },
        { name: "FAQ", url: "/faq" },
        { name: "House Rules", url: "/house-rules" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Contact us", url: "/contactus" },
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Terms of use", url: "/terms-conditions" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#255d69]">
      <div className="max-w-7xl mx-auto px-5 md:px-16 py-16">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Brand */}
          <div className="md:w-1/3 mb-10">
            <Link to="/" className="flex items-center gap-3 text-white text-3xl font-bold">
              <img src={logo} alt="Logo" className="w-12 h-12" />
              Tranquil Trails
            </Link>

            <address className="mt-6 text-sm text-stone-300 not-italic">
              Pacific Hills, Mussoorie Road, Dehradun, Uttarakhand – 248009
            </address>

            <p className="mt-2 text-sm text-stone-300">
              Phone: (+91) 7673-992288
            </p>

            <p className="mt-2 text-sm text-stone-300">
              Email: care@tranquiltrails.co.in
            </p>

            <div className="flex gap-4 mt-6">
              {socialIcons.map((icon, index) => (
                <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                  <icon.src className="w-6 h-6 text-white hover:text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:w-2/3 flex flex-wrap justify-between">
            {footerLinks.map((column, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 mb-8">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {column.title}
                </h3>
                <ul className="text-sm text-stone-300 space-y-2">
                  {column.links.map((link, i) => (
                    <li key={i}>
                      {link.onClick ? (
                        <button
                          onClick={link.onClick}
                          className="hover:text-white transition"
                        >
                          {link.name}
                        </button>
                      ) : (
                        <Link to={link.url} className="hover:text-white transition">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-white py-4 border-t border-white/10">
        © Tranquil Trails. All Rights Reserved
        <p className="text-xs mt-1">
          Designed & Developed by{" "}
          <a href="https://tantratechnologies.com" target="_blank" className="underline">
            Tantra Technologies
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
