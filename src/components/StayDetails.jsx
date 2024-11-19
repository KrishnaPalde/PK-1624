import React, { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useBooking } from "../contexts/BookingFormContext";
import PaymentButton from "./PaymentButton";
import PriceDetail from "./PriceDetail";
import DateDisplay from "./DateDisplay";
import { HiMiniHomeModern } from "react-icons/hi2";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Check,ChevronDown } from "lucide-react";

const process = import.meta.env;

function SelectedRooms({ rooms }) {
  return (
    <div className="mt-4">
      <h2 className="mb-2 text-xl font-bold">Selected Rooms</h2>
      {rooms.map((room, index) => (
        <div key={index} className="flex items-center p-2 mb-4 bg-gray-100 rounded-lg">
          <img
          loading="lazy"
            src={room.images[0]}
            alt={room.name}
            className="object-cover w-24 h-24 mr-4 rounded-md"
          />
          <div>
            <h3 className="font-semibold">{room.name}</h3>
            <p>{room.title}</p>
            <p className="font-medium">₹{room.price} per night</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function StayDetails({ formData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingInfo } = useBooking();
  const [globalSettings, setGlobalSettings] = useState({
    tax: 0,
    serviceCharges: 0,
    extraPersonCharges: 0
  });
  const [couponError , setCouponError] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const selectedRooms = location.state?.selectedRooms || [];

  useEffect(() => {
    if (selectedRooms.length === 0) {
      navigate("/");
    } else {
      const fetchGlobalSettings = async () => {
        try {
          const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/global-settings`);
          setGlobalSettings(response.data.roomTaxesAndCharges);
        } catch (error) {
          console.error("Failed to fetch global settings", error);
        }
      };

      fetchGlobalSettings();
      fetchCoupons();
    }
  }, [navigate, selectedRooms]);

  const calculateNights = useMemo(() => {
    if (!bookingInfo.checkIn || !bookingInfo.checkOut) return 0;
    const checkInDate = new Date(bookingInfo.checkIn);
    const checkOutDate = new Date(bookingInfo.checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }, [bookingInfo.checkIn, bookingInfo.checkOut]);

  const countGuests = useMemo(() => {
    return bookingInfo.adults + bookingInfo.children;
  }, [bookingInfo.adults, bookingInfo.children]);

  const totalBasePrice = useMemo(() => {
    return selectedRooms.reduce((total, room) => total + room.price, 0) * calculateNights;
  }, [selectedRooms, calculateNights]);

  function calculateExtraPersonCharges(adultCount, roomCount, extraPersonRate) {
    const maxAdultsPerRoom = 2;
    const maxTotalAdults = roomCount * maxAdultsPerRoom;
    const extraPersons = adultCount > maxTotalAdults ? adultCount - maxTotalAdults : 0;
    return [Math.round(extraPersons * extraPersonRate), extraPersons];
  }

  const priceDetails = useMemo(() => {
    const taxes = Math.round(totalBasePrice * (globalSettings.tax / 100));
    const serviceFee = Math.round(countGuests * globalSettings.serviceCharges);
    var extraPersonCharges = 0;
    var extraPersonCount = 0;
    console.log(selectedRooms);
    if(!(selectedRooms.length === 1 && selectedRooms[0].name === "Panoramic View")) {
      const res = calculateExtraPersonCharges(bookingInfo.adults, selectedRooms.length, globalSettings.extraPersonCharges);
      extraPersonCharges = res[0];
      extraPersonCount = res[1];
    }
    // if(bookingInfo.adults === 3 && selectedRooms.length === 1 && selectedRooms[0].name != "Panoramic View"){
    //   extraPersonCharges = Math.round(1 * globalSettings.extraPersonCharges);
    // } else if (bookingInfo.adults === 6 && selectedRooms.length === 2) {
    //   extraPersonCharges = Math.round(2 * globalSettings.extraPersonCharges);
    // } else if (bookingInfo.adults === 9 && selectedRooms.length === 3){
    //   extraPersonCharges = Math.round(3 * globalSettings.extraPersonCharges);
    // } else if (bookingInfo.adults === 12 && selectedRooms.length === 4) {
    //   extraPersonCharges = Math.round(4 * globalSettings.extraPersonCharges);
    // }
     

    return [
      { label: `Base Fare (${calculateNights} night${calculateNights === 1 ? '' : 's'})`, amount: totalBasePrice },
      { label: "Taxes", amount: taxes },
      { label: "Service Fee", amount: serviceFee },
      { label: `Extra Person Charges (x${extraPersonCount})`, amount:extraPersonCharges },
      { label: "Discount", amount: -discountAmount },
    ];
  }, [totalBasePrice, calculateNights, countGuests, globalSettings, discountAmount]);

  const totalPrice = useMemo(() => {
    return priceDetails.reduce((sum, detail) => sum + detail.amount, 0);
  }, [priceDetails]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `₹${Math.abs(amount).toLocaleString('en-IN')}`;
  };

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${process.VITE_HOST_URL}/api/offers/active`);
      setCoupons(response.data);
    } catch (error) {
      console.error("Failed to fetch coupons", error);
    }
  };

  const applyCoupon = async (couponCode) => {
    try {
      const response = await axios.post(`${process.VITE_HOST_URL}/api/offers/apply`, {
        couponCode,
        bookingDetails: {
          checkInDate: bookingInfo.checkIn,
          checkOutDate: bookingInfo.checkOut,
          totalAmount: totalPrice,
          roomType: selectedRooms[0].type, 
        },
      });

     
        setAppliedCoupon(response.data.appliedCoupon);
        setDiscountAmount(response.data.discountAmount);
      

      
    } catch (error) {
      console.log(error);
      if(error.response.status == 400){
        setCouponError(error.response.data.message);
      } else {
        // alert("Error Applying Coupon");
        }
      console.error("Failed to apply coupon", error);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  if (selectedRooms.length === 0 || !bookingInfo.checkIn) {
    return <div>Loading... Please wait.</div>;
  }

  return (
    <section className="flex flex-col rounded-xl">
      <h1 className="self-start ml-9 text-2xl font-bold text-neutral-900 max-md:ml-2.5">
        Your Stay Details
      </h1>
      <div className="flex flex-col w-full p-6 overflow-hidden bg-white shadow-sm rounded-xl max-md:px-5 max-md:max-w-full">
        <SelectedRooms rooms={selectedRooms} />
        <div className="flex items-center justify-between w-full mt-4 gap-9 max-md:max-w-full">
          <DateDisplay date={formatDate(bookingInfo.checkIn)} type="Check-In" />
          <div className="flex flex-row items-center self-stretch justify-between my-auto ">
            <div className="rotate-[-1.5707963267948966rad]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="12" r="3" fill="#335064" />
                <line x1="7" y1="12" x2="24" y2="12" stroke="#335064" strokeWidth="2" />
              </svg>    
            </div>
            <HiMiniHomeModern className="w-8 h-8 mx-4 text-[#335064]"/>
            <div className="rotate-[-1.5707963267948966rad]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="12" r="3" fill="#335064" />
                <line x1="0" y1="12" x2="17" y2="12" stroke="#335064" strokeWidth="2" />
              </svg>        
            </div>
          </div>
          <DateDisplay date={formatDate(bookingInfo.checkOut)} type="Check-Out" />
        </div>

        <p className="mt-4 text-base font-medium text-neutral-900">
          Duration of stay: <span className="font-bold">{calculateNights} night{calculateNights === 1 ? '' : 's'}</span>
        </p>

        {coupons.length > 0 
        ? <div className="flex flex-col items-center p-2 mt-4 bg-white border border-gray-300 rounded-lg shadow-sm ">
            <div className="flex items-center w-full">
              <DropdownMenu className="w-full">
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full">
                    {appliedCoupon ? `Applied: ${appliedCoupon}` : "Select a coupon"}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-96 ">
                  {coupons.map((coupon) => (
                    <DropdownMenuItem
                      key={coupon._id}
                      onClick={() => applyCoupon(coupon.code)}
                      className="flex items-center justify-between cursor-pointer hover:bg-gray-800 "
                    >
                      <span>{coupon.code}</span>
                      {appliedCoupon === coupon.code && <Check className="w-4 h-4 ml-2" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {appliedCoupon && (
              <div className="flex items-center mt-2">
                <span className="font-medium text-green-600">
                  Coupon applied: {appliedCoupon}
                </span>
                <span 
                  onClick={removeCoupon} 
                  className="ml-4 text-gray-600 cursor-pointer"
                  aria-hidden="true"
                >
                  &#10005;
                </span>
              </div>
            )}
            {couponError && (
                <div className="flex items-center mt-2">
                  <span className="font-medium text-red-600">
                    {couponError}
                  </span>
                  <span 
                    onClick={() => setCouponError('')} 
                    className="ml-4 text-gray-600 cursor-pointer"
                    aria-hidden="true"
                  >
                    &#10005;
                  </span>
                </div>
              )
            }
          </div>
        : <div></div>} 

        <p className="mt-4 text-base font-medium text-neutral-900">
          Your booking is protected by{" "}
          <span className="font-bold">Tranquil Trails</span>
        </p>
        <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
        <div className="flex flex-col w-full mt-4 text-base text-neutral-900 max-md:max-w-full">
          <h2 className="font-semibold">Price Details</h2>
          {priceDetails.map((detail, index) => {
            if (detail.label === "Discount" && detail.amount === 0) {
              return null;
            }
            return (
              <PriceDetail
                key={index}
                label={detail.label}
                amount={formatCurrency(detail.amount)}
              />
            );
          })}
        </div>

        <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
        <div className="flex items-start justify-between w-full gap-10 mt-4 text-base text-neutral-900 max-md:max-w-full">
          <div className="font-medium">Total </div>
          <div className="font-semibold">{formatCurrency(totalPrice)}</div>
        </div>

        <div className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 mt-4 max-w-full text-xl text-center text-white rounded w-[170px]">
          <PaymentButton 
            roomData={selectedRooms}
            formData={{ ...bookingInfo, ...formData }}
            amount={totalPrice}
            adults={bookingInfo.adults}
            children={bookingInfo.children}
            priceDetails={priceDetails}
            calculateNights={calculateNights}
          />
        </div>
      </div>
    </section>
  );
}

export default StayDetails;