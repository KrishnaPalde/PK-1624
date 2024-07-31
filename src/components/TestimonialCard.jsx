import React from "react";

function TestimonialCard({ name, location, imageSrc, content, bgColor }) {
  return (
    <div
      className={`flex flex-col px-10 py-9 w-full ${bgColor} border border-solid border-zinc-200 rounded-[32px] max-md:px-5 max-md:mt-6`}
    >
      <div className="flex gap-5 justify-between items-start pb-6 w-full border-b border-zinc-200">
        <div className="flex gap-3 self-start text-black">
          <img
            loading="lazy"
            src={imageSrc}
            alt={name}
            className="shrink-0 w-16 aspect-square rounded-[32px]"
          />
          <div className="flex flex-col my-auto">
            <div className="text-lg font-bold">{name}</div>
            <div className="mt-3.5 text-sm font-medium">{location}</div>
          </div>
        </div>
        <div className="flex gap-0.5 self-end mt-11 max-md:mt-10">
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d48158f0ab68e22d6c44cb2065d143c2c34d45863aa3995123ca6e20ae8d6f9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt="Star rating"
              className="shrink-0 w-3 aspect-square"
            />
          ))}
        </div>
      </div>
      <p className="mt-9 text-sm leading-6 text-neutral-500">{content}</p>
    </div>
  );
}

export default TestimonialCard;
