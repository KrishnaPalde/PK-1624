import * as React from "react";

function YourBookingDetailsForm() {
  return (
    <div className="flex flex-col max-w-full sm:max-w-[480px] px-4 sm:px-0">
      <div className="self-start text-2xl font-bold text-neutral-900">
        Your Booking Details
      </div>
      <div className="flex flex-col mt-4 w-full min-h-[694px]">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-start w-full gap-8 sm:flex-row">
            <div className="flex flex-col flex-1 w-full shrink basis-0 sm:w-auto">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium leading-none text-slate-700" htmlFor="firstName">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full shrink basis-0 sm:w-auto">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium leading-none text-slate-700" htmlFor="lastName">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-6 whitespace-nowrap">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium leading-none text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-6">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium leading-none text-slate-700" htmlFor="phoneNumber">
                  Phone number
                </label>
                <div className="flex overflow-hidden mt-1.5 w-full text-base bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                  <div className="flex items-center justify-between h-full py-3 pl-4 pr-3 overflow-hidden text-gray-900 whitespace-nowrap">
                    <div className="self-stretch my-auto">US</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f288935232c2b601ff5bd7f94908d897dfaab83742491521bc37030849a2b7c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      className="self-stretch object-contain w-5 my-auto shrink-0 aspect-square"
                      alt="US flag"
                    />
                  </div>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="flex-1 shrink gap-2 self-start py-3 pr-4 text-gray-500 basis-3 min-w-[240px] border-none focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6 w-full text-sm font-medium min-h-[154px]">
            <div className="flex flex-col w-full h-[77px]">
              <div className="flex flex-col py-0.5 w-full rounded-none">
                <label className="leading-none text-slate-700" htmlFor="idNumber">
                  Aadhar Number / Passport Number
                </label>
                <input
                  id="idNumber"
                  type="text"
                  placeholder="xxxx-xxxx-xxxx"
                  className="px-4 py-3 mt-2.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                />
                <div className="flex gap-5 justify-between mt-6 max-w-full leading-loose text-slate-700 w-[302px]">
                  <div>Check In</div>
                  <div>Check Out</div>
                </div>
                <div className="flex gap-10 mt-5 w-full leading-loose text-black max-w-[368px]">
                  <div className="flex flex-1 gap-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/12d727b0b87fb91c58fc7c5facec7e18ecd44e1f125a17015ea63d8dc4e192a4?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      className="object-contain w-4 my-auto shrink-0 aspect-square"
                      alt="Check-in icon"
                    />
                    <input
                      type="date"
                      defaultValue="2024-01-02"
                      className="bg-transparent border-none"
                    />
                  </div>
                  <div className="flex flex-1 gap-1.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/768b429679718f8444e98046b5a128227f73183e7350800f6276ed4b8928b64c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      className="object-contain w-4 my-auto shrink-0 aspect-square"
                      alt="Check-out icon"
                    />
                    <input
                      type="date"
                      defaultValue="2024-01-05"
                      className="bg-transparent border-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-6 text-sm font-medium">
            <div className="flex items-start gap-8 leading-none text-slate-700">
              <div className="flex flex-col w-[100px]">
                <div className="flex flex-col w-full mt-8">
                  <div className="w-full">Guest details</div>
                </div>
              </div>
              <div className="flex shrink-0 h-5 w-[100px]" />
              <div className="flex shrink-0 h-6 w-[89px]" />
              <div className="flex shrink-0 h-5 w-[100px]" />
            </div>
            <div className="flex gap-5 justify-between mt-2.5 max-w-full leading-loose text-black w-[292px]">
              <div className="flex flex-col">
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="self-start bg-transparent border-none"
                />
                <input
                  type="text"
                  defaultValue="Lorem Ipsum"
                  className="mt-3 bg-transparent border-none"
                />
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <div className="flex justify-between gap-5">
                  <input
                    type="number"
                    defaultValue="23"
                    className="w-10 bg-transparent border-none"
                  />
                  <input
                    type="text"
                    defaultValue="Male"
                    className="bg-transparent border-none"
                  />
                </div>
                <div className="flex justify-between gap-5 mt-3">
                  <input
                    type="number"
                    defaultValue="25"
                    className="w-10 bg-transparent border-none"
                  />
                  <input
                    type="text"
                    defaultValue="Male"
                    className="bg-transparent border-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 mt-6 max-w-full text-base font-medium rounded-md text-slate-700 w-full sm:w-[331px]">
            <input
              type="checkbox"
              id="privacyPolicy"
              className="w-5 h-5 my-auto bg-white border border-gray-300 border-solid rounded-md shrink-0"
            />
            <label htmlFor="privacyPolicy" className="flex-auto w-[297px]">
              You agree to our friendly{" "}
              <span className="underline">privacy policy</span>
              <span className="text-gray-500">.</span>
            </label>
          </div>
          <div className="flex flex-row items-start self-start gap-10 mt-6 mb-10 text-lg text-center sm:flex-row">
            {/* <button className="flex-1 shrink gap-2.5 self-stretch px-2  text-sky-400 rounded border-2 border-sky-400 border-solid w-full ">
              Add more
            </button> */}
            {/* <button className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 text-white whitespace-nowrap rounded w-full  bg-sky-400">
              Next
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourBookingDetailsForm;