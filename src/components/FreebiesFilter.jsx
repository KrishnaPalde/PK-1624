import React from "react";
import FilterHeader from "./FilterHeader";

function FreebiesFilter() {
  const freebies = [
    "Free breakfast",
    "Free parking",
    "Free internet",
    "Free airport shuttle",
    "Free cancellation",
  ];

  return (
    <div>
      <FilterHeader title="Freebies" />
      {freebies.map((freebie, index) => (
        <div
          key={index}
          className="flex gap-2 mt-2 text-sm font-medium text-neutral-900"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bec477041224fb7fc3922fecf0f0268dca8625a91ef0c7f9a15c09f74890b18?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            className="shrink-0 w-6 aspect-square"
            alt=""
          />
          <div className="my-auto">{freebie}</div>
        </div>
      ))}
    </div>
  );
}

export default FreebiesFilter;
