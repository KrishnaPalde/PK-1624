import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import logo from "../assets/logo.png";
import { Instagram, Facebook, Youtube } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const process = import.meta.env;

const Footer = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); 

  const socialIcons = [
    // {
    //   src: Facebook,
    //   alt: "Facebook",
    //   link: "https://www.facebook.com",
    // },
    {
      src: Instagram,
      alt: "Instagram",
      link: "https://www.instagram.com/tranquil_trails_home?igsh=aHdlMnAwdW42dnV6",
    },
    // {
    //   src: Youtube,
    //   alt: "Youtube",
    //   link: "https://www.youtube.com",
    // },
  ];

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${process.VITE_HOST_URL}/api/allRooms`
        );
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleLinkClick = (link) => {
    if (link.data && link.data.id) {
      // Force a page reload if we're already on a room page
      if (location.pathname.includes('/room/')) {
        window.location.href = `/room/${link.data.id}`;
      } else {
        navigate(`/room/${link.data.id}`, { 
          state: link.data,
          replace: true // Use replace to avoid building up history
        });
      }
    } else {
      navigate(link.url);
    }
  };

  const footerLinks = [
    {
      title: "Rooms",
      links: rooms.map((room) => ({
        name: room.name,
        url: `/room/${room.id}`,
        data: room,
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
        { name: "How to reach us", url: "/contactus" },
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Terms of use", url: "/terms-conditions" },
      ],
    },
  ];

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="flex flex-col self-stretch w-full bg-[#255d69] ">
      <div className="relative flex flex-col items-center w-full px-5 pb-5 mx-auto md:px-16 max-w-7xl">
        <div className="flex flex-col justify-between w-full max-w-full md:flex-row">
          <div className="flex flex-col w-full pt-16 md:w-1/3 max-md:mb-10">
            <Link
              to="/"
              className="flex gap-3.5 py-px text-4xl font-bold text-white rounded-[30px]"
            >
              <img
                loading="lazy"
                // src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a45f9b4f7ade48b0b424da01baaecab08072e240412731f06b15377a9befea9?apiKey=2bc25307ed444d758c5818aa40360cbc"
                src={logo}
                alt=""
                className="shrink-0 aspect-square object-cover w-[48px]"
              />
              <div className="flex-auto my-auto">Tranquil Trails</div>
            </Link>
            <address className="mt-10 text-sm not-italic leading-6 text-stone-300">
              Pacific Hills, Diversion, Mussoorie Road, Dehradun, Uttarakhand,
              India. Pin Code-248009
            </address>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Phone: (+91) 7673-992288
            </p>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Email: care@tranquiltrails.co.in
            </p>
            <div className="flex gap-5 pt-10 ">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <icon.src
                    className="w-6 text-white shrink-0 aspect-square hover:text-gray-300"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full pt-16 md:w-2/3">
            <div className="flex flex-wrap justify-between">
              {footerLinks.map((column, index) => (
                <div
                  key={index}
                  className="w-full mb-8 sm:w-1/2 md:w-1/3 md:mb-0"
                >
                  <div className="flex flex-col">
                    <h3 className="mb-4 text-lg font-semibold leading-6 text-white">
                      {column.title}
                    </h3>
                    <ul className="text-sm leading-8 text-stone-300">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            to={link.url}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(link);
                            }}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d1b756784f3b8d2387d3810d98603da18dd71acbf31b06453249608231f79e1?apiKey=2bc25307ed444d758c5818aa40360cbc"
          alt="Back to top"
          className="absolute w-24 h-16 transform -translate-x-1/2 cursor-pointer lg:h-24 left-1/2 -top-12 text-[#335064]"
          onClick={handleClick}
        />
      </div>
      <div className="w-full px-5 pb-5 pt-0 leading-6 text-center font-medium text-md text-white bg-[#255d69]">
        © Copyright Tranquil Trails. All Rights Reserved
        <p className="pt-1 text-xs ">
          Designed and Developed By{" "}
          <a href="https://tantra-techn.web.app" target="blank">
            Tantra Technologies
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
