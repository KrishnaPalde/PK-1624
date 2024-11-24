import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import robbersCave from "../assets/robbers_cave.jpeg";
import mussoorie from "../assets/Mussoorie.jpg";
import Rajaji_National_Park from "../assets/Rajaji_National_Park.jpg";
import clockTower from "../assets/clock_tower.jpg";
import wadiaInstitute from "../assets/wadia_institute.jpg";
import malsi_forest from "../assets/malsi_reserve_forest.png";
import buddhaTemple from "../assets/buddha_temple.jpg";
import shikharFall from "../assets/shikhar.jpg";
import khalangaWar from "../assets/Khalanga_war.jpeg";
import tapovan from "../assets/tapovan.jpg";
import dehradunZoo from "../assets/dehradun_zoo.jpg";
import FRI from "../assets/fri.jpg";
import mindrolling from "../assets/mindrolling.jpg";
import Tapkeshwar from "../assets/Tapkeshwar.jpg";
import Sahastradhara from "../assets/sahastradhara.webp";
import WhatsAppButton from "../components/WhatsappButton";

const attractions = [
  {
    id: 1,
    name: "Robber's Cave (Gucchupani)",
    image: robbersCave,
    description: "A natural cave formation with a river flowing through it, ideal for picnics and nature walks.",
    distance: "~12 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/xiGeMmH4bbEbB7My8",
  },
  {
    id: 2,
    name: "Sahastradhara",
    image: Sahastradhara,
    description: "Famous for its natural sulfur springs, waterfalls, and caves. The name means 'Thousand Fold Spring'.",
    distance: "~16 km",
    category: "Wellness",
    mapLink: "https://maps.app.goo.gl/c3r11do1vfJnEKpj7",
  },
  {
    id: 3,
    name: "Tapkeshwar Temple",
    image: Tapkeshwar,
    description: "A revered Hindu temple dedicated to Lord Shiva, situated by a natural cave and a stream.",
    distance: "~11 km",
    category: "Cultural",
    mapLink: "https://maps.app.goo.gl/E1pHTtQALzLATVRj8",
  },
  {
    id: 4,
    name: "Mindrolling Monastery",
    image: mindrolling,
    description: "One of the largest Buddhist centers in India, known for its impressive architecture and tranquil surroundings.",
    distance: "~7 km",
    category: "Cultural",
    mapLink: "https://maps.app.goo.gl/enz6eXpoQQgfx4qE6",
  },
  {
    id: 5,
    name: "Forest Research Institute (FRI)",
    image: FRI,
    description: "A premier institution in the field of forestry research, housed in a beautiful colonial building with a museum.",
    distance: "~10 km",
    category: "Educational",
    mapLink: "https://maps.app.goo.gl/xKLbEaPBawzxfsrY8",
  },
  {
    id: 6,
    name: "Dehradun Zoo (Malsi Deer Park)",
    image: dehradunZoo,
    description: "A small zoo located at the base of the Shivalik range, home to a variety of animals and birds.",
    distance: "~9 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/T2Mf8AcCPxRX3fbs6",
  },
  {
    id: 7,
    name: "Tapovan",
    image: tapovan,
    description: "Known for its serene environment and spiritual significance, it’s a popular place for meditation and yoga.",
    distance: "~13 km",
    category: "Spiritual",
    mapLink: "https://maps.app.goo.gl/vrkPCZEW4kPiRn8C8",
  },
  {
    id: 8,
    name: "Khalanga War Memorial",
    image: khalangaWar,
    description: "A historical site commemorating the battle between the British and Gorkhas, offering a beautiful view of Dehradun valley.",
    distance: "~8 km",
    category: "Historical",
    mapLink: "https://maps.app.goo.gl/4YYMBoLprVduKTAG7",
  },
  {
    id: 9,
    name: "Shikhar Fall",
    image: shikharFall,
    description: "A serene waterfall and picnic spot amidst dense forests, perfect for nature lovers.",
    distance: "~15 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/97xBAyQ6JX1J1cUm9",
  },
  {
    id: 10,
    name: "Buddha Temple (Clement Town)",
    image: buddhaTemple,
    description: "A major Tibetan Buddhist monastery featuring a large statue of Buddha and peaceful gardens.",
    distance: "~8 km",
    category: "Cultural",
    mapLink: "https://maps.app.goo.gl/UdaqFuXNRNH2nNn8A",
  },
  {
    id: 11,
    name: "Malsi Reserve Forest",
    image: malsi_forest,
    description: "Ideal for wildlife enthusiasts and nature walks, located near the Malsi Deer Park.",
    distance: "~9 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/5e193LkMk1YVPXEN6",
  },
  {
    id: 12,
    name: "Wadia Institute of Himalayan Geology",
    image: wadiaInstitute,
    description: "An autonomous research institute specializing in the geology of the Himalayas, offering educational tours.",
    distance: "~10 km",
    category: "Educational",
    mapLink: "https://maps.app.goo.gl/ddHvSpdbwSeDSnLU9",
  },
  {
    id: 13,
    name: "Clock Tower (Ghanta Ghar)",
    image: clockTower,
    description: "A prominent landmark in the heart of Dehradun, known for its historical significance and nearby shopping areas.",
    distance: "~5 km",
    category: "Historical",
    mapLink: "https://maps.app.goo.gl/TVXpEyKR3VZb1gxbA",
  },
  {
    id: 14,
    name: "Rajaji National Park",
    image: Rajaji_National_Park,
    description: "A national park known for its rich biodiversity, including elephants, tigers, and leopards. Ideal for wildlife safaris.",
    distance: "~20 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/dcLN2UDqZjdowGuy8",
  },
  {
    id: 15,
    name: "Mussoorie",
    image: mussoorie,
    description: "A popular hill station known as the 'Queen of the Hills,' offering beautiful views, a pleasant climate, and attractions like Kempty Falls, Mall Road, and Gun Hill.",
    distance: "~35 km",
    category: "Leisure",
    mapLink: "https://maps.app.goo.gl/KhW2X88bSd4QByBc9",
  },
];

const NearbyAttractions = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-12 mt-16 mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#255d69] mb-6">
          Nearby Attractions & Activities
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Discover the best places to visit near Pacific Hills, Dehradun. From serene nature spots to cultural landmarks, there’s something for everyone.
        </p>
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
            </div>
          ))}
        </div>
      </div>
      <WhatsAppButton/>
      <Footer />
    </>
  );
};

export default NearbyAttractions;
