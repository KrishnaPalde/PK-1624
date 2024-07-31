import React from "react";
import FilterHeader from "./FilterHeader";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import FreebiesFilter from "./FreebiesFilter";
import AmenitiesFilter from "./AmenitiesFilter";

function FilterSection() {
  return (
    <section className="flex flex-col px-5 max-md:mt-7">
      <h2 className="text-xl font-semibold text-neutral-900">Filters</h2>
      <PriceFilter />
      <hr className="shrink-0 mt-8 h-px bg-neutral-900" />
      <RatingFilter />
      <hr className="shrink-0 mt-8 h-px bg-neutral-900" />
      <FreebiesFilter />
      <hr className="shrink-0 mt-8 h-px bg-neutral-900" />
      <AmenitiesFilter />
    </section>
  );
}

export default FilterSection;
