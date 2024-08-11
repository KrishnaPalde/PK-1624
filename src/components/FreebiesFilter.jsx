import React, { useState } from "react";
import FilterHeader from "./FilterHeader";

function FreebiesFilter() {
  const freebies = [
    "Free breakfast",
    "Free parking",
    "Free internet",
    "Free airport shuttle",
    "Free cancellation",
  ];

  const [selectedFreebies, setSelectedFreebies] = useState([]);

  const handleFreebieClick = (freebie) => {
    setSelectedFreebies((prevSelected) =>
      prevSelected.includes(freebie)
        ? prevSelected.filter((item) => item !== freebie)
        : [...prevSelected, freebie]
    );
  };

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div>
      <FilterHeader title="Freebies" isExpanded={isExpanded} onClick={toggleExpand} />
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40' : 'max-h-0'}`}>
      {freebies.map((freebie, index) => (
        <div
          key={index}
          onClick={() => handleFreebieClick(freebie)}
          className="flex gap-2 mt-2 text-sm font-medium cursor-pointer text-neutral-900"
        >
          <div className="relative flex items-center justify-center w-6 h-6 border rounded-sm shrink-0 border-sky-400">
            {selectedFreebies.includes(freebie) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-sky-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div className="my-auto">{freebie}</div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default FreebiesFilter;

