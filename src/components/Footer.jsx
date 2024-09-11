import React from "react";
import { Link } from "react-router-dom"; // For internal links

const Footer = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9b61e9097571706c541a77075a5bd875ce688df938993de0531acd1271cd1e4?apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "Facebook",
      link: "https://www.facebook.com", // Add external link
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/61cf18c6c3f5e57131ac7edaf21d1d1918542ff9b4355fd5ae81b9d33b9518b6?apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "Twitter",
      link: "https://www.twitter.com", // Add external link
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc0daf4828fb4a3c0aecc27d6da0d883dbc9232efe70f97d3a80ad67d6ea99bb?apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "Instagram",
      link: "https://www.instagram.com", // Add external link
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1be9bde8a60f614ae50b9c13ad02dcfc435291333c14a22bbdb72a197a28f2a9?apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "LinkedIn",
      link: "https://www.linkedin.com", // Add external link
    },
  ];

  const footerLinks = [
    {
      title: "Rooms",
      links: [
        { name: "Room with View", url: "/room/room001" }, // Internal link
        { name: "Single Room", url: "/room/room002" }, // Internal link
        { name: "Luxury Room", url: "/room/room001" }, // Internal link
      ],
    },
    {
      title: "Quick links",
      links: [
        { name: "Booking", url: "/bookings" }, // Internal link
        { name: "Site Map", url: "/sitemap" }, // Internal link
      ],
    },
    {
      title: "Company",
      links: [
        // { name: "About us", url: "/about" }, // Internal link
        { name: "Contact us", url: "/contactus" }, // Internal link
        { name: "How to reach us", url: "/contactus" }, // Internal link
        { name: "Privacy Policy", url: "/privacy-policy" }, // Internal link
        { name: "Terms of use", url: "/terms" }, // Internal link
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
    <footer className="flex flex-col self-stretch w-full bg-neutral-900 ">
      <div className="relative flex flex-col items-center w-full px-5 pb-5 mx-auto md:px-16 max-w-7xl">
        <div className="flex flex-col justify-between w-full max-w-full md:flex-row">
          <div className="flex flex-col w-full pt-16 md:w-1/3 max-md:mb-10">
            <div className="flex gap-3.5 py-px text-4xl font-bold text-white rounded-[30px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a45f9b4f7ade48b0b424da01baaecab08072e240412731f06b15377a9befea9?apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 aspect-square rounded-[30px] w-[38px]"
              />
              <div className="flex-auto my-auto">Tranquil Trails</div>
            </div>
            <address className="mt-10 text-sm not-italic leading-6 text-stone-300">
              Pacific Hills, Diversion, Mussoorie Road, Dehradun, Uttarakhand, India. Pin Code-248009
            </address>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Phone: (+91) 7673-992288
            </p>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Email: care@tranquiltrails.co.in
            </p>
            <div className="flex gap-5 pt-10 ">
              {socialIcons.map((icon, index) => (
                <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                  <img
                    loading="lazy"
                    src={icon.src}
                    alt={icon.alt}
                    className="w-6 shrink-0 aspect-square"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full pt-16 md:w-2/3">
            <div className="flex flex-wrap justify-between">
              {footerLinks.map((column, index) => (
                <div key={index} className="w-full mb-8 sm:w-1/2 md:w-1/3 md:mb-0">
                  <div className="flex flex-col">
                    <h3 className="mb-4 text-lg font-semibold leading-6 text-white">
                      {column.title}
                    </h3>
                    <ul className="text-sm leading-8 text-stone-300">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link to={link.url} onClick={handleClick} >{link.name}</Link> {/* Internal link */}
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
      <div className="w-full px-5 py-10 mt-2 text-sm leading-6 text-center text-white bg-stone-900">
        © Copyright Tranquil Trails. All Rights Reserved
        <p className="pt-2 text-xs">Designed and Developed By <a href="https://tantra-techn.web.app" target="blank">Tantra Technologies</a></p>
      </div>
    </footer>
  );
};

export default Footer;
