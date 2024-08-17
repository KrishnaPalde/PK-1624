import React from "react";

function DateDisplay({ date, type }) {
  return (
    <div className="flex flex-col self-stretch justify-center my-auto text-neutral-900">
      <div className="gap-2 text-base font-semibold">{date}</div>
      <div className="flex items-start self-start gap-2 mt-2 text-xs font-medium whitespace-nowrap">
        <div className="opacity-60">{type}</div>
      </div>
    </div>
  );
}

export default DateDisplay;