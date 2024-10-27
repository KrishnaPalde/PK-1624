// import React from "react";

// function RoomCard({ guests, title, image, isLarge = false }) {
//   return (
//     <article className="flex flex-col grow pb-1.5 text-sm font-medium leading-5 text-zinc-800 max-md:mt-10">
//       <img
//         loading="lazy"
//         src={image}
//         alt={title}
//         className={`w-full rounded-[30px] ${
//           isLarge ? "aspect-[0.77]" : "aspect-[1.45]"
//         }`}
//       />
//       <p className="mt-5 max-md:mr-1">{guests} GUESTS</p>
//       <h2 className="mt-4 text-2xl font-bold text-zinc-800 max-md:mr-1">
//         {title}
//       </h2>
//     </article>
//   );
// }

import React from "react";

function RoomCard({ guests, name,title, image, isLarge = false, onClick }) {
  const handleImageError = (e) => {
    e.target.src = "/path/to/placeholder-image.jpg";  
  };

  return (
    <article className="flex flex-col grow pb-1.5 text-sm font-medium leading-5 text-zinc-800 max-md:mt-10 cursor-pointer" onClick={onClick}>
      <img
        loading="lazy"
        src={image}
        alt={title}
        onError={handleImageError}
        className={`w-full rounded-[30px] transform transition-all duration-300 hover:scale-[1.08] 
    shadow-lg hover:shadow-xl group ${
          isLarge ? "aspect-[0.77]" : "aspect-[1.45]"
        } object-cover`}  
      />
      {/* <p className="mt-5 max-md:mr-1">{guests} GUESTS</p> */}
      <h2 className="mt-4 text-2xl font-bold text-zinc-800 max-md:mr-1">
        {name}
      </h2>
    </article>
  );
}

export default RoomCard;