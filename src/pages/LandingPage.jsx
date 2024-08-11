import React from "react";
import HeroSection from "../components/HeroSection";
import Carousel from "../components/Carousel";
import Gallery from "../components/Gallery";
import FindYourStay from "../components/FindYourStay";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";
import ExploreGuestRooms from "../components/ExploreGuestRooms";
import BookingForm from "../components/BookingForm";



function LandingPage() {

  return (
    <div className="flex flex-col max-w-full min-w-full bg-white">
      <HeroSection />
      <div className="md:hidden">
      <BookingForm/>
        
      </div>
      <Carousel />
      <Gallery />
      <ExploreGuestRooms/>
      <FindYourStay />
      <Testimonials />
      <WhyChooseUs />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default LandingPage;

