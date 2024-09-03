import React, { useRef, useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sara Mohamed",
    location: "Jakarta",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3461b425982dadae9d4e76268c1684dd4aca7e7ee212b134095802f177dde055?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    content:
      "I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",
    bgColor: "bg-rose-50",
  },
  {
    name: "Atend John",
    location: "California",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/84c2a9eee7fdde809e27857753d510a778f912293ca2ca8d4eb547e77ee92460?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    content:
      "I had a last-minute business trip, and the hotel booking system came to the rescue. I was able to find a high-quality hotel in no time and even got a great deal on the room. The confirmation process was straightforward, and I received all the necessary information promptly.",
    bgColor: "bg-sky-100",
  },
  {
    name: "Atend John",
    location: "California",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/84c2a9eee7fdde809e27857753d510a778f912293ca2ca8d4eb547e77ee92460?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    content:
      "I had a last-minute business trip, and the hotel booking system came to the rescue. I was able to find a high-quality hotel in no time and even got a great deal on the room. The confirmation process was straightforward, and I received all the necessary information promptly.",
    bgColor: "bg-sky-100",
  },
];

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialRef = useRef(null);

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({
        left: testimonialRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({
        left: -testimonialRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  useEffect(() => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollTo({
        left: currentTestimonial * testimonialRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  }, [currentTestimonial]);

  return (
    <section className="py-20 px-20 mt-1.5 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[42%] max-md:w-full">
          <div className="flex flex-col mt-5 font-bold text-black max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-1.5 self-start px-3.5 py-3 text-sm whitespace-nowrap bg-blue-200 border border-solid border-zinc-200 rounded-[50px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ba03e6a22739415e2a56e88cfe35daddd32288c032f308c65b103ae3a303ba1?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                alt=""
                className="shrink-0 rounded-xl border border-white border-solid aspect-[2] w-[52px]"
              />
              <span className="my-auto">Testimonials</span>
            </div>
            <h2 className="mt-5 text-5xl leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
              What our clients are <br /> saying about us?
            </h2>
            <p className="text-base font-medium leading-7 mt-7 text-neutral-500 max-md:max-w-full">
              Discover how you can offset your adventure's carbon emissions{" "}
              <br /> and support the sustainable initiatives practiced by our{" "}
              <br /> operators worldwide.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[58%] max-md:w-full">
          <div className="relative overflow-hidden">
            <div
              ref={testimonialRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full snap-start">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-start gap-2 mt-5">
            <button
              onClick={handlePrevious}
              className="flex items-center justify-center w-10 h-10 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
            >
              {/* <FontAwesomeIcon icon={faLessThan} /> */}
              <FaChevronLeft className="w-6 h-6"/>
              
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-10 h-10 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
            >
              {/* <FontAwesomeIcon icon={faGreaterThan} /> */}
              <FaChevronRight className="w-6 h-6"/>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
