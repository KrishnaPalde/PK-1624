import React from "react";
import { Link } from "react-router-dom";

function BookingForm() {
  return (
    <form className="hidden md:flex z-10 flex-col self-center px-7 py-7 mt-0 w-full bg-white rounded-2xl border border-solid border-zinc-200 max-w-[1224px] shadow-[0px_4px_30px_rgba(36,76,236,0.15)] max-md:px-5 max-md:max-w-full">
      <div className="flex justify-between gap-5 font-medium text-center max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col">
          <h2 className="text-2xl text-black">Book a Room</h2>
          <p className="mt-3 text-sm text-zinc-600">
            Discover the perfect space for you!
          </p>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f52b4f26e250d854cf478ad34a6476653b6599a7c2df94d2cf950a3d97fbf92b?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
          alt=""
          className="shrink-0 my-auto max-w-full aspect-[5.88] w-[133px]"
        />
      </div>
      <div className="flex w-full gap-5 py-4 mt-5 font-bold bg-white border border-solid px-7 rounded-2xl border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full max-md:py-3">
        <div className="flex items-center justify-between flex-auto gap-5 text-sm max-md:flex-wrap max-md:gap-3">
          <div className="flex flex-col self-stretch my-auto">
            <label htmlFor="location" className="text-neutral-500">
              Location
            </label>
            <div className="flex gap-5 mt-3 text-black max-md:mt-2">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a827a6409e0fe5332cc6974caa72b485a63df97c611396b1d3b4feefc2be528?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt=""
                  className="w-4 shrink-0 aspect-square"
                />
                <input
                  id="location"
                  type="text"
                  defaultValue="New York, USA"
                  className="w-full my-auto" 
                />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/40a1176b60abe47c4748dac478311cf776a1f62ea6af47149f0b1aab61b80f56?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 my-auto w-3.5 aspect-[1.41]"
              />
            </div>
          </div>
          <div className="shrink-0 self-start w-px bg-zinc-200 h-[46px] max-md:h-[36px]" />
          <div className="flex flex-col self-stretch my-auto">
            <label htmlFor="checkIn" className="text-neutral-500">
              Check In
            </label>
            <div className="flex justify-between gap-5 mt-3 text-black max-md:mt-2">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/571d9769611fbe06cad72c7a54fd5f7eedfa19f8753c2f5633f0973bd49e173a?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt=""
                  className="w-4 shrink-0 aspect-square"
                />
                <input
                  id="checkIn"
                  type="date"
                  defaultValue="2024-01-02"
                  className="flex-auto w-3/4" 
                />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6530537f806f771460c6ec317fa0f06dd9aba55ee543f63f6346212ee2c768db?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 my-auto w-3.5 aspect-[1.41]"
              />
            </div>
          </div>
          <div className="shrink-0 self-start w-px bg-zinc-200 h-[46px] max-md:h-[36px]" />
          <div className="flex flex-col self-stretch my-auto">
            <label htmlFor="checkOut" className="text-neutral-500">
              Check Out
            </label>
            <div className="flex justify-between gap-5 mt-3 text-black max-md:mt-2">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f86afc0cd2f726681d661e344bc531a1f3c4f638c80b8f3b8d3026730e594a4b?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt=""
                  className="w-4 shrink-0 aspect-square"
                />
                <input
                  id="checkOut"
                  type="date"
                  defaultValue="2024-01-02"
                  className="flex-auto w-3/4" 
                />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd7e5f5ab054fc13fbebb3b5ff4e24bad7bc58dbc0d3eeb2f823fdb8443e4f8d?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 my-auto w-3.5 aspect-[1.41]"
              />
            </div>
          </div>
          <div className="shrink-0 self-start w-px bg-zinc-200 h-[46px] max-md:h-[36px]" />
          <div className="flex flex-col self-stretch my-auto">
            <label htmlFor="guests" className="text-neutral-500">
              Guest
            </label>
            <div className="flex gap-4 mt-3 text-black max-md:mt-2">
              <div className="flex gap-1.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d7c87ccfa99edd3fc6effb16ea90ada291298e87e8d25b3615e2a9f513cdff9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt=""
                  className="w-4 shrink-0 aspect-square"
                />
                <input
                  id="guests"
                  type="text"
                  defaultValue="2 adults, 2 children"
                  className="flex-auto w-2/4 my-auto" 
                />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6c69a9252abc3cb3aecfeb10c56c52c381286d6234f386b1d4043479eb77fad?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 my-auto w-3.5 aspect-[1.41]"
              />
            </div>
          </div>
        </div>
        <Link to="/bookings">
        <button
          type="submit"
          className="flex gap-3 px-8 py-4 text-base items-center text-center text-white whitespace-nowrap bg-sky-400 rounded-[50px] max-md:px-5 max-md:py-3"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa64914cca97a3fae2c7790d2c452bfa83ddb2b2198d998ffa1b86cddf144d7f?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
            alt=""
            className="w-5 shrink-0 aspect-square"
          />
          <span className="my-auto">Search</span>
        </button>
          </Link>
      </div>
    </form>
  );
}

export default BookingForm;
