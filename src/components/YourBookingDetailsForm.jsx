// import * as React from "react";

// function YourBookingDetailsForm() {
//   return (
//     <div className="flex flex-col max-w-[480px]">
//       <div className="self-start text-2xl font-bold text-neutral-900">
//         Your Booking Details
//       </div>
//       <div className="flex flex-col mt-4 w-full min-h-[694px]">
//         <div className="flex flex-col w-full">
//           <div className="flex items-start w-full gap-8">
//             <div className="flex flex-col flex-1 shrink basis-0">
//               <div className="flex flex-col w-full">
//                 <div className="flex flex-col w-full">
//                   <div className="text-sm font-medium leading-none text-slate-700">
//                     First name
//                   </div>
//                   <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
//                     <div className="self-stretch flex-1 w-full gap-2 my-auto shrink">
//                       First name
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col flex-1 shrink basis-0">
//               <div className="flex flex-col w-full">
//                 <div className="flex flex-col w-full">
//                   <div className="text-sm font-medium leading-none text-slate-700">
//                     Last name
//                   </div>
//                   <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
//                     <div className="self-stretch flex-1 w-full gap-2 my-auto shrink">
//                       Last name
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col w-full mt-6 whitespace-nowrap">
//             <div className="flex flex-col w-full">
//               <div className="flex flex-col w-full">
//                 <div className="text-sm font-medium leading-none text-slate-700">
//                   Email
//                 </div>
//                 <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
//                   <div className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px]">
//                     you@company.com
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col w-full mt-6">
//             <div className="flex flex-col w-full">
//               <div className="flex flex-col w-full">
//                 <div className="text-sm font-medium leading-none text-slate-700">
//                   Phone number
//                 </div>
//                 <div className="flex overflow-hidden mt-1.5 w-full text-base bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
//                   <div className="flex items-center justify-between h-full py-3 pl-4 pr-3 overflow-hidden text-gray-900 whitespace-nowrap">
//                     <div className="self-stretch my-auto">US</div>
//                     <img
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f288935232c2b601ff5bd7f94908d897dfaab83742491521bc37030849a2b7c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
//                       className="self-stretch object-contain w-5 my-auto shrink-0 aspect-square"
//                     />
//                   </div>
//                   <div className="flex-1 shrink gap-2 self-start py-3 pr-4 text-gray-500 basis-3 min-w-[240px]">
//                     +1 (555) 000-0000
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col mt-6 w-full text-sm font-medium min-h-[154px]">
//             <div className="flex flex-col w-full h-[77px]">
//               <div className="flex flex-col py-0.5 w-full rounded-none">
//                 <div className="leading-none text-slate-700">
//                   Aadhar Number / Passport Number
//                 </div>
//                 <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-2.5 text-base text-gray-500 whitespace-nowrap bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
//                   <div className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px]">
//                     xxxx-xxxx-xxxx
//                   </div>
//                 </div>
//                 <div className="flex gap-5 justify-between mt-6 max-w-full leading-loose text-slate-700 w-[302px]">
//                   <div>Check In</div>
//                   <div>Check Out</div>
//                 </div>
//                 <div className="flex gap-10 mt-5 w-full leading-loose text-black max-w-[368px]">
//                   <div className="flex flex-1 gap-2.5">
//                     <img
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/12d727b0b87fb91c58fc7c5facec7e18ecd44e1f125a17015ea63d8dc4e192a4?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
//                       className="object-contain w-4 my-auto shrink-0 aspect-square"
//                     />
//                     <div className="basis-auto">02 January 2024</div>
//                   </div>
//                   <div className="flex flex-1 gap-1.5">
//                     <img
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/768b429679718f8444e98046b5a128227f73183e7350800f6276ed4b8928b64c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
//                       className="object-contain w-4 my-auto shrink-0 aspect-square"
//                     />
//                     <div className="basis-auto">05 January 2024</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col w-full mt-6 text-sm font-medium">
//             <div className="flex items-start gap-8 leading-none text-slate-700">
//               <div className="flex flex-col w-[100px]">
//                 <div className="flex flex-col w-full">
//                   <div className="w-full">Guest details</div>
//                 </div>
//               </div>
//               <div className="flex shrink-0 h-5 w-[100px]" />
//               <div className="flex shrink-0 h-6 w-[89px]" />
//               <div className="flex shrink-0 h-5 w-[100px]" />
//             </div>
//             <div className="flex gap-5 justify-between mt-2.5 max-w-full leading-loose text-black w-[292px]">
//               <div className="flex flex-col">
//                 <div className="self-start">John Doe</div>
//                 <div className="mt-3">Lorem Ipsum</div>
//               </div>
//               <div className="flex flex-col whitespace-nowrap">
//                 <div className="flex justify-between gap-5">
//                   <div>23</div>
//                   <div>Male</div>
//                 </div>
//                 <div className="flex justify-between gap-5 mt-3">
//                   <div>25</div>
//                   <div>Male</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-2.5 mt-6 max-w-full text-base font-medium rounded-md text-slate-700 w-[331px]">
//             <div className="flex w-5 h-5 my-auto bg-white border border-gray-300 border-solid rounded-md shrink-0" />
//             <div className="flex-auto w-[297px]">
//               You agree to our friendly{" "}
//               <span className="underline">privacy policy</span>
//               <span className="text-gray-500">.</span>
//             </div>
//           </div>
//           <div className="flex items-start self-start gap-10 mt-6 text-xl text-center">
//             <div className="flex-1 shrink gap-2.5 self-stretch px-4 py-4 text-sky-400 rounded border-2 border-sky-400 border-solid w-[150px]">
//               Add more
//             </div>
//             <div className="flex-1 shrink gap-2.5 self-stretch px-4 py-4 text-white whitespace-nowrap rounded w-[150px] bg-sky-400">
//               Next
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default YourBookingDetailsForm;

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
                  <div className="text-sm font-medium leading-none text-slate-700">
                    First name
                  </div>
                  <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                    <div className="self-stretch flex-1 w-full gap-2 my-auto shrink">
                      First name
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 w-full shrink basis-0 sm:w-auto">
              <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
                  <div className="text-sm font-medium leading-none text-slate-700">
                    Last name
                  </div>
                  <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                    <div className="self-stretch flex-1 w-full gap-2 my-auto shrink">
                      Last name
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-6 whitespace-nowrap">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <div className="text-sm font-medium leading-none text-slate-700">
                  Email
                </div>
                <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                  <div className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px]">
                    you@company.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-6">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full">
                <div className="text-sm font-medium leading-none text-slate-700">
                  Phone number
                </div>
                <div className="flex overflow-hidden mt-1.5 w-full text-base bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                  <div className="flex items-center justify-between h-full py-3 pl-4 pr-3 overflow-hidden text-gray-900 whitespace-nowrap">
                    <div className="self-stretch my-auto">US</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f288935232c2b601ff5bd7f94908d897dfaab83742491521bc37030849a2b7c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      className="self-stretch object-contain w-5 my-auto shrink-0 aspect-square"
                    />
                  </div>
                  <div className="flex-1 shrink gap-2 self-start py-3 pr-4 text-gray-500 basis-3 min-w-[240px]">
                    +1 (555) 000-0000
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6 w-full text-sm font-medium min-h-[154px]">
            <div className="flex flex-col w-full h-[77px]">
              <div className="flex flex-col py-0.5 w-full rounded-none">
                <div className="leading-none text-slate-700">
                  Aadhar Number / Passport Number
                </div>
                <div className="flex overflow-hidden gap-2 items-center px-4 py-3 mt-2.5 text-base text-gray-500 whitespace-nowrap bg-white rounded-lg border border-gray-300 border-solid shadow-sm">
                  <div className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px]">
                    xxxx-xxxx-xxxx
                  </div>
                </div>
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
                    />
                    <div className="basis-auto">02 January 2024</div>
                  </div>
                  <div className="flex flex-1 gap-1.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/768b429679718f8444e98046b5a128227f73183e7350800f6276ed4b8928b64c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                      className="object-contain w-4 my-auto shrink-0 aspect-square"
                    />
                    <div className="basis-auto">05 January 2024</div>
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
                <div className="self-start">John Doe</div>
                <div className="mt-3">Lorem Ipsum</div>
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <div className="flex justify-between gap-5">
                  <div>23</div>
                  <div>Male</div>
                </div>
                <div className="flex justify-between gap-5 mt-3">
                  <div>25</div>
                  <div>Male</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2.5 mt-6 max-w-full text-base font-medium rounded-md text-slate-700 w-full sm:w-[331px]">
            <div className="flex w-5 h-5 my-auto bg-white border border-gray-300 border-solid rounded-md shrink-0" />
            <div className="flex-auto w-[297px]">
              You agree to our friendly{" "}
              <span className="underline">privacy policy</span>
              <span className="text-gray-500">.</span>
            </div>
          </div>
          <div className="flex flex-row items-start self-start gap-10 mt-6 mb-10 text-lg text-center sm:flex-row">
            <div className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 text-sky-400 rounded border-2 border-sky-400 border-solid w-full ">
              Add more
            </div>
            <div className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 text-white whitespace-nowrap rounded w-full  bg-sky-400">
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourBookingDetailsForm;