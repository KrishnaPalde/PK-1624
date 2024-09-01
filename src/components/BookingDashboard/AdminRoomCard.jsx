import React from "react";

function isTodayWeekend() {
  // Get today's date
  const today = new Date();
  
  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = today.getDay();
  
  // Check if it's Saturday (6) or Sunday (0)
  return dayOfWeek === 0 || dayOfWeek === 6;
}

function AdminRoomCard({ title, price, iconSrc, weekend }) {
  // Determine the main and secondary prices based on whether today is a weekend
  const isWeekend = isTodayWeekend();
  const mainPrice = isWeekend ? weekend : price;
  const secondaryPrice = isWeekend ? price : weekend;

  return (
    <article className="flex flex-col justify-center p-4 text-center bg-white rounded-lg border-gray-300 border-solid shadow-sm border-[0.5px] min-h-[150px]">
      {/* Optional image and deals section commented out */}
      {/* <header className="flex items-center justify-between w-full gap-10 text-xs font-medium text-green-700"> */}
      {/* {deals && (
          <div className="gap-2 self-stretch px-2 py-0.5 my-auto bg-green-200 rounded">
            {deals} Deals
          </div>
        )} */}
      {/* <img
          loading="lazy"
          src={iconSrc}
          alt=""
          className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
        />
      </header> */}
      <div className="flex flex-col items-start self-start mt-1 text-2xl font-semibold text-gray-400">
        <h2
          className="text-base font-medium text-gray-500"
          style={{ maxWidth: "22ch", wordBreak: "break-word", textAlign: "left" }} // Allow wrapping
          title={title} // Shows full title on hover
        >
          {title}
        </h2>
        {/* Main price display */}
        <p className="mt-1 leading-none pt-5">
          <span className="text-blue-600">₹ {mainPrice}</span>
          <span className="text-base font-medium leading-6 text-gray-400"> / night</span>
        </p>
        {/* Conditional secondary price display */}
        <p className="text-sm text-gray-400">
          {isWeekend ? "Weekday Price: " : "Weekend Price: "}₹ {secondaryPrice} / night
        </p>
      </div>
    </article>
  );
}

export default AdminRoomCard;
