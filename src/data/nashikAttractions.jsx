import anjneri from "../assets/nashik/anjneri.webp";
import brahmagiri from "../assets/nashik/brahmagiri.webp";
import vaitarna from "../assets/nashik/vaitarna.webp";
import harihar from "../assets/nashik/harihar.webp";
import kalsubai from "../assets/nashik/kalsubai.webp";
import bhandardara from "../assets/nashik/bhandardara.webp";
import vihigaon from "../assets/nashik/vihigaon.webp";
import dugarwadi from "../assets/nashik/dugarwadi.webp";
import bhamDam from "../assets/nashik/bham_dam.webp";
import bhauliDam from "../assets/nashik/bhauli_dam.webp";

import trimbak from "../assets/nashik/trimbakeshwar.webp";
import saptashrungi from "../assets/nashik/saptashrungi.webp";
import kalaram from "../assets/nashik/kalaram.webp";
import kapaleshwar from "../assets/nashik/kapaleshwar.webp";
import sitaGufa from "../assets/nashik/sitagufa.webp";
import muktidham from "../assets/nashik/muktidham.webp";
import gangaAarti from "../assets/nashik/ganga_aarti.webp";
import pandavleni from "../assets/nashik/pandavleni.webp";

import sula from "../assets/nashik/sula.webp";
import york from "../assets/nashik/york.webp";
import grover from "../assets/nashik/grover.webp";

import igatpuri from "../assets/nashik/igatpuri.webp";
import sandhan from "../assets/nashik/sandhan.webp";
import kavnai from "../assets/nashik/kavnai.webp";

import salher from "../assets/nashik/salher.webp";
import ahivant from "../assets/nashik/ahivant.webp";

import gangapur from "../assets/nashik/gangapur.webp";
import darna from "../assets/nashik/darna.webp";

import dhamma from "../assets/nashik/dhamma.webp";

import sadhana from "../assets/nashik/sadhana.webp";
import grapeEmbassy from "../assets/nashik/grape_embassy.webp";
import peruchiWadi from "../assets/nashik/peruchi.webp";


