import React from "react";
import FilterHeader from "./FilterHeader";
import PriceFilter from "./PriceFilter";
import RatingFilter from "./RatingFilter";
import FreebiesFilter from "./FreebiesFilter";
import AmenitiesFilter from "./AmenitiesFilter";

function FilterSection({ priceRange, setPriceRange, selectedRating, setSelectedRating }) { // Accept props
  return (
    <section className="flex-col px-5 md:flex max-md:mt-7">
      <h2 className="text-xl font-semibold text-neutral-900">Filters</h2>
      <PriceFilter 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} // Pass props to PriceFilter
      />
      <hr className="h-px mt-8 shrink-0 bg-neutral-900" />
      <RatingFilter 
        selectedRating={selectedRating} 
        setSelectedRating={setSelectedRating} // Pass props to RatingFilter
      />
      <hr className="h-px mt-8 shrink-0 bg-neutral-900" />
      <FreebiesFilter />
      <hr className="h-px mt-8 shrink-0 bg-neutral-900" />
      <AmenitiesFilter />
    </section>
  );
}

export default FilterSection;
