import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const attractions = [
  {
    id: 1,
    name: "Kempty Falls",
    image: "/images/kempty-falls.jpg",
    description:
      "A popular picnic spot and waterfall, perfect for nature lovers.",
    distance: "15 km",
    category: "Nature",
    mapLink: "https://goo.gl/maps/KemptyFalls",
  },
  {
    id: 2,
    name: "Robber's Cave",
    image: "/images/robbers-cave.jpg",
    description:
      "Known for its natural caves and water streams, a must-visit spot.",
    distance: "8 km",
    category: "Adventure",
    mapLink: "https://goo.gl/maps/RobbersCave",
  },
  {
    id: 3,
    name: "Mussoorie Mall Road",
    image: "/images/mall-road.jpg",
    description:
      "Famous for shopping, dining, and scenic views of the hills.",
    distance: "25 km",
    category: "Leisure",
    mapLink: "https://goo.gl/maps/MussoorieMallRoad",
  },
  {
    id: 4,
    name: "Sahastradhara",
    image: "/images/sahastradhara.jpg",
    description:
      "Known for its therapeutic water springs and beautiful surroundings.",
    distance: "12 km",
    category: "Wellness",
    mapLink: "https://goo.gl/maps/Sahastradhara",
  },
  {
    id: 5,
    name: "Mindrolling Monastery",
    image: "/images/mindrolling.jpg",
    description:
      "A stunning Buddhist monastery with vibrant architecture and peaceful vibes.",
    distance: "20 km",
    category: "Cultural",
    mapLink: "https://goo.gl/maps/MindrollingMonastery",
  },
];

const NearbyAttractions = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-8 mt-24">
        <h1 className="text-3xl sm:text-4xl pb-4 font-bold text-center" style={{ color: "#255d69" }}>
          Nearby Attractions & Activities
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Discover the best places to visit near Pacific Hills, Dehradun. From serene nature spots to cultural landmarks, there’s something for everyone.
        </p>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction) => (
            <div
              key={attraction.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold" style={{ color: "#255d69" }}>
                  {attraction.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{attraction.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Distance: {attraction.distance}</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: "#255d69" }}
                  >
                    {attraction.category}
                  </span>
                </div>
                <a
                  href={attraction.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-center text-white font-semibold py-2 rounded-lg"
                  style={{
                    backgroundColor: "#255d69",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Map Integration */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#255d69" }}>
            Explore on Map
          </h2>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.237654841007!2d78.07458107636155!3d30.372608774759968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d7b81915745b%3A0xc5310d4d85c27ae!2sPacific%20Hills!5e0!3m2!1sen!2sin!4v1731759287665!5m2!1sen!2sin`}
            width="100%"
            height="450"
            className="rounded-lg shadow-md border"
            allowFullScreen=""
            loading="lazy"
            title="Property Location"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NearbyAttractions;
