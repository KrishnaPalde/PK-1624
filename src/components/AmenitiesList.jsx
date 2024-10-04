import React from "react";
import { WashingMachine,Tv,AirVent,Cctv,Wifi,BriefcaseBusiness,CookingPot,Flame,UtensilsCrossed,Beef,CircleParking,PawPrint} from 'lucide-react';

const AmenityItem = ({ Icon, text }) => (
  <div className="flex items-center gap-2 mt-6 first:mt-0">
    <Icon size={24}/>
    <div className="self-stretch my-auto">{text}</div>
  </div>
);

const amenities = [
  {
    icon: WashingMachine,
    text: "Washing Machine",
  },
  {
    icon: Tv,
    text: "TV",
  },
  {
    icon: AirVent,
    text: "Air Conditioning",
  },
  {
    icon: Cctv,
    text: "Exterior security cameras on property",
  },
  {
    icon: Wifi,
    text: "Wi-fi",
  },
  {
    icon: BriefcaseBusiness,
    text: "Dedicated Workspace",
  },
  {
    icon: CookingPot,
    text: "Kitchen",
  },
  {
    icon: Flame,
    text: "Firepit",
  },
  {
    icon: UtensilsCrossed,
    text: "Outdoor Dining Area",
  },
  {
    icon: Beef,
    text: "BBQ Grill",
  },
  {
    icon: CircleParking,
    text: "Free Parking on Premises",
  },
  {
    icon: PawPrint,
    text: "Pets Allowed",
  },
];

const Amenities = () => (
  <div className="flex flex-wrap items-start gap-5 mt-8 text-base font-medium lg:gap-[10rem] max-md:max-w-full mb-10">
    <div className="flex flex-col items-start">
      {amenities.slice(0, 4).map((amenity, index) => (
        <AmenityItem key={index} Icon={amenity.icon} text={amenity.text} />
      ))}
    </div>
    <div className="flex flex-col items-start">
      {amenities.slice(4,8).map((amenity, index) => (
        <AmenityItem key={index} Icon={amenity.icon} text={amenity.text} />
      ))}
    </div>
    <div className="flex flex-col items-start">
      {amenities.slice(8).map((amenity, index) => (
        <AmenityItem key={index} Icon={amenity.icon} text={amenity.text} />
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
