import React from "react";
import { Link } from "react-router-dom";

function RoomReviewSection({rating,reviews}) {
  const getTitle = () => {
    switch (Math.round(rating)) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "Unknown"; 
    }
  };
  return (
    <section className="flex flex-col w-full max-md:max-w-full">
      <header className="flex flex-wrap items-center justify-between w-full gap-5 max-md:max-w-full">
        <h2 className="self-stretch my-auto text-xl font-bold text-neutral-900">
          Reviews
        </h2>
        <Link to='/feedback'>
        <button className="flex flex-col self-stretch my-auto text-sm font-semibold text-white w-[152px]">
          <span className="gap-1 self-stretch p-4 w-full bg-[#335064] hover:bg-[#243947] rounded min-h-[48px]">
            Give your review
          </span>
        </button>
        </Link>
      </header>
      <div className="flex items-center self-start gap-4 mt-6 text-neutral-900">
        <span className="self-stretch my-auto text-5xl font-bold max-md:text-4xl">
          {rating}
        </span>
        <div className="flex flex-col self-stretch my-auto">
          <h3 className="text-xl font-semibold">{getTitle()}</h3>
          <p className="mt-2 text-sm">{reviews} verified reviews</p>
        </div>
      </div>
    </section>
  );
}

export default RoomReviewSection;
