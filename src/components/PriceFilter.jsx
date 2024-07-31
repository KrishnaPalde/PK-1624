import React from "react";
import FilterHeader from "./FilterHeader";

function PriceFilter() {
  return (
    <div>
      <FilterHeader title="Price" />
      <div className="flex mt-4">
        <div className="shrink-0 w-6 h-6 bg-sky-400 rounded-full" />
        <div className="shrink-0 self-start mt-3 max-w-full h-0.5 bg-neutral-900 w-[297px]" />
        <div className="shrink-0 w-6 h-6 bg-sky-400 rounded-full" />
      </div>
      <div className="flex gap-5 justify-between mt-2 text-xs font-medium whitespace-nowrap text-neutral-900">
        <div>$50</div>
        <div className="text-right">$1200</div>
      </div>
    </div>
  );
}

export default PriceFilter;
