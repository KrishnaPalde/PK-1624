// import React from "react";

// function NewsLetter() {
//   return (
//     <section className="flex gap-5 justify-between self-center pl-16 mt-44 max-w-full bg-sky-100 border border-solid border-zinc-200 rounded-[30px] w-[1224px] max-md:flex-wrap max-md:pl-5 max-md:mt-10">
//       <div className="flex flex-col my-auto max-md:max-w-full">
//         <div className="self-start px-6 py-5 text-base font-bold text-center text-black bg-yellow-400 rounded-[50px] max-md:px-5">
//           Join our newsletter
//         </div>
//         <h2 className="text-3xl font-semibold leading-9 text-black mt-7 max-md:max-w-full">
//           Subscribe to see secret deals <br /> prices drop the moment you
//           signup!
//         </h2>
//         <form className="flex gap-5 justify-between px-8 mt-8 bg-white border border-solid border-zinc-200 rounded-[50px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
//           <input
//             type="email"
//             placeholder="Your Email"
//             className="my-auto text-base text-neutral-400"
//           />
//           <button
//             type="submit"
//             className="px-9 py-6 text-sm font-bold text-center text-white whitespace-nowrap bg-sky-400 rounded-[50px] max-md:px-5"
//           >
//             Subscribe
//           </button>
//         </form>
//         <p className="mt-5 text-sm font-medium text-neutral-500 max-md:max-w-full">
//           No ads. No trials. No commitments
//         </p>
//       </div>
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/71dd4471539c37ccc60a104cc0d512b01ecabb5c48c94bb8eabe9c3a59666fe6?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
//         alt="Newsletter illustration"
//         className="w-full aspect-[0.93] rounded-[30px_30px_0px_0px]"
//       />
//     </section>
//   );
// }

// export default NewsLetter;

import React from "react";

function NewsLetter() {
  return (
    <section className="flex flex-col md:flex-row bg-sky-100 rounded-[30px] overflow-hidden max-w-full mx-auto md:h-[400px] xl:space-x-80">
      <div className="flex flex-col p-8 md:p-18 md:w-1/2">
        <div className="self-start px-6 py-3 text-base font-bold text-center text-black bg-yellow-400 rounded-[50px]">
          Join our newsletter
        </div>
        <h2 className="text-2xl font-semibold leading-tight text-black md:text-3xl mt-7">
          Subscribe to see secret deals
          <br />
          prices drop the moment you signup!
        </h2>
        <form className="flex flex-col gap-3 mt-8 sm:flex-row">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-grow px-6 py-4 text-base text-neutral-400 bg-white border border-solid border-zinc-200 rounded-[50px]"
          />
          <button
            type="submit"
            className="px-9 py-4 text-sm font-bold text-center text-white whitespace-nowrap bg-sky-400 rounded-[50px]"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-5 text-sm font-medium text-neutral-500">
          No ads. No trials. No commitments
        </p>
      </div>
      <div className="h-64 md:w-1/2 md:h-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/71dd4471539c37ccc60a104cc0d512b01ecabb5c48c94bb8eabe9c3a59666fe6?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
          alt="Newsletter illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}

export default NewsLetter;