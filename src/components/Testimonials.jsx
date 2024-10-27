// import React, { useRef, useState, useEffect } from "react";
// import TestimonialCard from "./TestimonialCard";
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import axios from 'axios';
// const process = import.meta.env;

// function MergedTestimonials() {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const testimonialRef = useRef(null);
//   const [testimonials, setTestimonials] = useState([]);

//   const fetchTestimonials = async () => {
//     try {
//       const response = await axios.get(`${process.VITE_HOST_URL}/api/public-feedbacks`);
//       setTestimonials(response.data);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const handleNext = () => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     if (testimonialRef.current) {
//       testimonialRef.current.scrollBy({
//         left: testimonialRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentTestimonial(
//       (prev) => (prev - 1 + testimonials.length) % testimonials.length
//     );
//     if (testimonialRef.current) {
//       testimonialRef.current.scrollBy({
//         left: -testimonialRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(handleNext, 5000);
//     return () => clearInterval(intervalId);
//   }, [testimonials.length]);

//   useEffect(() => {
//     if (testimonialRef.current) {
//       testimonialRef.current.scrollTo({
//         left: currentTestimonial * testimonialRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   }, [currentTestimonial]);

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   return (
//     <section className="py-20 px-20 mt-1.5 w-full bg-white max-md:px-5 max-md:max-w-full">
//       <div className="flex gap-5 max-md:flex-col">
//         <div className="flex flex-col w-[42%] max-md:w-full">
//           <div className="flex flex-col mt-5 font-bold text-black max-md:mt-10 max-md:max-w-full">
//             <div className="flex gap-1.5 self-start px-3.5 py-3 text-sm whitespace-nowrap bg-blue-200 border border-solid border-zinc-200 rounded-[50px]">
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ba03e6a22739415e2a56e88cfe35daddd32288c032f308c65b103ae3a303ba1?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
//                 alt=""
//                 className="shrink-0 rounded-xl border border-white border-solid aspect-[2] w-[52px]"
//               />
//               <span className="my-auto">Testimonials</span>
//             </div>
//             <h2 className="mt-5 text-5xl leading-[58px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
//               What our clients are <br /> saying about us?
//             </h2>
//             <p className="text-base font-medium leading-7 mt-7 text-neutral-500 max-md:max-w-full">
//               Discover how you can offset your adventure's carbon emissions{" "}
//               <br /> and support the sustainable initiatives practiced by our{" "}
//               <br /> operators worldwide.
//             </p>
//           </div>
//         </div>
        
//         <div className="flex flex-col w-[38%] max-md:w-full">
//           <div className="relative overflow-hidden">
//             <div
//               ref={testimonialRef}
//               className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
//               style={{
//                 scrollSnapType: "x mandatory",
//                 scrollbarWidth: "none",
//                 msOverflowStyle: "none",
//               }}
//             >
//               {testimonials.map((testimonial, index) => (
//                 <div key={index} className="flex-shrink-0 w-full snap-start">
//                   <TestimonialCard {...testimonial} />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-start gap-2 mt-5">
//             <button
//               onClick={handlePrevious}
//               className="flex items-center justify-center w-10 h-10 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
//             >
//               <FaChevronLeft className="w-6 h-6"/>
//             </button>
//             <button
//               onClick={handleNext}
//               className="flex items-center justify-center w-10 h-10 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
//             >
//               <FaChevronRight className="w-6 h-6"/>
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MergedTestimonials;


import React, { useEffect } from "react";
// import TestimonialCard from "./TestimonialCard"; // Commenting out old testimonial component
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Commenting out navigation icons
// import axios from 'axios'; // Commenting out axios as it's not needed for EmbedSocial
const process = import.meta.env;

function MergedTestimonials() {
  // Commenting out old state and fetch logic
  // const [currentTestimonial, setCurrentTestimonial] = useState(0);
  // const testimonialRef = useRef(null);
  // const [testimonials, setTestimonials] = useState([]);

  // const fetchTestimonials = async () => {
  //   try {
  //     const response = await axios.get(`${process.VITE_HOST_URL}/api/public-feedbacks`);
  //     setTestimonials(response.data);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const handleNext = () => {
  //   setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  //   if (testimonialRef.current) {
  //     testimonialRef.current.scrollBy({
  //       left: testimonialRef.current.offsetWidth,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const handlePrevious = () => {
  //   setCurrentTestimonial(
  //     (prev) => (prev - 1 + testimonials.length) % testimonials.length
  //   );
  //   if (testimonialRef.current) {
  //     testimonialRef.current.scrollBy({
  //       left: -testimonialRef.current.offsetWidth,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(handleNext, 5000);
  //   return () => clearInterval(intervalId);
  // }, [testimonials.length]);

  // useEffect(() => {
  //   if (testimonialRef.current) {
  //     testimonialRef.current.scrollTo({
  //       left: currentTestimonial * testimonialRef.current.offsetWidth,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [currentTestimonial]);

  // useEffect(() => {
  //   fetchTestimonials();
  // }, []);

  useEffect(() => {
    // EmbedSocial script loader
    const script = document.createElement('script');
    script.src = 'https://embedsocial.com/cdn/ht.js';
    script.id = 'EmbedSocialHashtagScript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }, []);

  return (
    <section className="py-20 px-20 mt-1.5 w-full bg-white max-md:px-5 max-w-full">
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
        
        {/* EmbedSocial testimonial section */}
        <div className="flex flex-col w-[88%] max-md:w-full">
          <div className="embedsocial-hashtag" data-ref="f107612b04b34fce5953d86d47988aa44b30edc1">
            {/* This will display the EmbedSocial feed */}
            {/* <a className="feed-powered-by-es feed-powered-by-es-slider-img es-widget-branding" href="https://embedsocial.com/blog/embed-google-reviews/" target="_blank" title="Embed Google reviews">
              <img src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" alt="EmbedSocial" />
              <div className="es-widget-branding-text">Embed Google reviews</div>
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MergedTestimonials;
