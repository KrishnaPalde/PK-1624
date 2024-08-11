import React from "react";

function RoomImages({ images }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-[300px] md:min-h-[550px]">
      <img
        loading="lazy"
        src={images[0]}
        alt="Main gallery image"
        className="object-cover w-full h-full rounded-lg md:rounded-2xl aspect-square md:aspect-[1.11]"
      />
      <div className="grid grid-cols-2 gap-2">
        {images.slice(1, 5).map((image, index) => (
          <img
            key={index}
            loading="lazy"
            src={image}
            alt={`Gallery image ${index + 2}`}
            className="object-cover w-full h-full rounded-lg aspect-square md:aspect-[1.11]"
          />
        ))}
      </div>
    </section>
  );
}

export default RoomImages;