const Booking = require("../models/Bookings");
const Room = require("../models/Room");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf"); // Import html-pdf

// Helper function to get dates between two dates
// const getDatesBetween = (startDate, endDate) => {
//   const dates = [];
//   let currentDate = new Date(startDate);

//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// };

// Method to check if dates are available for booking
const checkIfAvailable = async (req, res) => {
  const { checkinDate, checkoutDate } = req.query;

  if (!checkinDate || !checkoutDate) {
    return res
      .status(400)
      .json({ message: "Check-in and check-out dates are required" });
  }

  try {
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $lte: new Date(checkoutDate) },
          checkOutDate: { $gte: new Date(checkinDate) },
        },
        {
          checkInDate: {
            $gte: new Date(checkinDate),
            $lte: new Date(checkoutDate),
          },
        },
        {
          checkOutDate: {
            $gte: new Date(checkinDate),
            $lte: new Date(checkoutDate),
          },
        },
      ],
    });

    if (bookings.length > 0) {
      return res
        .status(200)
        .json({ available: false, message: "Dates are not available" });
    } else {
      return res
        .status(200)
        .json({ available: true, message: "Dates are available" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomDetails = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({
      id: room.id,
      name: room.name,
      title: room.title,
      description: room.description,
      rating: room.rating,
      price: room.price,
      reviews: room.reviews,
      images: room.images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRoomsStatic = async (req, res) => {
  try {
    const rooms = await Room.find({}).select("-reviews");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    console.log(req.query);
    const { checkinDate, checkoutDate } = req.query;

    console.log(checkinDate);
    console.log(checkoutDate);
    // Parse dates and check if they are valid
    const parsedCheckIn = new Date(checkinDate);
    const parsedCheckOut = new Date(checkoutDate);

    if (isNaN(parsedCheckIn) || isNaN(parsedCheckOut)) {
      return res.status(400).json({
        message: "Invalid date format for check-in or check-out date",
      });
    }

    // Find all bookings that overlap with the requested dates
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $lte: parsedCheckOut },
          checkOutDate: { $gte: parsedCheckIn },
        },
      ],
    }).select("rooms");

    // Get the names of rooms that are already booked within the requested date range
    const bookedRoomNames = new Set();
    let isPenthouseBooked = false;

    bookings.forEach((booking) => {
      booking.rooms.forEach((room) => {
        if (room.roomName === "Panoramic View") {
          isPenthouseBooked = true;
        } else {
          bookedRoomNames.add(room.roomName);
        }
      });
    });

    let rooms;
    if (isPenthouseBooked) {
      // If penthouse is booked, exclude all rooms 1 to 4
      rooms = [];
    } else if (bookedRoomNames.size > 0) {
      // If any individual room (1-4) is booked, exclude penthouse
      rooms = await Room.find({
        name: { $nin: ["Panoramic View", ...Array.from(bookedRoomNames)] },
      }).select("-reviews");
    } else {
      // If no rooms are booked, return all available rooms
      rooms = await Room.find().select("-reviews");
    }
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const get5Rooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
      .select("-reviews")
      .sort({ rating: -1 }) // Sort by rating in descending order
      .limit(5); // Limit to top 5 rooms
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getUnavailableDates = async (req, res) => {
//   try {
//     const today = new Date();
//     const thirtyDaysFromNow = new Date();
//     const tomorrow = today.getDate()+1;
//     thirtyDaysFromNow.setDate(today.getDate() + 30);

//     const bookings = await Booking.find({
//       checkInDate: { $gte: today, $lte: thirtyDaysFromNow },
//       checkOutDate: {$gte: tomorrow},
//     }).select("checkInDate checkOutDate");

//     bookings.forEach((booking)=>{
//       console.log(booking);
//     })

//     const unavailableDates = [];

//     bookings.forEach((booking) => {
//       let currentDate = new Date(booking.checkInDate);
//       while (currentDate <= new Date(booking.checkOutDate)) {
//         unavailableDates.push(
//           new Date(currentDate).toISOString().split("T")[0]
//         ); // Store the date in YYYY-MM-DD format
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     });

//     res.status(200).json({ unavailableDates });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getUnavailableDates = async (req, res) => {
//   try {
//     const today = new Date();
//     const thirtyDaysFromNow = new Date();
//     thirtyDaysFromNow.setDate(today.getDate() + 365);

//     const bookings = await Booking.find({
//       $or: [
//         {
//           checkInDate: { $gte: today, $lte: thirtyDaysFromNow },
//           checkOutDate: { $gte: today },
//         },
//         { checkOutDate: { $gte: today, $lte: thirtyDaysFromNow } },
//       ],
//     }).select("checkInDate checkOutDate");

//     const unavailableDates = [];

//     bookings.forEach((booking) => {
//       let currentDate = new Date(booking.checkInDate);
//       while (currentDate <= new Date(booking.checkOutDate)) {
//         unavailableDates.push(
//           new Date(currentDate).toISOString().split("T")[0]
//         );
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     });

