import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BookingForm from "../components/BookingForm";
import RoomDetailsCard from "../components/RoomDetailsCard";
import RoomImages from "../components/RoomImages";
import RoomOverview from "../components/RoomOverview";
import AmenitiesList from "../components/AmenitiesList";
import RoomReviewSection from "../components/RoomReviewSection";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const RoomDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;

  if (!roomData) {
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);

    return <div>No room data available. Redirecting...</div>;
  }

  return (
    <div className="flex flex-col max-w-full pt-12 bg-white">
      <div className="flex flex-col self-center w-full max-w-[1323px] max-md:max-w-full px-10">
        <Header />
        <main>
          <div className="mt-10">
            <BookingForm />
            <div>
              <RoomDetailsCard {...roomData} />
            </div>
            <div>
              <RoomImages images={roomData.images} />
            </div>
            <div>
              <RoomOverview />
            </div>
            <div className="mt-10">
              <AmenitiesList />
            </div>
            <div className="mt-10">
              <RoomReviewSection />
            </div>
            <div>
              <Testimonials />
            </div>
            <div>
              <NewsLetter />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetailsPage;