import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBooking } from "../contexts/BookingFormContext";

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
  <div className="flex overflow-hidden gap-4 px-4 py-3.5 max-w-full bg-white w-[180px]">
    <div className="flex shrink-0 bg-black rounded-full h-[35px] w-[35px]" />
    <div className="my-auto">Hotel logo</div>
  </div>
);

function BookingConfirmationCard() {
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const {roomData, formData} = location.state || {};
  console.log(formData);

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
      <article className="overflow-hidden flex-1 shrink bg-white rounded-2xl border border-gray-200 border-solid basis-[140px] min-w-[240px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <aside className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center items-start px-6 py-9 w-full bg-sky-100 min-h-[309px] max-md:px-5">
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
          <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
            <header className="flex flex-col w-full mx-auto overflow-hidden bg-white max-md:max-w-full">
              <div className="flex items-start gap-10 p-6 font-bold text-white bg-sky-300 max-md:px-5">
                <div className="flex flex-wrap flex-1 shrink gap-10 justify-between items-center w-full basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="flex items-center self-stretch gap-4 my-auto text-xl">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d32045c180ef538085cd4b3473c097a082242b3ba121b8d82e01adff6b37d5c2?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      alt="Profile"
                      className="self-stretch object-contain w-12 my-auto rounded-full shrink-0 aspect-square"
                    />
                    <div className="self-stretch my-auto w-[141px]">
                      {formData.firstName +" "+ formData.lastName}
                    </div>
                  </div>
                  <div className="my-auto text-sm text-right w-[228px]">
                    {/* Superior room - 1 double bed or 2 twin beds */}
                    {roomData.title}
                  </div>
                </div>
              </div>
              <main className="flex flex-wrap items-start w-full gap-8 p-6 text-neutral-900 max-md:px-5 max-md:max-w-full">
                {checkInOutTimes.map((info, index) => (
                  <CheckInOutInfo
                    key={index}
                    time={info.time}
                    label={info.label}
                  />
                ))}
              </main>
              <footer className="flex flex-wrap gap-5 justify-between items-start self-end mt-10 max-w-full w-[580px]">
                <div className="flex flex-col justify-center whitespace-nowrap text-neutral-900">
                  <div className="text-3xl font-semibold">EK</div>
                  <div className="mt-1 text-xs font-medium opacity-60">
                    ABC12345
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 mt-3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c87486076c9b402bd6f4d591103b05ac941d6e373e6fb7727f3b7252be8b62c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    alt="Star"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-[0.49] fill-neutral-900"
                  />
                </div>
              </footer>
            </header>
          </div>
        </div>
      </article>
      <aside className="flex overflow-hidden flex-col justify-center items-center px-16 py-32 my-auto text-xl font-extrabold text-black bg-white rounded-2xl border border-gray-200 border-solid min-w-[240px] w-[375px] max-md:px-5 max-md:py-24">
        <HotelLogo />
      </aside>
    </section>
  );
}

export default BookingConfirmationCard;


