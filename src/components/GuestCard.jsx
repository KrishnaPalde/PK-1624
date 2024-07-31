// import React from "react";

// const ImageCard = ({ src, alt }) => {
//   return (
//     <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
//       <div className="flex flex-col justify-center py-8 grow">
//         <img
//           loading="lazy"
//           src={src}
//           alt={alt}
//           className="w-full border-orange-100 border-solid shadow-lg aspect-[1.33] border-[10px]"
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageCard;

import React from "react";

const GuestCard = ({ src, alt }) => {
  return (
    <div className="flex flex-col w-full max-md:ml-0">
      <div className="flex flex-col py-8 grow">
        <img
          loading="lazy"
          src={src}
          alt={alt}
          className="w-full border-orange-100 border-solid shadow-lg aspect-[1.33] border-[10px]"
        />
      </div>
    </div>
  );
};

export default GuestCard;
