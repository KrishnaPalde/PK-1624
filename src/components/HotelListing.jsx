import React from "react";
import SortingHeader from "./SortingHeader";
import HotelCard from "./HotelCard";
import ShowMoreButton from "./ShowMoreButton";

const hotelData = [
  {
    id: 1,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e2672af5ab8b4e4d5014239192c995f67315f454513885dddc9ee8466013abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    imageCount: 9,
    title: "Deluxe Room",
    description:
      "Unwind in comfort with a plush king bed and a private balcony overlooking the city.",
    guestCount: 2,
    rating: 5,
    price: 180,
  },
  {
    id: 2,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e2672af5ab8b4e4d5014239192c995f67315f454513885dddc9ee8466013abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    imageCount: 9,
    title: "Deluxe Room",
    description:
      "Unwind in comfort with a plush king bed and a private balcony overlooking the city.",
    guestCount: 2,
    rating: 5,
    price: 180,
  },
  {
    id: 3,
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e2672af5ab8b4e4d5014239192c995f67315f454513885dddc9ee8466013abe5?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    imageCount: 9,
    title: "Deluxe Room",
    description:
      "Unwind in comfort with a plush king bed and a private balcony overlooking the city.",
    guestCount: 2,
    rating: 5,
    price: 180,
  },
];

function HotelListing() {
  return (
    <main className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
      <SortingHeader totalPlaces={257} shownPlaces={4} />
      {hotelData.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
      <ShowMoreButton />
    </main>
  );
}

export default HotelListing;
