import React,{useRef,useEffect} from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import Chill from "../assets/chill.jpg";
import Wedding from "../assets/wedding.jpg";
import Pool from "../assets/pool.jpg";
import Spa from "../assets/spa.jpg";
import work from "../assets/work.jpg";
import entertainment from "../assets/entertainment.jpg";
import enjoy from "../assets/enjoy.jpg";
import family from "../assets/family.jpg";
import read from "../assets/read.jpg";
import rest from "../assets/rest.jpg";


export const data = [
  {
    cover: Chill,
    title: "Chill",
  },
  {
    cover: enjoy,
    title: "Enjoy",
  },
  {
    cover: family,
    title: "Family Time",
  },
  {
    cover: read,
    title: "Read",
  },
  {
    cover: work,
    title: "Work",
  },
  {
    cover: rest,
    title: "Rest",
  },
  {
    cover: entertainment,
    title: "Entertainment",
  },
  // {
  //   cover: Restaurant,
  //   title: "Restaurant",
  // },
  
];

export default function Carousel(props) {
  const ref = useRef();
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.goNext();
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ width: "100%", position: "relative" }} className="mt-10">
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          let slideWidth = 250;
          if (parentWidth <= 1023) currentVisibleSlide = 5;
          if (parentWidth <= 1080) currentVisibleSlide = 3;
          if (parentWidth <= 425) {
            currentVisibleSlide = 3;
            slideWidth = (parentWidth - 40)/1.5; 
          } else if (parentWidth < 600) {
            slideWidth = parentWidth - 40/1.5;
          }
       
          return (
            <StackedCarousel
              ref={carouselRef}
              transitionTime={500}
              slideComponent={Card}
              slideWidth={slideWidth}
              carouselWidth={parentWidth}
              data={data}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              useGrabCursor
            />
          );
        }}
      />
      <>
      </>
    </div>
  );
}

// export const Card = React.memo(function (props) {
//   const { data, dataIndex } = props;
//   const { cover } = data[dataIndex];
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: 400, 
//         userSelect: "none",
//       }}
//       className="my-slide-component"
//     >
//       <img
//         style={{
//           height: "100%",
//           width: "100%",
//           objectFit: "cover",
//           borderRadius: 0,
//         }}
//         draggable={false}
//         src={cover}
//       />
//     </div>
//   );
// });

export const Card = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover, title } = data[dataIndex];
  return (
    <div
      style={{
        width: "100%",
        height: 400,
        userSelect: "none",
        position: "relative",
      }}
      className="my-slide-component"
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: 0,
        }}
        draggable={false}
        src={cover}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
          padding: "20px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
});