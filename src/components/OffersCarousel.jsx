import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const process = import.meta.env;

const OffersCarousel = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const autoplay = useRef(Autoplay({ delay: 3000 })); // Autoplay plugin
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `${process.VITE_HOST_URL}/api/offers/active`
        );
        setCoupons(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch coupons", error);
        setError("Failed to load coupons. Please try again later.");
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (coupons.length === 0) {
    return null;
  }

  const renderCoupon = (coupon) => (
    <div className="flex w-[400px] h-[200px] border rounded-lg shadow-lg overflow-hidden m-4 bg-white">
      {/* Left Section */}
      <div className="flex flex-col justify-between flex-1 p-4 bg-gray-50">
        <div>
          <p className="text-sm text-gray-400 uppercase">Coupon Type</p>
          <h3 className="text-xl font-bold text-gray-800">
            {coupon.type || "Length of Stay"}
          </h3>
        </div>
        <div>
          <p className="text-sm text-gray-500">Coupon Code:</p>
          <h4 className="text-lg font-semibold text-gray-900">
            {coupon.code || "LONGSTAY"}
          </h4>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Valid Until:{" "}
            <span className="font-semibold">
              {new Date(coupon.expirationDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center flex-shrink-0 w-1/3 bg-teal-700 text-white p-4 relative">
        <div className="text-center">
          <p className="text-4xl font-bold">
            {coupon.discountType === "percentage"
              ? `${coupon.discountValue}%`
              : `₹${coupon.discountValue}`}
          </p>
          <p className="text-xl font-semibold">OFF</p>
        </div>
        <p className="absolute bottom-2 text-xs text-gray-200">
          tranquiltrails.co.in
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full px-4 mx-auto my-8 max-w-7xl">
      <div
        className="overflow-hidden"
        ref={emblaRef} // Reference for the Embla carousel
      >
        <div className="flex">
          {coupons.map((coupon, index) => (
            <div key={index} className="min-w-[400px] flex-none">
              {renderCoupon(coupon)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersCarousel;
