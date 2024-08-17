import React from "react";
import RoomFeatureCard from "./RoomFeatureCard";

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4bf0d121d5e3eb6fca66e391808aa3f8402b9c25939b6d4e61c9809a793f9cf4?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Near park",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ed62fa5034d87f538048f376fff2ed466083f9984788a6e8905181a532a3ebac?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Near nightlife",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bada82c5f0cd94e37ce1d0a6d584a8dae3d537411c20589111018a933bf30b3d?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Near theater",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b149ddb249dd8186abd66419e9caa3a241f4da1670455c07ea9a9a9a1310e458?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    text: "Clean Hotel",
  },
];

function RoomOverview({ rating }) {
  return (
    <section className="flex flex-col w-full mt-8 max-md:max-w-full">
      <header className="flex flex-col w-full text-neutral-900 max-md:max-w-full">
        <h1 className="text-xl font-bold">Overview</h1>
        <p className="w-full mt-4 text-base font-medium text-justify max-md:max-w-full">
          Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park
          Bosphorus Hotel Istanbul has risen from the ashes of the historic Park
          Hotel, which also served as Foreign Affairs Palace 120 years ago and
          is hosting its guests by assuming this hospitality mission. With its
          452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18
          meeting rooms including 4 dividable ones and 3 terraces with Bosphorus
          view, Istanbuls largest terrace with Bosphorus view (4500 m2) and
          latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is
          destined to be the popular attraction point of the city. Room and
          suite categories at various sizes with city and Bosphorus view, as
          well as 68 separate luxury suites, are offered to its special guests
          as a wide variety of selection.
        </p>
      </header>
      <div className="grid items-start self-start grid-cols-2 gap-4 mt-8 md:flex md:flex-wrap max-md:max-w-full">
        <div className="flex gap-2.5 items-start py-4 pr-16 pl-4 bg-sky-400 rounded-xl min-h-[145px] w-[166px] max-md:pr-5">
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-white">{rating}</div>
            <div className="flex flex-col mt-8 text-white">
              <div className="text-base font-bold">Very good</div>
              <div className="mt-1 text-sm font-medium">371 reviews</div>
            </div>
          </div>
        </div>
        {features.map((feature, index) => (
          <RoomFeatureCard
            key={index}
            icon={feature.icon}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
}

export default RoomOverview;
