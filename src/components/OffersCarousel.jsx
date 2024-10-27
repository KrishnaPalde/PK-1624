import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarIcon, PercentIcon, TagIcon, Loader2 } from "lucide-react";

const process = import.meta.env;

const OffersCarousel = ({ onApplyCoupon }) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const renderBasicCouponCard = (coupon) => (
    <Card className="h-[100px] bg-white border-2 border-[#335064] border-dashed shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="px-3 py-2">
        <CardTitle className="text-lg font-bold text-[#335064]">
          {coupon.code}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between px-3 py-1">
        <Badge
          variant="secondary"
          className="text-[#335064] border-[#335064] text-xs"
        >
          {coupon.type}
        </Badge>
        <p className="text-sm font-semibold text-[#335064]">
          {coupon.discountType === "percentage"
            ? `${coupon.discountValue}% OFF`
            : `₹${coupon.discountValue} OFF`}
        </p>
      </CardContent>
    </Card>
  );

  const renderImageCouponCard = (coupon) => (
    <Card className="flex items-start p-4 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      <div className="flex-shrink-0 w-20 h-20 mr-4">
        <img
          src={coupon.image}
          alt={`${coupon.code} coupon`}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-gray-600">{coupon.type}</p>
          <p className="text-xs font-medium text-gray-400">T&C'S APPLY</p>
        </div>
        <h3 className="mt-1 text-lg font-semibold text-gray-800">{coupon.code}</h3>
        <p className="mt-1 text-sm text-gray-600">
          {coupon.discountType === "percentage"
            ? `${coupon.discountValue}% OFF`
            : `₹${coupon.discountValue} OFF`}
        </p>
      </div>
    </Card>
  );

  const renderBasicCouponDetails = (coupon) => (
    <div className="p-4 bg-white rounded-lg shadow-xl">
      <h2 className="mb-3 text-2xl font-bold text-[#335064]">{coupon.code}</h2>
      <p className="mb-3 text-sm text-gray-700">{coupon.description}</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <span className="text-sm">
            {coupon.discountType === "percentage" ? (
              <>
                <PercentIcon className="mr-2 text-[#335064] w-4 h-4" />{" "}
                {`${coupon.discountValue}% OFF`}
              </>
            ) : (
              `₹${coupon.discountValue} OFF`
            )}
          </span>
        </div>
        <div className="flex items-center">
          <TagIcon className="mr-2 text-[#335064] w-4 h-4" />
          <span className="text-sm">{coupon.type}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="mr-2 text-[#335064] w-4 h-4" />
          <span className="text-sm">
            Valid until:{" "}
            {new Date(coupon.expirationDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      {renderCouponConditions(coupon)}
    </div>
  );

  const renderImageCouponDetails = (coupon) => (
    <div className="p-4 bg-white rounded-lg shadow-xl">
      <img
        src={coupon.image}
        alt={`${coupon.code} full coupon`}
        className="object-cover w-full h-40 mb-3 rounded-lg"
      />
      <h2 className="mb-3 text-2xl font-bold text-[#335064]">{coupon.code}</h2>
      <p className="mb-3 text-sm text-gray-700">{coupon.description}</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <span className="text-sm">
            {coupon.discountType === "percentage" ? (
              <>
                <PercentIcon className="mr-2 text-[#335064] w-4 h-4" />{" "}
                {`${coupon.discountValue}% OFF`}
              </>
            ) : (
              `₹${coupon.discountValue} OFF`
            )}
          </span>
        </div>
        <div className="flex items-center">
          <TagIcon className="mr-2 text-[#335064] w-4 h-4" />
          <span className="text-sm">{coupon.type}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="mr-2 text-[#335064] w-4 h-4" />
          <span className="text-sm">
            Valid until:{" "}
            {new Date(coupon.expirationDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      {renderCouponConditions(coupon)}
    </div>
  );
  

  const renderCouponConditions = (coupon) => {
    let conditionText = "";
    switch (coupon.type) {
      case "Advance Booking":
        conditionText = `Book at least ${coupon.conditions.advanceBookingDays} days in advance`;
        break;
      case "Minimum Booking Amount":
        conditionText = `Minimum booking amount: ₹${coupon.conditions.minBookingAmount}`;
        break;
      case "Length of Stay":
        conditionText = `Minimum stay: ${coupon.conditions.minLengthOfStay} nights`;
        break;
      case "Seasonal Promotion":
        conditionText = `Valid from ${new Date(
          coupon.conditions.seasonStartDate
        ).toLocaleDateString()} to ${new Date(
          coupon.conditions.seasonEndDate
        ).toLocaleDateString()}`;
        break;
      case "Room Type":
        conditionText = `Valid for: ${coupon.conditions.applicableRoomTypes.join(
          ", "
        )}`;
        break;
      default:
        conditionText = "No special conditions";
    }
    return (
      <div className="p-3 bg-purple-100 rounded-lg">
        <h3 className="mb-1 text-sm font-semibold text-purple-700">
          Conditions:
        </h3>
        <p className="text-xs">{conditionText}</p>
      </div>
    );
  };

  return (
    <div className="w-full px-4 mx-auto my-8 max-w-7xl">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {coupons.map((coupon) => (
            <CarouselItem
              key={coupon._id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    {coupon.image 
                      ? renderImageCouponCard(coupon)
                      : renderBasicCouponCard(coupon)
                    }
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Coupon Details</DialogTitle>
                    <DialogDescription>
                      Apply this coupon at the payment page.
                    </DialogDescription>
                  </DialogHeader>
                  {coupon.image 
                    ? renderImageCouponDetails(coupon)
                    : renderBasicCouponDetails(coupon)
                  }
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious /> */}
        {/* <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default OffersCarousel;