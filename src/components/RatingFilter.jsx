import React from "react";
import FilterHeader from "./FilterHeader";

function RatingFilter() {
  const ratings = ["0+", "1+", "2+", "3+", "4+"];

  return (
    <div>
      <FilterHeader title="Rating" />
      <div className="flex gap-4 pr-20 mt-4 text-xs font-medium whitespace-nowrap text-neutral-900 max-md:pr-5">
        {ratings.map((rating, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded border border-sky-400 border-solid"
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RatingFilter;
