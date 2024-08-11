import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BookingForm() {
  const [location, setLocation] = useState("New York, USA");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);

  const handleCheckInChange = (date) => {
    setCheckIn(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date);
  };

  const handleAdultsChange = (type) => {
    if (type === "increment") {
      setAdults(adults + 1);
    } else {
      setAdults(adults > 0 ? adults - 1 : 0);
    }
  };

  const handleChildrenChange = (type) => {
    if (type === "increment") {
      setChildren(children + 1);
    } else {
      setChildren(children > 0 ? children - 1 : 0);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get("https://pk-1624.onrender.com/api/check_availability_dates", {
      // const response = await axios.get("https://localhost:4444/api/check_availability_dates", {

        params: {
          checkinDate: checkIn.toISOString(),
          checkoutDate: checkOut.toISOString(),
        },
      });

      if (response.data.available) {
        navigate("/bookings", {
          state: { checkIn, checkOut, adults, children },
        });
      } else {
        setError("Selected dates are not available. Please choose different dates.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error checking availability:", error);
    }
  };
  
  
  return (
    <form onSubmit={handleSearch} className="mb-5 w-full max-w-[1224px] bg-white rounded-2xl border border-solid border-zinc-200 shadow-[0px_4px_30px_rgba(36,76,236,0.15)] p-7 space-y-5 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-black">Book a Room</h2>
          <p className="mt-2 text-sm text-zinc-600">Discover the perfect space for you!</p>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f52b4f26e250d854cf478ad34a6476653b6599a7c2df94d2cf950a3d97fbf92b?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
          alt=""
          className="w-[133px] h-auto"
        />
      </div>
      
      <div className="flex flex-col items-start gap-5 p-5 bg-white border border-solid md:flex-row rounded-2xl border-zinc-200">
        <div className="flex-1 space-y-2 md:w-1/4">
          <label htmlFor="checkIn" className="text-sm font-medium text-neutral-500">
            Check In
          </label>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/571d9769611fbe06cad72c7a54fd5f7eedfa19f8753c2f5633f0973bd49e173a?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt=""
              className="w-4 h-4"
            />
            <DatePicker
              id="checkIn"
              selected={checkIn}
              onChange={handleCheckInChange}
              dateFormat="dd/MM/yyyy"
              className="w-full text-base font-medium bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="hidden w-px md:block h-14 bg-zinc-200"></div>

        <div className="flex-1 space-y-2 md:w-1/4">
          <label htmlFor="checkOut" className="text-sm font-medium text-neutral-500">
            Check Out
          </label>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f86afc0cd2f726681d661e344bc531a1f3c4f638c80b8f3b8d3026730e594a4b?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt=""
              className="w-4 h-4"
            />
            <DatePicker
              id="checkOut"
              selected={checkOut}
              onChange={handleCheckOutChange}
              dateFormat="dd/MM/yyyy"
              className="w-full text-base font-medium bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="hidden w-px md:block h-14 bg-zinc-200"></div>

        <div className="flex-1 space-y-2 md:w-1/3">
          <label className="text-sm font-medium text-neutral-500">Guest</label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d7c87ccfa99edd3fc6effb16ea90ada291298e87e8d25b3615e2a9f513cdff9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt=""
                  className="w-4 h-4"
                />
                <span className="text-base font-medium">Adults</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleAdultsChange("decrement")} className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200">-</button>
                <span className="text-base font-medium">{adults}</span>
                <button type="button" onClick={() => handleAdultsChange("increment")} className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200">+</button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d7c87ccfa99edd3fc6effb16ea90ada291298e87e8d25b3615e2a9f513cdff9?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt=""
                  className="w-4 h-4"
                />
                <span className="text-base font-medium">Children</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleChildrenChange("decrement")} className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200">-</button>
                <span className="text-base font-medium">{children}</span>
                <button type="button" onClick={() => handleChildrenChange("increment")} className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200">+</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-none mt-4 md:self-end md:mt-0">
          <Link to="/bookings">
            <button
              type="submit"
              className="flex items-center gap-3 px-8 py-4 text-base font-medium text-white transition-colors duration-300 rounded-full bg-sky-400 hover:bg-sky-500"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa64914cca97a3fae2c7790d2c452bfa83ddb2b2198d998ffa1b86cddf144d7f?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="w-5 h-5"
              />
              <span>Search</span>
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}
export default BookingForm;