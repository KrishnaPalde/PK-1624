import React, { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsappButton";
import dehradunAttractions from "../data/dehradunAttractions";
import nashikAttraction from "../data/nashikAttractions";
import { motion } from "framer-motion";

const cities = [
  { id: "dehradun", label: "Dehradun", data: dehradunAttractions },
  { id: "nashik", label: "Nashik", data: nashikAttraction },
];

const NearbyAttractions = () => {
  const [selectedCity, setSelectedCity] = useState("dehradun");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const cityData = cities.find((c) => c.id === selectedCity);
  const attractions = cityData?.data || [];

  // Unique categories
  const categories = useMemo(() => {
    const unique = new Set(attractions.map((a) => a.category));
    return ["All", ...Array.from(unique)];
  }, [attractions]);

  // Filter by category
  const filteredAttractions =
    selectedCategory === "All"
      ? attractions
      : attractions.filter((a) => a.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-12 mt-16 mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#255d69] mb-6">
          Nearby Attractions & Activities
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Discover the best places to visit near our properties. From serene nature spots to cultural landmarks, there’s something for everyone.
        </p>

        {/* City Tabs */}
        <div className="flex justify-center mb-6">
          <div className="relative inline-flex bg-gray-100 rounded-full p-1 shadow-inner">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  setSelectedCity(city.id);
                  setSelectedCategory("All");
                }}
                className={`relative px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selectedCity === city.id
                    ? "text-white z-10"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {selectedCity === city.id && (
                  <motion.div
                    layoutId="tabHighlight"
                    className="absolute inset-0 bg-[#255d69] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{city.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="relative flex flex-wrap justify-center gap-2 overflow-x-auto max-w-full px-2 py-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#255d69] text-white shadow"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    layoutId="subTabHighlight"
                    className="absolute inset-0 bg-[#255d69] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Attraction Cards */}
        <motion.div
          key={selectedCity + selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAttractions.map((attraction) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="w-full h-48 sm:h-52 md:h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#255d69]">{attraction.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{attraction.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{attraction.distance}</span>
                  <span className="bg-[#255d69] text-white text-xs rounded-full px-3 py-1">{attraction.category}</span>
                </div>
                <a
                  href={attraction.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#255d69] text-white font-semibold py-2 rounded-lg mt-4 hover:bg-opacity-90 transition duration-300"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default NearbyAttractions;