const nashikAttraction = [
  // 🏞️ Nature & Scenic Spots
  {
    id: 1,
    name: "Anjneri Hills",
    image: anjneri,
    description: "Believed birthplace of Lord Hanuman, excellent trekking trail.",
    distance: "25 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/Capv9NKmfwLAVB7NA",
  },
  {
    id: 2,
    name: "Brahmagiri Hill & Trimbak Range",
    image: brahmagiri,
    description: "Source of the Godavari River; panoramic views and spiritual aura.",
    distance: "28 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/e4KDbDVdteStJ6Ba6",
  },
  {
    id: 3,
    name: "Vaitarna Dam / Backwaters",
    image: vaitarna,
    description: "Boating, kayaking, and offbeat camping.",
    distance: "60 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/avhaGTYkzgBJasdp6",
  },
  {
    id: 4,
    name: "Harihar Fort (Harshgad)",
    image: harihar,
    description: "Steep staircases climb, breathtaking view — a thrill-seeker’s trek.",
    distance: "40 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/QCk5UphzgNZoSzEp9",
  },
  {
    id: 5,
    name: "Kalsubai Peak",
    image: kalsubai,
    description: "Maharashtra’s highest peak; a favorite among trekkers.",
    distance: "75 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/tP5BZWwmdh13uuwh7",
  },
  {
    id: 6,
    name: "Bhandardara",
    image: bhandardara,
    description: "Serene getaway with Arthur Lake, Randha Falls, Wilson Dam.",
    distance: "70 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/ZueVkndTLTmRqafU7",
  },
  {
    id: 7,
    name: "Vihigaon Waterfall",
    image: vihigaon,
    description: "Seasonal waterfall famous for rappelling and monsoon adventures.",
    distance: "60 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/CEUD2kyy2XnYK4zQ8",
  },
  {
    id: 8,
    name: "Dugarwadi Waterfall",
    image: dugarwadi,
    description: "Hidden gem near Trimbak. Ideal for nature lovers and monsoon hikes.",
    distance: "30 km",
    category: "Nature",
    mapLink: "https://maps.app.goo.gl/fC37G2Eoee7iNNJc6",
  },
  {
    id: 9,
    name: "Bham Dam",
    image: bhamDam,
    description: "Secluded, scenic picnic and photography spot.",
    distance: "25 km",
    category: "Lakes & Boating",
    mapLink: "https://maps.app.goo.gl/GBAJvqLMD94tYDwM6",
  },
  {
    id: 10,
    name: "Bhauli Dam",
    image: bhauliDam,
    description: "Offbeat destination surrounded by lush fields and peaceful waters.",
    distance: "35 km",
    category: "Lakes & Boating",
    mapLink: "https://maps.app.goo.gl/z28LQYLzU7BAVoZT9",
  },

  // 🛕 Religious & Spiritual
  {
    id: 11,
    name: "Trimbakeshwar Jyotirlinga Temple",
    image: trimbak,
    description: "Major pilgrimage center; ancient temple architecture.",
    distance: "28 km",
    category: "Religious",
    mapLink: "https://maps.app.goo.gl/o6mjZRibtW6h2v8V6",
  },
  {
    id: 12,
    name: "Saptashrungi Devi Temple (Vani)",
    image: saptashrungi,
    description: "Located on a hill with ropeway access; one of 51 Shakti Peethas.",
    distance: "70 km",
    category: "Religious",
    mapLink: "https://maps.app.goo.gl/WyA2d9HmCDuq1Tyg8",
  },
  {
    id: 13,
    name: "Shree Kalaram Temple",
    image: kalaram,
    description: "Black stone temple with deep spiritual significance.",
    distance: "Within Nashik",
    category: "Religious",
    mapLink: "https://maps.app.goo.gl/dK3CQBxTUSGeQM7U9",
  },
  {
    id: 14,
    name: "Kapaleshwar Temple",
    image: kapaleshwar,
    description: "Historic temple on the Godavari ghats, opposite Kalaram Mandir.",
    distance: "Central Nashik",
    category: "Religious",
    mapLink: "https://maps.app.goo.gl/eT5SsNWQZxW2uwGu6",
  },
  {
    id: 15,
    name: "Sita Gufa",
    image: sitaGufa,
    description: "Mythologically significant cave believed to be where Sita stayed during exile.",
    distance: "Panchvati",
    category: "Religious",
    mapLink: "https://maps.app.goo.gl/6BfjXrJnNSQa5p39A",
  },
  {
    id: 16,
    name: "Muktidham Temple",
    image: muktidham,
    description: "Replica of 12 Jyotirlingas; made of white marble.",
    distance: "8 km",
    category: "Religious",
    mapLink: "https://maps.app.goo.gl/fHsauGoNhvzADiBK9",
  },
  {
    id: 17,
    name: "Goda Ganga Aarti at Ramkund",
    image: gangaAarti,
    description: "Soulful evening aarti on the Godavari banks.",
    distance: "Nashik Ghats",
    category: "Spiritual",
    mapLink: "https://maps.app.goo.gl/WkKubtXap2g1hgto9",
  },
  {
    id: 18,
    name: "Pandavleni Caves",
    image: pandavleni,
    description: "Rock-cut caves from 1st century BCE; peaceful and historic.",
    distance: "3 km",
    category: "Historical",
    mapLink: "https://maps.app.goo.gl/CNFNegZpLTPAQo3KA",
  },

  // 🍷 Wineries
  {
    id: 19,
    name: "Sula Vineyards",
    image: sula,
    description: "Wine tasting, vineyard tours, restaurants with valley views.",
    distance: "12 km",
    category: "Wineries",
    mapLink: "https://maps.app.goo.gl/hUenuRHUU5eaKLoH6",
  },
  {
    id: 20,
    name: "York Winery",
    image: york,
    description: "Quieter alternative to Sula with premium wines and food.",
    distance: "14 km",
    category: "Wineries",
    mapLink: "https://maps.app.goo.gl/GmgnpDabV7Qgo72K9",
  },
  {
    id: 21,
    name: "Grover Zampa Vineyards",
    image: grover,
    description: "Boutique vineyard offering private tastings and wine walks.",
    distance: "28 km",
    category: "Wineries",
    mapLink: "https://maps.app.goo.gl/wxoyaQkG18yQsrZ66",
  },

  // ⛺ Adventure
  {
    id: 22,
    name: "Igatpuri",
    image: igatpuri,
    description: "Waterfalls, forts, trekking and meditation retreats.",
    distance: "45 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/Deh2rMguEoN1DKZo9",
  },
  {
    id: 23,
    name: "Sandhan Valley",
    image: sandhan,
    description: "Thrilling canyon trek, camping under stars.",
    distance: "75 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/yqVxgQszoe1h7vqy6",
  },
  {
    id: 24,
    name: "Kavnai Fort Trek",
    image: kavnai,
    description: "Beginner-friendly trek with village views.",
    distance: "40 km",
    category: "Adventure",
    mapLink: "https://maps.app.goo.gl/7u6afPUGfPYoy53Q8",
  },

  // 🏛️ Historical
  {
    id: 25,
    name: "Salher & Mulher Forts",
    image: salher,
    description: "Linked to Shivaji’s campaigns, rugged treks for history lovers.",
    distance: "90 km",
    category: "Historical",
    mapLink: "https://maps.app.goo.gl/59cGpoaqGQhxV6Py6",
  },
  {
    id: 26,
    name: "Ahivant & Achala Forts",
    image: ahivant,
    description: "Ideal for trekkers seeking lesser-known Maratha-era sites.",
    distance: "75-85 km",
    category: "Historical",
    mapLink: "https://maps.app.goo.gl/zBXjzqVc558efYd7A",
  },

  // 🚤 Lakes & Boating
  {
    id: 27,
    name: "Gangapur Dam",
    image: gangapur,
    description: "Boating, sunset views, and nearby cafes.",
    distance: "12 km",
    category: "Lakes & Boating",
    mapLink: "https://maps.app.goo.gl/Fqh4tn8ziYNddHEt7",
  },
  {
    id: 28,
    name: "Darna Dam",
    image: darna,
    description: "Peaceful drive with occasional bird watching.",
    distance: "45 km",
    category: "Lakes & Boating",
    mapLink: "https://maps.app.goo.gl/e9oeQqK5psKUQyEP9",
  },

  // 🧘 Wellness
  {
    id: 29,
    name: "Dhamma Giri Vipassana Centre",
    image: dhamma,
    description: "Vipassana meditation center offering 10-day silent retreats.",
    distance: "45 km",
    category: "Wellness",
    mapLink: "https://maps.app.goo.gl/hDKtQxNNxyJTiS6j8",
  },

  // 🍛 Local Food
  {
    id: 30,
    name: "Sadhana Misal",
    image: sadhana,
    description: "Iconic misal pav with rural-themed ambience and bullock cart rides.",
    distance: "7 km",
    category: "Food",
    mapLink: "https://maps.app.goo.gl/Jh7qJQvmghAnSNMc8",
  },
  {
    id: 31,
    name: "Grape Embassy Misal",
    image: grapeEmbassy,
    description: "Unique misal served with grapes, popular for its twist on the classic.",
    distance: "10 km",
    category: "Food",
    mapLink: "https://maps.app.goo.gl/oPVfQbD1XGpBSZWu9",
  },
  {
    id: 32,
    name: "Peruchi Wadi",
    image: peruchiWadi,
    description: "Traditional Maharashtrian thali in a rustic courtyard setting.",
    distance: "5 km",
    category: "Food",
    mapLink: "https://maps.app.goo.gl/UtgZ8JXuFUs3Gxxo8",
  },
];

export default nashikAttraction;
