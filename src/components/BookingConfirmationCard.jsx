import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBooking } from "../contexts/BookingFormContext";
import profile from "../assets/profile.png";
import { HiMiniHomeModern } from "react-icons/hi2";
import logo from "../assets/logofull.png";

const CheckInOutInfo = ({ time, label }) => (
  <div className="flex items-center gap-2">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bae163baef7a9999b02e6db4daa72808284b603061691c7ceb228dd5ca99b480?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
      alt=""
      className="self-stretch object-contain w-8 my-auto rounded shrink-0 aspect-square"
    />
    <div className="flex flex-col self-stretch justify-center my-auto">
      <div className="text-xs font-semibold opacity-60">{label}</div>
      <div className="text-base font-medium">{time}</div>
    </div>
  </div>
);

const DateInfo = ({ date, label }) => (
  <div className="flex flex-col justify-center mt-4 text-white">
    <div className="text-3xl font-semibold">{date}</div>
    <div className="mt-1 text-xs font-medium opacity-60">{label}</div>
  </div>
);

const HotelLogo = () => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-white">
    <img
      loading="lazy"
      src={logo}
      alt="Tranquil Trails"
      className="object-contain max-w-full max-h-full"
    />
  </div>
);

function BookingConfirmationCard() {
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const { roomData, formData, rooms} = location.state || {};

  console.log(rooms);

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
    <section className="flex flex-wrap w-full max-w-[1231px] max-md:max-w-full">
      <article className="flex flex-1 overflow-hidden bg-white rounded-2xl border border-gray-200 border-solid basis-[140px] min-w-[240px] max-md:max-w-full">
        <aside className="flex flex-col w-[29%] bg-[#255d69] max-md:w-full text-white">
          <div className="flex flex-col items-start justify-center w-full h-full px-6 grow py-9">
            {checkInOutData.map((data, index) => (
              <DateInfo key={index} date={data.date} label={data.label} />
            ))}
            <div className="flex flex-col items-center mt-4 w-9 rounded rotate-[1.0183166411256147e-16rad]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path
                  d="M10 10 L50 50 L90 10 M50 50 L50 90"
                  stroke="white"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
              <HiMiniHomeModern className="w-8 h-8 mx-4 text-white" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path
                  d="M10 90 L50 50 L90 90 M50 50 L50 10"
                  stroke="white"
                  stroke-width="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </aside>
        <div className="flex flex-col w-[71%] h-full max-md:w-full">
          <header className="flex flex-col w-full p-6 text-[#335064]  max-md:px-5">
            <div className="flex flex-wrap items-center justify-between w-full">
              <div className="flex items-center gap-4 text-xl font-bold">
                <img
                  loading="lazy"
                  src={profile}
                  alt="Profile"
                  className="object-contain w-12 rounded-full shrink-0 aspect-square"
                />
                <div>{formData.firstName + " " + formData.lastName}</div>
              </div>
              <div className="text-lg font-medium text-right">
                {rooms.map((room) => (
                  <div key={room.id}>
                    {room.name}
                    <br/>
                  </div>
                ))}
              </div>
            </div>
          </header>
          <main className="flex flex-col justify-between flex-grow p-6 text-neutral-900 max-md:px-5">
            <div className="flex flex-wrap items-start w-full gap-8">
              {checkInOutTimes.map((info, index) => (
                <CheckInOutInfo
                  key={index}
                  time={info.time}
                  label={info.label}
                />
              ))}
            </div>
            <footer className="flex flex-wrap items-center self-end justify-between w-full gap-5 mt-auto">
              <div className="flex flex-col justify-center whitespace-nowrap text-neutral-900">
                <div className="text-xl font-semibold">Enjoy your holidays!!</div>
                {/* <div className="mt-1 text-xs font-medium opacity-60">
                  ABC12345
                </div> */}
              </div>
              {/* <div className="flex items-center justify-center p-4">
                <div className="w-32 h-16 bg-gray-200"></div>
              </div> */}
            </footer>
          </main>
        </div>
      </article>
      <aside className="flex overflow-hidden flex-col justify-center items-center text-xl font-extrabold text-black bg-white rounded-2xl border border-gray-200 border-solid min-w-[240px] w-[375px] max-md:w-full">
        <HotelLogo />
      </aside>
    </section>
  );
}

export default BookingConfirmationCard;
