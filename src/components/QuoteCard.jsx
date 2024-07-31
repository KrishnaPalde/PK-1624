// import React from "react";

// const QuoteCard = ({ quote, author }) => {
//   return (
//     <div className="flex flex-col w-[59%] max-md:ml-0 max-md:w-full">
//       <div className="flex flex-col grow justify-center w-full bg-sky-100 rounded-[30px]">
//         <div className="flex flex-col items-start pl-12 pr-px py-9 max-md:pl-5">
//           <div className="text-5xl font-black text-slate-600 max-md:text-4xl">
//             quote-left
//           </div>
//           <blockquote className="mt-5 text-2xl italic font-semibold leading-7 text-slate-700">
//             {quote}
//           </blockquote>
//           <cite className="mt-5 text-2xl text-orange-300">{author}</cite>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuoteCard;



import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons/faQuoteLeft";


const QuoteCard = ({ quote, author }) => {
  return (
    <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow justify-center w-full bg-sky-100 rounded-[30px] p-5 max-md:p-4">
        <div className="text-5xl font-black text-slate-600 max-md:text-4xl">
          <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon> {/* Ensure the icon is displayed */}
        </div>
        <blockquote className="mt-5 text-2xl italic font-semibold leading-7 text-slate-700">
          {quote}
        </blockquote>
        <cite className="mt-5 text-2xl text-orange-300">{author}</cite>
      </div>
    </div>
  );
};

export default QuoteCard;
