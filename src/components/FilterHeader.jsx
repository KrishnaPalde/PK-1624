import React from "react";

function FilterHeader({ title, isExpanded, onClick }) {
  return (
    <header 
      className="flex justify-between gap-5 mt-8 text-base font-semibold cursor-pointer whitespace-nowrap text-neutral-900"
      onClick={onClick}
    >
      <h3>{title}</h3>
      <svg 
        className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </header>
  );
}

export default FilterHeader;

