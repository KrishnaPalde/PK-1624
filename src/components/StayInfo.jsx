import React from "react";

function StayInfo() {
  return (
    <>
      <div className="flex gap-6 w-full text-neutral-900 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/367030233600d0ef3fa44e636606b99253341bdcd384026a6c672cc2cc21a9f9?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
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
          <div className="flex gap-2 items-center mt-4 w-full text-xs font-medium">
            <div className="flex flex-col self-stretch my-auto w-10 whitespace-nowrap">
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
      <hr className="mt-4 w-full bg-neutral-900 bg-opacity-30" />
      <p className="mt-4 text-xs font-medium opacity-75 text-neutral-900 max-md:max-w-full">
        Unwind in comfort with a plush king bed and a private balcony
        overlooking the city.
      </p>
      <div className="flex gap-1.5 py-2 mt-4 max-w-full text-sm font-bold leading-loose text-black w-[156px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdb1d85d49e1569920ef35bfc5528c005294340ccfcfb4f3d686a17386149aff?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          alt=""
          className="object-contain shrink-0 w-4 aspect-square"
        />
        <div className="grow shrink my-auto w-[131px]">
          2 adults, 2 children
        </div>
      </div>
    </>
  );
}

export default StayInfo;