//     res.status(200).json({ unavailableDates });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getUnavailableDates = async (req, res) => {
  try {
    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(today.getDate() + 365);

    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $gte: today, $lte: oneYearFromNow },
          checkOutDate: { $gte: today },
        },
        { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
      ],
    }).select("checkInDate checkOutDate rooms");

    const unavailableDates = new Set();
    const singleRoomBookings = {}; // Track bookings per date for single rooms

    bookings.forEach((booking) => {
      const isPenthouse = booking.rooms.some(
        (room) => room.roomName === "Panoramic View"
      );

      let currentDate = new Date(booking.checkInDate);
      while (currentDate <= new Date(booking.checkOutDate)) {
        const dateStr = new Date(currentDate).toISOString().split("T")[0];

        if (isPenthouse) {
          // Mark date as unavailable if the penthouse is booked
          unavailableDates.add(dateStr);
        } else {
          // Count single room bookings per date
          booking.rooms.forEach((room) => {
            if (room.roomName !== "Panoramic View") {
              singleRoomBookings[dateStr] =
                (singleRoomBookings[dateStr] || 0) + 1;

              // If all 4 single bedrooms are booked, mark the date as unavailable
              if (singleRoomBookings[dateStr] >= 4) {
                unavailableDates.add(dateStr);
              }
            }
          });
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    res.status(200).json({ unavailableDates: Array.from(unavailableDates) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const fetchBookingsAdmin = async (req, res) => {
//   try {
//     const { recent, limit } = req.query;

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Fetch only upcoming bookings where check-in date is today or later
//     let query = Booking.find({ checkInDate: { $gte: today } });

//     // If 'recent' parameter is provided and true, fetch the most recently added bookings
//     if (recent === "true") {
//       query = query.sort({ _id: -1 }).limit(parseInt(limit) || 5); // Default limit is 5 if not specified
//     }

//     // Execute the query
//     const bookings = await query.exec();

//     // Return the fetched bookings
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const fetchBookingsAdmin = async (req, res) => {
  try {
    const { recent, limit, timeframe } = req.query;

    let query = Booking.find();

    if (timeframe) {
      const now = new Date();
      let startDate;

      switch (timeframe) {
        case "day":
          startDate = new Date(now.setDate(now.getDate() - 1));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          startDate = new Date(0);
      }

      query = query.where("createdAt").gte(startDate);
    }

    query = query.sort({ createdAt: -1 });

    if (recent === "true") {
      query = query.limit(parseInt(limit) || 5);
    }

    const bookings = await query.exec();

    const bookingsWithRoomNames = await Promise.all(
      bookings.map(async (booking) => {
        const room = await Room.findOne({ id: booking.roomId });
        const roomName = room ? room.name : "Unknown Room";

        return {
          ...booking.toObject(),
          roomName,
          bookingId: booking.bookingId.slice(-4),
        };
      })
    );

    res.status(200).json(bookingsWithRoomNames);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments({});

    // Scheduled bookings (future bookings with check-in date greater than today)
    const scheduledBookings = await Booking.countDocuments({
      checkInDate: { $gt: new Date() },
    });

    // Today's check-ins (bookings where check-in date is today)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const checkIns = await Booking.countDocuments({
      checkInDate: { $gte: startOfDay, $lte: endOfDay },
    });

    // Today's check-outs (bookings where check-out date is today)
    const checkOuts = await Booking.countDocuments({
      checkOutDate: { $gte: startOfDay, $lte: endOfDay },
    });

    // Send response with all stats
    res.status(200).json({
      total: totalBookings,
      upcoming: scheduledBookings,
      "check-in": checkIns,
      "check-out": checkOuts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    const bookingsWithRoomNames = await Promise.all(
      bookings.map(async (booking) => {
        const room = await Room.findOne({ id: booking.roomId });
        const roomName = room ? room.name : "Unknown Room";

        const bookingId = booking.bookingId.slice(-4);

        const bookingData = {
          bookingId,
          firstName: booking.firstName,
          lastName: booking.lastName,
          phoneNumber: booking.phoneNumber,
          totalPayment: booking.totalPayment,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          roomName,
          roomId: booking.roomId,
          createdAt: booking.createdAt,
        };

        return bookingData;
      })
    );

    res.json(bookingsWithRoomNames);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log("Received bookingId:", bookingId);

    const bookings = await Booking.find({
      bookingId: { $regex: bookingId + "$" },
    });

    console.log("Matching bookings found:", bookings.length);

    if (bookings.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (bookings.length > 1) {
      console.warn("Multiple bookings found with the same last 4 characters");
    }

    const booking = bookings[0];

    const room = await Room.findOne({ id: booking.roomId });
    const roomName = room ? room.name : "Unknown Room";
    const transactionId =
      booking.transactions.length > 0
        ? booking.transactions[0].transactionId
        : "No Transaction ID";

    const bookingData = {
      bookingId: booking.bookingId,
      firstName: booking.firstName,
      lastName: booking.lastName,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      idDocument: booking.idDocument,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      paymentStatus: booking.paymentStatus,
      totalPayment: booking.totalPayment,
      numberOfAdults: booking.numberOfAdults,
      numberOfChildren: booking.numberOfChildren,
      numberOfInfants: booking.numberOfInfants,
      roomName,
      roomId: booking.roomId,
      transactionId,
    };

    res.json(bookingData);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRoomDetailsForm = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log("Received bookingId:", bookingId);

    const bookings = await Booking.find({
      bookingId: { $regex: bookingId + "$" },
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = bookings[0];

    const room = await Room.findOne({ id: booking.roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const roomData = {
      id: room.id,
      name: room.name,
      title: room.title,
      description: room.description,
      rating: room.rating,
      price: room.price,
      images: room.images,
    };

    res.json(roomData);
  } catch (error) {
    console.error("Error fetching room details for booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const addRoom = async (req, res) => {
//   try {
//     const { name, title, description, price, weekend } = req.body;
//     const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
//     const freebies = req.body.freebies ? JSON.parse(req.body.freebies) : [];
//     const images = req.files ? req.files.map((file) => file.path) : [];

//     const newRoom = new Room({
//       id: Date.now().toString(),
//       name,
//       title,
//       description,
//       price,
//       weekend,
//       amenities,
//       freebies,
//       images,
//     });

//     const savedRoom = await newRoom.save();
//     res.status(201).json(savedRoom);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const addRoom = async (req, res) => {
  try {
    const { name, title, description, price, weekend, images, rating } =
      req.body;
    const newRoom = new Room({
      id: Date.now().toString(),
      name,
      title,
      description,
      price,
      weekend,
      images,
      rating,
    });
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRoomStatuses = async (req, res) => {
  try {
    const rooms = await Room.find({});
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    let updatedRooms = 0;
    let occupiedRooms = 0;
    let reservedRooms = 0;

    for (let room of rooms) {
      const booking = await Booking.findOne({
        roomId: room.id,
        checkInDate: { $lte: currentDate },
        checkOutDate: { $gt: currentDate },
      }).sort("checkInDate");

      let newStatus = "Available";
      let statusDetails = "";

      if (booking) {
        if (booking.checkInDate.toDateString() === currentDate.toDateString()) {
          newStatus = "Check-in Today";
          statusDetails = `Check-in today, check-out on ${
            booking.checkOutDate.toISOString().split("T")[0]
          }`;
        } else {
          newStatus = "Occupied";
          statusDetails = `Occupied until ${
            booking.checkOutDate.toISOString().split("T")[0]
          }`;
        }
        occupiedRooms++;
      } else {
        const futureBooking = await Booking.findOne({
          roomId: room.id,
          checkInDate: { $gt: currentDate },
        }).sort("checkInDate");

        if (futureBooking) {
          newStatus = "Reserved";
          statusDetails = `Reserved from ${
            futureBooking.checkInDate.toISOString().split("T")[0]
          }`;
          reservedRooms++;
        }
      }

      if (room.status !== newStatus || room.statusDetails !== statusDetails) {
        room.status = newStatus;
        room.statusDetails = statusDetails;
        await room.save();
        updatedRooms++;
      }
    }

    res.status(200).json({
      message: "Room statuses updated successfully",
      totalRooms: rooms.length,
      occupiedRooms: occupiedRooms,
      reservedRooms: reservedRooms,
      updatedRooms: updatedRooms,
    });
  } catch (error) {
    console.error("Error in updateRoomStatuses:", error);
    res
      .status(500)
      .json({ message: "Error updating room statuses", error: error.message });
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.id;

  if (!roomId) {
    return res.status(400).json({ error: "Room ID is required" });
  }

  try {
    const result = await Room.findOneAndDelete({ id: roomId });
    if (!result) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

const updateRoomPrice = async (req, res) => {
  const { roomId } = req.params;
  const { price, weekend } = req.body;

  try {
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.price = price;
    room.weekend = weekend;

    await room.save();
    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkIfAvailable,
  getRoomDetails,
  getAllRooms,
  getUnavailableDates,
  fetchBookingsAdmin,
  getDashboardStats,
  getBookings,
  getBookingById,
  getRoomDetailsForm,
  addRoom,
  updateRoomStatuses,
  deleteRoom,
  updateRoomPrice,
  get5Rooms,
  getAllRoomsStatic,
};
