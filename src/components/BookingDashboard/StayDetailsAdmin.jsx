import React from "react";
import DateDisplay from "./DateDisplay";
import StayInfo from "./StayInfo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "../contexts/BookingFormContext";

function StayDetailsAdmin() {
 

  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;

  if (!roomData) {
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);

    return <div>No room data available. Redirecting...</div>;
  }

  const { bookingInfo } = useBooking();

  if (!bookingInfo.checkIn) {
    return <div>No room data available. Please select booking details.</div>;
  }

  const priceDetails = [
    { label: "Base Fare", amount: "₹2400" },
    { label: "Discount", amount: "₹0" },
    { label: "Taxes", amount: "₹200" },
    { label: "Service Fee", amount: "₹50" },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="flex flex-col rounded-xl">
      <div className="flex flex-col w-full p-6 overflow-hidden bg-white shadow-sm rounded-xl max-md:px-5 max-md:max-w-full">
        <StayInfo {...roomData}/>
        <div className="flex items-center justify-between w-full mt-4 gap-9 max-md:max-w-full">
          <DateDisplay date={formatDate(bookingInfo.checkIn)} type="Check-In" />
          <div className="flex flex-col items-center self-stretch my-auto rotate-[-1.5707963267948966rad]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b2528a440ce9044ce459c414a6ae29a23f6c01902220bba421f06d6573fecd3?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt=""
              className="object-contain w-9"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/41a77514d3cff143a87a5a3792ee9951c9f10a760b8b404ce1d4a8c3c9db1f42?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt=""
              className="object-contain w-8 mt-6 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/83703101909837f4d433e817cc649aba33731f1d6fd8e4448b545d82ce40fcf8?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt=""
              className="object-contain mt-6 w-9"
            />
          </div>
          <DateDisplay date={formatDate(bookingInfo.checkOut)} type="Check-Out" />
        </div>
      </div>
    </section>
  );
}

export default StayDetailsAdmin;
