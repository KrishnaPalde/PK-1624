import React from "react";

function TestimonialCard({ name, location, imageSrc, content, bgColor }) {
  return (
    <div
      className={`flex flex-col px-10 py-9 w-full ${bgColor} border border-solid border-zinc-200 rounded-[32px] max-md:px-5 max-md:mt-6`}
    >
      <div className="flex items-start justify-between w-full gap-5 pb-6 border-b border-zinc-200">
        <div className="flex self-start gap-3 text-black">
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
              className="w-3 shrink-0 aspect-square"
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-6 mt-9 text-neutral-500">{content}</p>
    </div>
  );
}

export default TestimonialCard;
