// import React from "react";
// import { FaStar } from "react-icons/fa"; 

// const StarRating = ({ rating  }) => {

//   return (
//     <div className="flex space-x-1">
//       {[...Array(5)].map((star, index) => {
//         const ratingValue = index + 1;
//         return (
//           <label key={index}>
//             <input
//               type="radio"
//               name="rating"
//               value={ratingValue}
//               className="hidden"
//             />
//             <FaStar
//               className="cursor-pointer"
//               size={30}
//               color="#ffc107"
//             />
//           </label>
//         );
//       })}
//     </div>
//   );
// };


// function TestimonialCard({ name, comments, overallExperience }) {
//   return (
//     <div
//       className={`flex flex-col px-10 py-9 w-full bg-sky-100 border border-solid border-zinc-200 rounded-[32px] max-md:px-5 max-md:mt-6`}
//     >
//       <div className="flex items-start justify-between w-full gap-5 pb-6 border-b border-zinc-200">
//         <div className="flex self-start gap-3 text-black">
//           {/* <img
//             loading="lazy"
//             src={imageSrc}
//             alt={name}
//             className="shrink-0 w-16 aspect-square rounded-[32px]"
//           /> */}
//           <div className="flex flex-col my-auto">
//             <div className="text-lg font-bold">{name}</div>
//             {/* <div className="mt-3.5 text-sm font-medium">{location}</div> */}
//           </div>
//         </div>
//         <div className="flex gap-0.5 self-end mt-11 max-md:mt-10">
//           <StarRating  rating={overallExperience} />
//         </div>
//       </div>
//       <p className="text-sm leading-6 mt-9 text-neutral-500">{comments}</p>
//     </div>
//   );
// }

// export default TestimonialCard;

import React from "react";
import { FaStar } from "react-icons/fa";
import profile from '../assets/profile.png';

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className="w-3 shrink-0"
          color={index < rating ? "#ffc107" : "#e4e5e9"}
        />
      ))}
    </div>
  );
};

function TestimonialCard({ name, comments, overallExperience }) {
  // Default background color, can be made dynamic if needed
  const bgColor = "bg-sky-100";

  return (
    <div
      className={`flex flex-col px-10 py-9 w-full ${bgColor} border border-solid border-zinc-200 rounded-[32px] max-md:px-5 max-md:mt-6`}
    >
      <div className="flex items-start justify-between w-full gap-5 pb-6 border-b border-zinc-200">
        <div className="flex self-start gap-3 text-black">
          <img
            loading="lazy"
            src={profile} 
            alt={name}
            className="shrink-0 w-16 aspect-square rounded-[32px]"
          />
          <div className="flex flex-col my-auto">
            <div className="text-lg font-bold">{name}</div>
          </div>
        </div>
        <div className="flex gap-0.5  self-center ">
          <StarRating rating={overallExperience} />
        </div>
      </div>
      <p className="text-sm leading-6 mt-9 text-neutral-500">{comments}</p>
    </div>
  );
}

export default TestimonialCard;
