import React from "react";

function FilterHeader({ title }) {
  return (
    <header className="flex gap-5 justify-between mt-8 text-base font-semibold whitespace-nowrap text-neutral-900">
      <h3>{title}</h3>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/30b374b7723f4ef7f95977d2ac62a4a31fdcf68152f74947fe62971a880b0b8c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
        className="shrink-0 w-6 aspect-square"
        alt=""
      />
    </header>
  );
}

export default FilterHeader;
