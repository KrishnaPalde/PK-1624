import React from "react";
import FilterHeader from "./FilterHeader";

function AmenitiesFilter() {
  const amenities = ["24hr front desk", "Air-conditioned", "Fitness", "Pool"];

  return (
    <div>
      <FilterHeader title="Amenities" />
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="flex gap-2 self-start mt-2 text-sm font-medium whitespace-nowrap text-neutral-900"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/39b9570ebeb25e86ecf567009d357ba1e63d9a5e9d477b8ef848f93d481afe15?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            className="shrink-0 w-6 aspect-square"
            alt=""
          />
          <div className="my-auto">{amenity}</div>
        </div>
      ))}
      <div className="mt-2 text-sm font-bold text-violet-700">+24 more</div>
    </div>
  );
}

export default AmenitiesFilter;
