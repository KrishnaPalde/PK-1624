import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
  DialogClose,
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
        const response = await axios.get(`${process.VITE_HOST_URL}/api/offers/active`);
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
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No coupon offers available at the moment.
      </div>
    );
  }

  const renderCouponCard = (coupon) => (
    
    <Card className=" m-4 w-[350px] h-[100px] bg-white border-2 border-[#335064] border-dashed border-spacing-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-xl font-bold text-[#335064]">{coupon.code}</CardTitle>
        
      </CardHeader>
      <CardContent className="flex justify-between items-center px-4 py-2">
        <Badge variant="secondary" className="text-[#335064] border-[#335064]">
          {coupon.type}
        </Badge>
        <p className="text-lg font-semibold text-[#335064]">
          {coupon.discountType === "percentage"
            ? `${coupon.discountValue}% OFF`
            : `₹${coupon.discountValue} OFF`}
        </p>
      </CardContent>
    </Card>
  );
  

  const renderCouponDetails = (coupon) => (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="mb-4 text-3xl font-bold text-[#335064]">{coupon.code}</h2>
      <p className="mb-4 text-lg text-gray-700">{coupon.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <PercentIcon className="mr-2 text-[#335064]" />
          <span>
            {coupon.discountType === "percentage"
              ? `${coupon.discountValue}% OFF`
              : `₹${coupon.discountValue} OFF`}
          </span>
        </div>
        <div className="flex items-center">
          <TagIcon className="mr-2 text-[#335064]" />
          <span>{coupon.type}</span>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="mr-2 text-[#335064]" />
          <span>
            Valid until: {new Date(coupon.expirationDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      {renderCouponConditions(coupon)}
      {/* <Button
        className="w-full mt-4 bg-[#335064] text-white hover:bg-[#2a4a57]"
        onClick={() => onApplyCoupon(coupon.code)}
      >
        Apply Coupon
      </Button> */}
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
      <div className="p-4 bg-purple-100 rounded-lg">
        <h3 className="mb-2 font-semibold text-purple-700">Conditions:</h3>
        <p>{conditionText}</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel className="w-full" plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
        <CarouselContent>
          {coupons.map((coupon) => (
            <CarouselItem key={coupon._id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer">
                      {renderCouponCard(coupon)}
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Coupon Details</DialogTitle>
                      <DialogDescription>
                        Get more information about this offer and how to apply it.
                      </DialogDescription>
                    </DialogHeader>
                    {renderCouponDetails(coupon)}
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default OffersCarousel;
