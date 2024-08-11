import React, { useState } from "react";
import FilterHeader from "./FilterHeader";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from '@chakra-ui/react';

function PriceFilter() {
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePriceRangeChange = (newValues) => {
    setPriceRange(newValues);
  };

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
            max={1200}
            step={1}
            defaultValue={[50, 1200]}
            onChange={handlePriceRangeChange}
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