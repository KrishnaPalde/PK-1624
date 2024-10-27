import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBooking } from "../contexts/BookingFormContext";
import profile from "../assets/profile.png";
import { HiMiniHomeModern } from "react-icons/hi2";
import logo from "../assets/image.png";

const CheckInOutInfo = ({ time, label }) => (
  <div className="flex items-center w-full gap-2 sm:w-auto">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bae163baef7a9999b02e6db4daa72808284b603061691c7ceb228dd5ca99b480?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
      alt=""
      className="object-contain w-6 rounded sm:w-8 aspect-square shrink-0"
    />
    <div className="flex flex-col justify-center">
      <div className="text-xs font-semibold opacity-60">{label}</div>
      <div className="text-sm font-medium sm:text-base">{time}</div>
    </div>
  </div>
);

const DateInfo = ({ date, label }) => (
  <div className="flex flex-col justify-center mt-4 text-white">
    <div className="text-2xl font-semibold sm:text-3xl">{date}</div>
    <div className="mt-1 text-xs font-medium opacity-60">{label}</div>
  </div>
);

const HotelLogo = () => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-white">
    <img
      loading="lazy"
      src={logo}
      alt="Tranquil Trails"
      className="w-full h-full object-cover max-w-[280px] sm:max-w-[320px]"
    />
  </div>
);

function BookingConfirmationCard() {
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const { roomData, formData, rooms } = location.state || {};

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const checkInOutData = [
    { date: formatDate(bookingInfo.checkIn), label: "Check-In" },
    { date: formatDate(bookingInfo.checkOut), label: "Check-Out" },
  ];

  const checkInOutTimes = [
    { time: "12:00pm", label: "Check-In time" },
    { time: "11:30pm", label: "Check-Out time" },
    { time: "On arrival", label: "Room no." },
  ];

  return (
    <div className="w-full max-w-[1231px] p-4 mx-auto">
      <div className="flex flex-col max-w-3xl gap-4 mx-auto lg:flex-row lg:max-w-none">
        <article className="flex flex-col sm:flex-row flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden max-h-[400px] sm:max-h-[280px] lg:max-h-none">
          <aside className="w-full sm:w-[29%] bg-[#255d69] p-6 sm:p-6">
            <div className="flex flex-row justify-between sm:flex-col sm:justify-start">
              {checkInOutData.map((data, index) => (
                <DateInfo key={index} date={data.date} label={data.label} />
              ))}
              <div className="flex-col items-center hidden mt-6 sm:flex w-9">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6">
                  <path
                    d="M10 10 L50 50 L90 10 M50 50 L50 90"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <HiMiniHomeModern className="w-6 h-6 mx-4 text-white" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-6 h-6">
                  <path
                    d="M10 90 L50 50 L90 90 M50 50 L50 10"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </aside>

          <div className="flex flex-col w-full sm:w-[71%]">
            <header className="p-4 text-[#335064]">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <img
                    loading="lazy"
                    src={profile}
                    alt="Profile"
                    className="object-contain w-10 rounded-full sm:w-10 aspect-square"
                  />
                  <div className="text-lg font-bold">
                    {formData.firstName + " " + formData.lastName}
                  </div>
                </div>
                <div className="text-base font-medium text-left sm:text-right">
                  {rooms.map((room) => (
                    <div key={room.id}>{room.name}</div>
                  ))}
                </div>
              </div>
            </header>

            
            <main className="flex flex-col justify-between flex-grow p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {checkInOutTimes.map((info, index) => (
                  <CheckInOutInfo
                    key={index}
                    time={info.time}
                    label={info.label}
                  />
                ))}
              </div>
              
              
              <footer className="flex flex-col items-start justify-between gap-4 mt-6 sm:flex-row sm:items-center">
                <div className="flex flex-col justify-center">
                  <div className="text-lg font-semibold text-neutral-900">
                    Enjoy your holidays!!
                  </div>
                </div>
              </footer>
            </main>
          </div>
        </article>

        <aside className="flex w-full lg:w-[375px] h-[160px] sm:h-[280px] lg:h-full bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-center w-full h-full">
            <div className="flex items-center justify-center w-full h-full ">
              <HotelLogo />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BookingConfirmationCard;