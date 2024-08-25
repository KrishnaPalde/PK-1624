import React from "react";

const Footer = () => {
  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9b61e9097571706c541a77075a5bd875ce688df938993de0531acd1271cd1e4?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "Facebook",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/61cf18c6c3f5e57131ac7edaf21d1d1918542ff9b4355fd5ae81b9d33b9518b6?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "Twitter",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cc0daf4828fb4a3c0aecc27d6da0d883dbc9232efe70f97d3a80ad67d6ea99bb?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "Instagram",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1be9bde8a60f614ae50b9c13ad02dcfc435291333c14a22bbdb72a197a28f2a9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      alt: "LinkedIn",
    },
  ];

  const footerLinks = [
    {
      title: "Lorem Ipsum",
      links: [
        "Room with View",
        "Single Room",
        "Luxary Room",
        "Service",
        "Web Development",
      ],
    },
    {
      title: "Quick links",
      links: ["Booking", "Check In", "Dinning", "Site Map", "Service"],
    },
    {
      title: "Company",
      links: [
        "About us",
        "Contact us",
        "How to reach us",
        "Privacy Policy",
        "Terms of use",
        "Cookies",
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
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a45f9b4f7ade48b0b424da01baaecab08072e240412731f06b15377a9befea9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 aspect-square rounded-[30px] w-[38px]"
              />
              <div className="flex-auto my-auto">Tranquil Trails</div>
            </div>
            <address className="mt-10 text-sm not-italic leading-6 text-stone-300">
              A108 Adam Street New York, NY 535022 United States
            </address>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Phone: +1 5589 55488 55
            </p>
            <p className="mt-4 text-sm leading-6 text-stone-300">
              Email: info@example.com
            </p>
            <div className="flex gap-5 pt-10 ">
              {socialIcons.map((icon, index) => (
                <img
                  key={index}
                  loading="lazy"
                  src={icon.src}
                  alt={icon.alt}
                  className="w-6 shrink-0 aspect-square"
                />
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
                        <li key={linkIndex}>{link}</li>
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
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d1b756784f3b8d2387d3810d98603da18dd71acbf31b06453249608231f79e1?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
          alt="Back to top"
          className="absolute w-24 h-16 transform -translate-x-1/2 cursor-pointer lg:h-24 left-1/2 -top-12"
          onClick={handleClick}
        />
      </div>
      <div className="w-full px-5 py-10 mt-2 text-sm leading-6 text-center text-white bg-stone-900">
        © Copyright Tranquil Trails. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;