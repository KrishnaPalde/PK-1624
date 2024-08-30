import React from "react";

const AmenityItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 mt-6 first:mt-0">
    <img
      loading="lazy"
      src={icon}
      alt=""
      className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
    />
    <div className="self-stretch my-auto">{text}</div>
  </div>
);

const amenities = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/52f5e1414d6808ebe0b4f368fa54506c65987e0d737968791713e132070e2547?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Washing Machine",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/52f5e1414d6808ebe0b4f368fa54506c65987e0d737968791713e132070e2547?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "TV",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/24339a355a04fccf19478522f4bf428fd36b6024d2f65c40a55ebabd80bbb1ef?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Air Conditioning",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc5a4c77b519e4e410574c7ccf621a9fc529121fe3fcf3b09e80b46a94b7ff64?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Exterior security cameras on property",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d95ad217769e575844e340a3636a40976fee3e9e1964393a9e68945e22a88e19?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Wi-fi",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a6adccda64d095978bd1c0f38de06b2e01703649f7fa2acc48bdb311877e5e6?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Dedicated Workspace",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9fcd8afac64ebf6d9283ae83e5f5fd09eec5917326cc53fd3218eea56d7f562c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Kitchen",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/04461be82378eb12780b0b363e131c7b3c2643ba53c6c327dad4ce3d50d4c168?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Firepit",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/81d5b25364dc7204f7a6d15112fef97833260ca05264f000e2c8df1a1958b26c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Outdoor Dining Area",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9fcd8afac64ebf6d9283ae83e5f5fd09eec5917326cc53fd3218eea56d7f562c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "BBQ Grill",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/04461be82378eb12780b0b363e131c7b3c2643ba53c6c327dad4ce3d50d4c168?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Free Parking on Premises",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/81d5b25364dc7204f7a6d15112fef97833260ca05264f000e2c8df1a1958b26c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Pets Allowed",
  },
];

const Amenities = () => (
  <div className="flex flex-wrap items-start gap-5 mt-8 text-base font-medium lg:gap-[15rem] max-md:max-w-full mb-10">
    <div className="flex flex-col items-start">
      {amenities.slice(0, 4).map((amenity, index) => (
        <AmenityItem key={index} icon={amenity.icon} text={amenity.text} />
      ))}
    </div>
    <div className="flex flex-col items-start">
      {amenities.slice(4,8).map((amenity, index) => (
        <AmenityItem key={index} icon={amenity.icon} text={amenity.text} />
      ))}
    </div>
    <div className="flex flex-col items-start">
      {amenities.slice(8).map((amenity, index) => (
        <AmenityItem key={index} icon={amenity.icon} text={amenity.text} />
      ))}
    </div>
  </div>
);

const AmenitiesList = () => (
  <section className="flex flex-col self-start mt-8 text-neutral-900 max-md:max-w-full">
    <h2 className="text-xl font-bold">Amenities</h2>
    <Amenities />
  </section>
);

export default AmenitiesList;
