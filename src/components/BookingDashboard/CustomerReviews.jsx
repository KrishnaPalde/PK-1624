import React, {useState, useEffect} from "react";
import StarRating from "./StarRating";
import axios from "axios";
const process = import.meta.env;

const reviews = [
  {
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/82315758df60230911b6d74df9aea16ea2aaf8c3d950d66e5250c2385ffe93f9?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    name: "Courtney Henry",
    rating: 5,
    time: "2 mins ago",
    review:
      "I have been there many times. Rooms, Food and Service are excellent. We did lots of Excursions and all the places are reachable from the Hotel. We visited Long Waterfall and it was very helpful and excellent.",
  },
  {
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a425918183c582282f3a22dff7e6128071b45d6d2cc58aa7cf1164f34fa5c68c?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    name: "Cameron Williamson",
    rating: 4,
    time: "2 mins ago",
    review:
      "Consequat velit qui adipisicing sunt do rependerit ad laborum tempor ullamco. I have been there many times. Rooms, Food and Service are excellent. We did lots of Excursions and all the places are reachable from the Hotel. We visited Long Waterfall and it was very helpful and excellent.",
  },
  {
    avatar:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/425af381ba69e07903682c4be950f0a191d1f2431226a6c700a4ce5494b69edc?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
    name: "Jane Cooper",
    rating: 3,
    time: "2 mins ago",
    review:
      "I have been there many times. Rooms, Food and Service are excellent. We did lots of Excursions and all the places are reachable from the Hotel. We visited Long Waterfall and it was very helpful and excellent.",
  },
];

function formatDate(date) {
  // Define the array of month abbreviations
  const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract the day, month, and year from the Date object
  const day = date.getDate(); // Day of the month
  const month = monthAbbr[date.getMonth()]; // Month abbreviation
  const year = date.getFullYear(); // Full year

  // Return the formatted date string
  return `${day} ${month} ${year}`;
}

const ReviewCard = ({ name, overallExperience, createdAt, comments }) => {

  const date = formatDate(new Date(createdAt));
  return (
    <section className="mt-5">
      <div className="flex items-end gap-4">
        <div className="flex gap-2 items-start min-w-[240px] w-[303px]">
          <img
            loading="lazy"
            src="https://img.icons8.com/officel/80/circled-user-male-skin-type-3.png"
            alt={`${name}'s avatar`}
            className="object-contain shrink-0 rounded-full aspect-square w-[38px]"
          />
          <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
            <h3 className="text-base font-semibold tracking-normal text-[#335064]">
              {name}
            </h3>
            <div className="flex items-center w-full gap-1 mt-1 text-sm font-medium tracking-normal text-right text-neutral-400">
              <StarRating rating={overallExperience} />
              <time className="self-stretch my-auto">{date}</time>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2.5 text-sm tracking-normal leading-5 text-gray-500 max-md:max-w-full">
        {comments}
      </p>
    </section>
  );
};

const CustomerReviews = () => {

  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try{
      const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/latest-feedbacks`);
      setReviews(response.data);
    } catch(error) {
      console.log(error);
      alert(error);
    }
  }

  useEffect(()=>{
    fetchReviews();
  });

  return (
    <article className="flex flex-col items-start max-w-[579px] bg-white rounded-lg p-4">
      <header className="flex flex-wrap self-stretch justify-between w-full gap-5 text-2xl font-semibold text-slate-700 max-md:max-w-full">
        <h2>Latest Customer Review</h2>
      </header>
      <main>
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </main>
    </article>
  );
};

export default CustomerReviews;
