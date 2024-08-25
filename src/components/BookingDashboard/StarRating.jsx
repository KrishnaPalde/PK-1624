import React from "react";

const StarRating = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          loading="lazy"
          src={
            index < rating
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/dc85554cbec3c8d7c2107bd641a6a0df0d6f19ab068d46bab1995a38ec9d7ef4?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              : "https://cdn.builder.io/api/v1/image/assets/TEMP/0ea1a9b717ced9fed257bed415065b3cdcc9d56982060c46c2635829cdf93b0e?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
          }
          alt={index < rating ? "Filled star" : "Empty star"}
          className="object-contain shrink-0 self-stretch my-auto w-4 rounded-sm aspect-square"
        />
      ))}
    </>
  );
};

export default StarRating;
