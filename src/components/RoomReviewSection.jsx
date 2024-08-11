import React from "react";

function RoomReviewSection() {
  return (
    <section className="flex flex-col w-full max-md:max-w-full">
      <header className="flex flex-wrap gap-5 justify-between items-center w-full max-md:max-w-full">
        <h2 className="self-stretch my-auto text-xl font-bold text-neutral-900">
          Reviews
        </h2>
        <button className="flex flex-col self-stretch my-auto text-sm font-semibold text-white w-[152px]">
          <span className="gap-1 self-stretch p-4 w-full bg-sky-400 rounded min-h-[48px]">
            Give your review
          </span>
        </button>
      </header>
      <div className="flex gap-4 items-center self-start mt-6 text-neutral-900">
        <span className="self-stretch my-auto text-5xl font-bold max-md:text-4xl">
          4.2
        </span>
        <div className="flex flex-col self-stretch my-auto">
          <h3 className="text-xl font-semibold">Very good</h3>
          <p className="mt-2 text-sm">371 verified reviews</p>
        </div>
      </div>
    </section>
  );
}

export default RoomReviewSection;
