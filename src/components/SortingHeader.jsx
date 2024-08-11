import React from "react";

function SortingHeader({ totalPlaces, shownPlaces }) {
  return (
    <header className="flex justify-between w-full gap-5 px-5 text-sm font-semibold max-md:flex-wrap max-md:max-w-full">
      <div className="text-rose-400">
        Showing {shownPlaces} of{" "}
        <span className="text-rose-400">{totalPlaces} places</span>
      </div>
      <div className="flex gap-1 text-right text-neutral-900">
        <div>
          <span className="">Sort by</span> Recommended
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb7fc6d5a5274e46a14c6bdc5f729c5c4311895c7247d74c906efe2a4e7a0d29?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt=""
          className="shrink-0 aspect-square w-[18px]"
        />
      </div>
    </header>
  );
}

export default SortingHeader;
