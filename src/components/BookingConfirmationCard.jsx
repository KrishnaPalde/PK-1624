import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBooking } from "../contexts/BookingFormContext";
import profile from '../assets/profile.png'
import logo from '../assets/logo.png';

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
  <div className="flex flex-col justify-center mt-4 text-neutral-900">
    <div className="text-3xl font-semibold">{date}</div>
    <div className="mt-1 text-xs font-medium opacity-60">{label}</div>
  </div>
);

const HotelLogo = () => (
  <div className="flex flex-col items-center justify-center w-full h-full bg-white">
    <img src={logo} alt="Tranquil Trails" className="object-contain max-w-full max-h-full" />
  </div>
);

function BookingConfirmationCard() {
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const {roomData, formData} = location.state || {};

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
        <aside className="flex flex-col w-[29%] bg-sky-100 max-md:w-full">
          <div className="flex flex-col items-start justify-center w-full h-full px-6 grow py-9">
            {checkInOutData.map((data, index) => (
              <DateInfo key={index} date={data.date} label={data.label} />
            ))}
            <div className="flex flex-col items-center mt-4 w-9 rounded rotate-[1.0183166411256147e-16rad]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd931a9fd4ffdb90ced3b9df9983ff46ddd1aeb55e9dffe3068464771c1feb12?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                alt=""
                className="object-contain w-full aspect-[1.39] stroke-[0.5px] stroke-neutral-900"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b15c651e47940c6412188abdd0a4339dfafba9905bcfbaad316405d180a104bc?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                alt=""
                className="object-contain w-full mt-2 aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a42fb4b9f898f8c7f6d257410dd2b6004f2938e248579a6c8064f636bef3be0e?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                alt=""
                className="object-contain mt-2 w-full aspect-[1.39] stroke-[0.5px] stroke-neutral-900"
              />
            </div>
          </div>
        </aside>
        <div className="flex flex-col w-[71%] h-full max-md:w-full">
          <header className="flex flex-col w-full p-6 text-white bg-sky-300 max-md:px-5">
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
              <div className="text-sm text-right">
                {roomData.name + " - " + roomData.title}
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
                <div className="text-3xl font-semibold">EK</div>
                <div className="mt-1 text-xs font-medium opacity-60">
                  ABC12345
                </div>
              </div>
              <div className="flex items-center justify-center p-4">
                <div className="w-32 h-16 bg-gray-200"></div>
              </div>
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