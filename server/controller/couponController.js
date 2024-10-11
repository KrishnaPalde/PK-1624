const Coupon = require("../models/Coupon");

const createCoupon = async (req, res) => {
  const {
    code,
    discountType,
    discountValue,
    type,
    conditions,
    expirationDate,
  } = req.body;

  try {
    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      type,
      conditions,
      expirationDate,
      isActive: true,
    });

    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
};

const deleteCoupon = async (req, res) => {
  const { couponCode } = req.params;

  try {
    const deletedCoupon = await Coupon.findOneAndDelete({ code: couponCode });

    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};

const deactivateCoupon = async (req, res) => {
  const { couponCode } = req.params;

  try {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    coupon.isActive = false;
    await coupon.save();

    res.status(200).json({ message: "Coupon deactivated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deactivating coupon", error });
  }
};

const getAllActiveCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isActive: true });

    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
};

const getAllCoupons = async (req,res) => {
  try{
    const coupons = await Coupon.find({});
    res.status(200).json(coupons);
  } catch (error){
      res.status(500).json({message: "Error fetching coupons", error});
  }
};

const applyCoupon = async (req, res) => {
  const { couponCode, bookingDetails } = req.body;

  try {
    // Fetch the coupon details
    const coupon = await Coupon.findOne({ code: couponCode });

    // Check if coupon exists and is active
    if (!coupon || !coupon.isActive || new Date() > coupon.expirationDate) {
      return res.status(400).json({ message: "Invalid or expired coupon" });
    }

    // Based on coupon type, validate the relevant condition
    switch (coupon.type) {
      case "Advance Booking":
        const daysInAdvance =
          (new Date(bookingDetails.checkInDate) - new Date()) /
          (1000 * 60 * 60 * 24);
        if (daysInAdvance < coupon.conditions.advanceBookingDays) {
          return res.status(400).json({
            message: `You need to book ${coupon.conditions.advanceBookingDays} days in advance to use this coupon`,
          });
        }
        break;

      case "Minimum Booking Amount":
        if (bookingDetails.totalAmount < coupon.conditions.minBookingAmount) {
          return res.status(400).json({
            message: `Booking amount must be at least ₹${coupon.conditions.minBookingAmount} to use this coupon`,
          });
        }
        break;

      case "Length of Stay":
        const lengthOfStay =
          (new Date(bookingDetails.checkOutDate) -
            new Date(bookingDetails.checkInDate)) /
          (1000 * 60 * 60 * 24);
        if (lengthOfStay < coupon.conditions.minLengthOfStay) {
          return res.status(400).json({
            message: `You need to stay for at least ${coupon.conditions.minLengthOfStay} nights to use this coupon`,
          });
        }
        break;

      case "Seasonal Promotion":
        const currentDate = new Date();
        if (
          currentDate < new Date(coupon.conditions.seasonStartDate) ||
          currentDate > new Date(coupon.conditions.seasonEndDate)
        ) {
          return res.status(400).json({
            message: `This coupon is only valid between ${coupon.conditions.seasonStartDate} and ${coupon.conditions.seasonEndDate}`,
          });
        }
        break;

      case "Room Type":
        if (
          !coupon.conditions.applicableRoomTypes.includes(
            bookingDetails.roomType
          )
        ) {
          return res.status(400).json({
            message: `This coupon is not applicable for the selected room type`,
          });
        }
        break;

      case "Fixed Amount":
        // Fixed amount coupon doesn't need additional validation
        break;

      default:
        return res.status(400).json({ message: "Unknown coupon type" });
    }

    // Apply discount (percentage or fixed amount)
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount =
        (bookingDetails.totalAmount * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    const finalAmount = bookingDetails.totalAmount - discountAmount;

    // Update booking details to mark the coupon as applied
    bookingDetails.appliedCoupon = couponCode;

    res.status(200).json({
      message: "Coupon applied successfully!",
      finalAmount,
      discountAmount,
      appliedCoupon: couponCode,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to apply coupon", error });
  }
};

module.exports = {
  createCoupon,
  applyCoupon,
  deleteCoupon,
  deactivateCoupon,
  getAllActiveCoupons,
  getAllCoupons,
};
