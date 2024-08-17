import React from "react";

const BookingConfirmTitle = () => {
    <main className="flex flex-wrap items-center gap-10">
    <section className="flex flex-col self-stretch my-auto min-w-[240px] text-neutral-900 w-[326px]">
      <header className="flex gap-4 items-center max-w-full text-2xl font-bold w-[326px]">
        <h2 className="self-stretch px-0.5 my-auto min-w-[240px] w-[326px]">
          Tantra Worlds
        </h2>
      </header>
      <address
        className="flex flex-col mt-4 text-sm font-medium"
        itemProp="address"
        itemScope
        itemType="http://schema.org/PostalAddress"
        >
        <div className="flex items-center justify-center gap-1">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6b633bd9b1c06d5f6f44dc9542ef204568ce0601632069b272baa89c86300ac?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
            alt="Location Icon"
          />
          <p
            className="self-stretch my-auto opacity-75"
            itemProp="streetAddress"
            >
            title
          </p>
        </div>
      </address>
    </section>
    <section className="flex flex-col items-end self-stretch my-auto">
      <div className="text-3xl font-bold text-right text-blue-600">₹2650</div>
      <div className="flex items-start gap-4 mt-4">
        <div className="flex flex-col w-12">
          <div
            className="flex gap-1 justify-center items-center p-3.5 w-12 rounded border border-sky-400 border-solid min-h-[48px]"
            role="button"
            tabIndex="0"
            >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e4b35e685d516c78cbbce8ebf241dce73dd6aaac0129e9cf7efa008af3ebc1d?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              className="self-stretch object-contain w-5 my-auto aspect-square"
              alt="Download Icon"
              />
          </div>
        </div>
        <button className="flex flex-col text-sm font-semibold text-white whitespace-nowrap w-[150px] gap-1 self-stretch p-4 w-full bg-sky-400 rounded min-h-[48px]">
          Download
        </button>
      </div>
    </section>
  </main>
};

export default BookingConfirmTitle;
