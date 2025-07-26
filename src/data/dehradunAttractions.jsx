import robbersCave from "../assets/dehradun/robbers_cave.webp";
import mussoorie from "../assets/dehradun/Mussoorie.webp";
import Rajaji_National_Park from "../assets/dehradun/Rajaji_National_Park.webp";
import clockTower from "../assets/dehradun/clock_tower.webp";
import wadiaInstitute from "../assets/dehradun/wadia_institute.webp";
import malsi_forest from "../assets/dehradun/malsi_reserve_forest.webp";
import buddhaTemple from "../assets/dehradun/buddha_temple.webp";
import shikharFall from "../assets/dehradun/shikhar.webp";
import khalangaWar from "../assets/dehradun/Khalanga_war.webp";
import tapovan from "../assets/dehradun/tapovan.webp";
import dehradunZoo from "../assets/dehradun/dehradun_zoo.webp";
import FRI from "../assets/dehradun/fri.webp";
import mindrolling from "../assets/dehradun/mindrolling.webp";
import Tapkeshwar from "../assets/dehradun/Tapkeshwar.webp";
import Sahastradhara from "../assets/dehradun/sahastradhara.webp";

const dehradunAttractions = [
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

export default dehradunAttractions;