import React, { useState, useRef } from "react";
import PropTypes from "prop-types";


const Container = ({ className = "" }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialRef = useRef(null);

  const testimonials = [
    {
      name: "Sara Mohamed",
      location: "Jakatar",
      image: "/authorpng@2x.png",
      text: "I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",
    },
    {
      name: "Atend John",
      location: "Califonia",
      image: "/author2png@2x.png",
      text: "I had a last-minute business trip, and the hotel booking system came to the rescue. I was able to find a high-quality hotel in no time and even got a great deal on the room. The confirmation process was straightforward, and I received all the necessary information promptly.",
    },
    {
      name: "Sara Mohamed",
      location: "Jakatar",
      image: "/authorpng@2x.png",
      text: "I've been using the hotel booking system for several years now, and it's become my go-to platform for planning my trips. The interface is user-friendly, and I appreciate the detailed information and real-time availability of hotels.",
    },
    {
      name: "Atend John",
      location: "Califonia",
      image: "/author2png@2x.png",
      text: "I had a last-minute business trip, and the hotel booking system came to the rescue. I was able to find a high-quality hotel in no time and even got a great deal on the room. The confirmation process was straightforward, and I received all the necessary information promptly.",
    },
    
  ];

  const handlePrevious = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({ left: -testimonialRef.current.offsetWidth, behavior: 'smooth' });
    }
    setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({ left: testimonialRef.current.offsetWidth, behavior: 'smooth' });
    }
    setCurrentTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className={`self-stretch overflow-hidden flex flex-row items-start justify-start pt-[1.875rem] px-[6.312rem] pb-[2.5rem] box-border relative gap-[5.568rem] max-w-full text-left text-[0.875rem] text-black font-manrope mq450:gap-[1.375rem] mq450:pt-[1.25rem] mq450:pb-[1.625rem] mq450:box-border mq825:gap-[2.813rem] mq825:pl-[1.563rem] mq825:pr-[1.563rem] mq825:box-border mq1425:flex-wrap mq1425:justify-center mq1425:pl-[3.125rem] mq1425:pr-[3.125rem] mq1425:box-border ${className}`}>
      
      <div className="w-[33.219rem] flex flex-col items-start justify-start pt-[1.562rem] px-[0rem] pb-[0rem] box-border min-w-[33.219rem] max-w-full shrink-0 mq825:min-w-full mq1425:flex-1">
        <div className="flex flex-col items-start self-stretch justify-start max-w-full shrink-0">
          <div className="w-[10.8rem] rounded-31xl bg-lightblue box-border flex flex-row items-start justify-start py-[0.562rem] px-[0.812rem] gap-[0.312rem] border-[1px] border-solid border-gainsboro-100">
            <div className="h-[1.625rem] w-[3.25rem] relative shrink-0">
              
            </div>
            <div className="w-[6.756rem] flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border shrink-0">
              <b className="self-stretch relative leading-[1.375rem]">
                Testimonials
              </b>
            </div>
          </div>
          <div className="w-[32.188rem] flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[2.25rem] box-border max-w-full shrink-0 text-[3rem] font-inter">
            <h1 className="m-0 flex-1 relative text-inherit leading-[3.625rem] font-bold font-inherit inline-block max-w-full mq450:text-[1.813rem] mq450:leading-[2.188rem] mq825:text-[2.375rem] mq825:leading-[2.875rem]">
              <p className="m-0">What our clients are</p>
              <p className="m-0">saying about us?</p>
            </h1>
          </div>
          <div className="self-stretch relative text-[1rem] leading-[1.75rem] font-medium text-dimgray-100">
            <p className="m-0">
              Discover how you can offset your adventure's carbon emissions
            </p>
            <p className="m-0">
              and support the sustainable initiatives practiced by our
            </p>
            <p className="m-0">operators worldwide.</p>
          </div>
        </div>
      </div>

     
      <div className="w-[56.963rem] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[1.25rem] px-[0rem] pb-[2.5rem] box-border min-w-[56.963rem] max-w-full text-[1.125rem] lg:min-w-full mq450:pb-[1.625rem] mq450:box-border mq1425:flex-1">
        <div 
          ref={testimonialRef}
          className="flex overflow-x-hidden scroll-smooth" 
          style={{ width: '100%', scrollSnapType: 'x mandatory' }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="w-[29.375rem] flex-shrink-0 scroll-snap-align-start rounded-13xl bg-seashell box-border flex flex-col items-start justify-start pt-[2.062rem] px-[2.5rem] pb-[2.125rem] gap-[1.906rem] border-[1px] border-solid border-gainsboro-100 mq825:gap-[0.938rem]"
              style={{ marginRight: index < testimonials.length - 1 ? '1.562rem' : '0' }}
            >
              <div className="self-stretch flex flex-row items-end justify-between pt-[0rem] px-[0rem] pb-[1.375rem] gap-[1.25rem] border-b-[1px] border-solid border-gainsboro-100 mq450:flex-wrap">
                <div className="w-[12.875rem] flex flex-row items-start justify-start gap-[0.75rem]">
                  <img
                    className="h-[4rem] w-[4rem] relative rounded-13xl overflow-hidden shrink-0 object-cover"
                    loading="lazy"
                    alt=""
                    src={testimonial.image}
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                    <div className="flex flex-col items-start self-stretch justify-start">
                      <b className="relative leading-[1.75rem]">{testimonial.name}</b>
                      <div className="relative text-[0.875rem] leading-[1.375rem] font-medium inline-block min-w-[3.063rem]">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.437rem]">
                 
                </div>
              </div>
              <div className="relative text-[0.875rem] leading-[1.5rem] text-dimgray-100 inline-block max-w-full">
                {testimonial.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <img
        className="h-[2.5rem] w-[2.5rem] absolute !m-[0] right-[42.375rem] bottom-[1.25rem] rounded-xl z-[2] cursor-pointer"
        loading="lazy"
        alt=""
        src="/button--previous-slide.svg"
        onClick={handlePrevious}
      />
      <img
        className="h-[2.5rem] w-[2.5rem] absolute !m-[0] right-[39.45rem] bottom-[1.25rem] rounded-xl z-[2] cursor-pointer"
        alt=""
        src="/button--next-slide.svg"
        onClick={handleNext}
      />
    </div>
  );
};

Container.propTypes = {
  className: PropTypes.string,
};

export default Container;