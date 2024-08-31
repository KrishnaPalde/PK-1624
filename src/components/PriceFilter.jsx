import React, { useState, useEffect } from "react";
import FilterHeader from "./FilterHeader";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';

function PriceFilter({ priceRange, setPriceRange }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <FilterHeader title="Price" isExpanded={isExpanded} onClick={toggleExpand} />
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40' : 'max-h-0'}`}>
        <div className="relative px-3 mt-4">
          <RangeSlider
            aria-label={['min', 'max']}
            min={50}
            max={100000}
            step={1}
            value={priceRange}
            onChange={(newValues) => setPriceRange(newValues)}
          >
            <RangeSliderTrack className="h-0.5 bg-neutral-900">
              <RangeSliderFilledTrack className="bg-sky-400" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} className="w-6 h-6 -mt-3 rounded-full bg-sky-400" />
            <RangeSliderThumb index={1} className="w-6 h-6 -mt-3 rounded-full bg-sky-400" />
          </RangeSlider>
        </div>
        <div className="flex justify-between gap-5 mt-2 text-xs font-medium whitespace-nowrap text-neutral-900">
          <div>₹{priceRange[0]}</div>
          <div className="text-right">₹{priceRange[1]}</div>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
