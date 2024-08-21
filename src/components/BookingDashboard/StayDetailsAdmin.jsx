import React from "react";

function StayDetailsAdmin() {
  return (
    <article className="flex overflow-hidden flex-col p-6 bg-white rounded-3xl max-w-[500px] max-md:px-5">
      <div className="flex flex-wrap w-full gap-6 text-neutral-900 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/367030233600d0ef3fa44e636606b99253341bdcd384026a6c672cc2cc21a9f9?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt="Hotel room"
          className="object-contain shrink-0 my-auto rounded-xl aspect-[1.01] min-h-[120px] w-[121px]"
        />
        <div className="flex flex-col justify-center min-w-[240px] w-[304px]">
          <div className="flex flex-col w-full">
            <div className="text-base font-medium opacity-75">
              Nucleus ipsum hotel...
            </div>
            <div className="mt-1 text-xl font-semibold">
              Superior room - 1 double bed or 2 twin beds
            </div>
          </div>
          <div className="flex items-center w-full gap-2 mt-4 text-xs font-medium">
            <div className="flex flex-col self-stretch w-10 my-auto whitespace-nowrap">
              <div className="gap-1 self-stretch px-3 py-2.5 w-full rounded border border-sky-400 border-solid min-h-[32px]">
                4.2
              </div>
            </div>
            <div className="self-stretch my-auto">
              <span className="font-bold">Very Good</span> 54 reviews
            </div>
          </div>
        </div>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-zinc-800">Current Booking</h2>
      <hr className="mt-4 w-full bg-neutral-900 bg-opacity-30 min-h-[1px] max-md:max-w-full" />
      <p className="mt-4 text-xs font-medium opacity-75 text-neutral-900 max-md:max-w-full">
        Unwind in comfort with a plush king bed and a private balcony
        overlooking the city.
      </p>
      <div className="self-start px-2 py-0.5 mt-4 text-xs text-center text-blue-500 whitespace-nowrap bg-indigo-50 rounded-2xl">
        Booked
      </div>
      <p className="mt-4 text-sm font-bold leading-loose text-black">
        Booking Id #2532398
      </p>
      <div className="flex gap-1.5 py-2 mt-4 max-w-full text-sm font-bold leading-loose text-black w-[156px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8b2da9a0c958068cba6b202a29769ac0cd1dbeb5a7d0d90db5824ac26f87002c?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt=""
          className="object-contain w-4 shrink-0 aspect-square"
        />
        <div className="grow shrink my-auto w-[131px]">2 adults, 2 children</div>
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-10 mt-4 max-md:max-w-full">
        <div className="flex flex-col self-stretch justify-center my-auto text-neutral-900">
          <div className="gap-2 text-base font-semibold">Thursday, Dec 8</div>
          <div className="flex items-start self-start gap-2 mt-2 text-xs font-medium whitespace-nowrap">
            <div className="opacity-60">Check-In</div>
          </div>
        </div>
        <div className="flex flex-col items-center self-stretch my-auto rotate-[-1.5707963267948966rad]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8eee877b31054d162f5102ad69867c0cc0d901c8d98a1fa692752cedc94d58aa?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            alt=""
            className="object-contain w-9"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/aad13729d1187a532e872c22e7e4ea2d71f81786bc28516ef2b150224ec975dd?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            alt=""
            className="object-contain w-8 mt-6 aspect-square"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d4c98b42ed8b71c1354f70d665b9abb49e299549ec3c2773dd99b14bd1a11f6?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            alt=""
            className="object-contain mt-6 w-9"
          />
        </div>
        <div className="flex flex-col self-stretch justify-center my-auto text-neutral-900">
          <div className="gap-2 text-base font-semibold">Friday, Dec 9</div>
          <div className="flex items-start self-start gap-2 mt-2 text-xs font-medium whitespace-nowrap">
            <div className="opacity-60">Check-Out</div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default StayDetailsAdmin;