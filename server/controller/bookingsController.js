const Booking = require("../models/Bookings");
const Calendar = require("../models/Calendar");
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

    // Parse dates and check if they are valid
    const parsedCheckIn = new Date(checkinDate);
    const parsedCheckOut = new Date(checkoutDate);

    if (isNaN(parsedCheckIn) || isNaN(parsedCheckOut)) {
      return res.status(400).json({
        message: "Invalid date format for check-in or check-out date",
      });
    }

    // Find bookings that overlap with the requested date range
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $lte: parsedCheckOut },
          checkOutDate: { $gte: parsedCheckIn },
        },
      ],
    }).select("rooms checkInDate checkOutDate");

    // Initialize tracking variables
    const bookedRoomNames = new Set();
    let isPenthouseBooked = false;

    // Process bookings
    bookings.forEach((booking) => {
      booking.rooms.forEach((room) => {
        if (room.roomName === "Panoramic View") {
          isPenthouseBooked = true;
        } else {
          bookedRoomNames.add(room.roomName);
        }
      });
    });

    // Fetch calendar events that overlap with the requested date range
    const calendarEvents = await Calendar.find({
      date: { $gte: parsedCheckIn, $lte: parsedCheckOut },
      status: "booked",
    });

    // Process calendar events
    calendarEvents.forEach((event) => {
      if (event.roomType === "Panoramic View") {
        isPenthouseBooked = true;
      } else {
        bookedRoomNames.add(event.roomType);
      }
    });

    let rooms;
    if (isPenthouseBooked) {
      // If penthouse is booked, exclude all rooms
      rooms = [];
    } else if (bookedRoomNames.size > 0) {
      // If any individual room (1-4) is booked, exclude penthouse and booked rooms
      rooms = await Room.find({
        name: { $nin: ["Panoramic View", ...Array.from(bookedRoomNames)] },
      }).select("-reviews");
    } else {
      // If no rooms are booked, return all available rooms
      rooms = await Room.find().select("-reviews");
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching available rooms:", error.message);
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

// const getUnavailableDates = async (req, res) => {
//   try {
//     const today = new Date();
//     const oneYearFromNow = new Date();
//     oneYearFromNow.setDate(today.getDate() + 365);

//     const bookings = await Booking.find({
//       $or: [
//         {
//           checkInDate: { $gte: today, $lte: oneYearFromNow },
//           checkOutDate: { $gte: today },
//         },
//         { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
//       ],
//     }).select("checkInDate checkOutDate rooms");

//     const unavailableDates = new Set();
//     const singleRoomBookings = {}; // Track bookings per date for single rooms

//     bookings.forEach((booking) => {
//       const isPenthouse = booking.rooms.some(
//         (room) => room.roomName === "Panoramic View"
//       );

//       let currentDate = new Date(booking.checkInDate);
//       while (currentDate <= new Date(booking.checkOutDate)) {
//         const dateStr = new Date(currentDate).toISOString().split("T")[0];

//         if (isPenthouse) {
//           // Mark date as unavailable if the penthouse is booked
//           unavailableDates.add(dateStr);
//         } else {
//           // Count single room bookings per date
//           booking.rooms.forEach((room) => {
//             if (room.roomName !== "Panoramic View") {
//               singleRoomBookings[dateStr] =
//                 (singleRoomBookings[dateStr] || 0) + 1;

//               // If all 4 single bedrooms are booked, mark the date as unavailable
//               if (singleRoomBookings[dateStr] >= 4) {
//                 unavailableDates.add(dateStr);
//               }
//             }
//           });
//         }
//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     });

//     res.status(200).json({ unavailableDates: Array.from(unavailableDates) });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getUnavailableDatesAdmin = async (req, res) => {
  try {
    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(today.getDate() + 365);

    const unavailableDates = {}; // Tracks dates and their statuses

    // Helper function to process a date
    const processDate = (dateStr, roomName) => {
      const isPenthouse = roomName === "Panoramic View";

      if (!unavailableDates[dateStr]) {
        unavailableDates[dateStr] = {
          singleCount: 0,
          penthouse: false,
          status: "available",
        };
      }

      if (isPenthouse) {
        // If penthouse is booked, mark the date as fully booked
        unavailableDates[dateStr] = {
          singleCount: 0,
          penthouse: true,
          status: "fullyBooked",
        };
      } else {
        // Increment single room count only if the penthouse is not booked
        if (!unavailableDates[dateStr].penthouse) {
          unavailableDates[dateStr].singleCount += 1;

          // Update status based on single room bookings
          if (unavailableDates[dateStr].singleCount >= 4) {
            unavailableDates[dateStr].status = "fullyBooked";
          } else {
            unavailableDates[dateStr].status = "partiallyBooked";
          }
        }
      }
    };

    // Step 1: Process Bookings
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $gte: today, $lte: oneYearFromNow },
          checkOutDate: { $gte: today },
        },
        { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
      ],
    }).select("checkInDate checkOutDate rooms");

    bookings.forEach((booking) => {
      booking.rooms.forEach((room) => {
        let currentDate = new Date(booking.checkInDate);
        while (currentDate <= new Date(booking.checkOutDate)) {
          const dateStr = currentDate.toISOString().split("T")[0];
          processDate(dateStr, room.roomName);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });

    // Step 2: Process Calendar Events
    const calendarEvents = await Calendar.find({
      date: { $gte: today, $lte: oneYearFromNow },
      status: "booked",
    });

    calendarEvents.forEach((event) => {
      const dateStr = event.date.toISOString().split("T")[0];
      processDate(dateStr, event.roomType); // Assuming `roomType` maps to room names
    });

    // Step 3: Format the response
    const formattedUnavailableDates = Object.entries(unavailableDates).map(
      ([date, { status }]) => ({ date, status })
    );

    res.status(200).json({ unavailableDates: formattedUnavailableDates });
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    res.status(500).json({ message: error.message });
  }
};

// const getUnavailableDates = async (req, res) => {
//   try {
//     const today = new Date();
//     const oneYearFromNow = new Date();
//     oneYearFromNow.setDate(today.getDate() + 365);

//     const unavailableDates = new Set();
//     const singleRoomBookings = {}; // To track single-room bookings per date

//     // Step 1: Fetch Bookings
//     const bookings = await Booking.find({
//       $or: [
//         {
//           checkInDate: { $gte: today, $lte: oneYearFromNow },
//           checkOutDate: { $gte: today },
//         },
//         { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
//       ],
//     }).select("checkInDate checkOutDate rooms");

//     // Process bookings
//     bookings.forEach((booking) => {
//       const isPenthouse = booking.rooms.some(
//         (room) => room.roomName === "Panoramic View"
//       );

//       let currentDate = new Date(booking.checkInDate);
//       while (currentDate <= new Date(booking.checkOutDate)) {
//         const dateStr = currentDate.toISOString().split("T")[0];

//         if (isPenthouse) {
//           unavailableDates.add(dateStr); // Block all rooms if penthouse is booked
//         } else {
//           booking.rooms.forEach((room) => {
//             if (room.roomName !== "Panoramic View") {
//               singleRoomBookings[dateStr] =
//                 (singleRoomBookings[dateStr] || 0) + 1;

//               // If all 4 single rooms are booked, block the date
//               if (singleRoomBookings[dateStr] >= 4) {
//                 unavailableDates.add(dateStr);
//               }
//             }
//           });
//         }

//         currentDate.setDate(currentDate.getDate() + 1);
//       }
//     });

//     // Step 2: Fetch Calendar Events
//     const calendarEvents = await Calendar.find({
//       date: { $gte: today, $lte: oneYearFromNow },
//       status: "booked", // Only consider booked events
//     });

//     // Process calendar events
//     calendarEvents.forEach((event) => {
//       const { roomType, date } = event;

//       if (roomType === "penthouse") {
//         // Block date for all rooms if the penthouse is booked
//         unavailableDates.add(date.toISOString().split("T")[0]);
//       } else {
//         // Count single-room bookings from the calendar
//         singleRoomBookings[date.toISOString().split("T")[0]] =
//           (singleRoomBookings[date.toISOString().split("T")[0]] || 0) + 1;

//         // If all 4 single rooms are booked, block the date
//         if (singleRoomBookings[date.toISOString().split("T")[0]] >= 4) {
//           unavailableDates.add(date.toISOString().split("T")[0]);
//         }
//       }
//     });

//     res.status(200).json({ unavailableDates: Array.from(unavailableDates) });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getUnavailableDates = async (req, res) => {
  try {
    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(today.getDate() + 365);

    const unavailableDates = new Set();
    const singleRoomBookings = {}; // To track single-room bookings per date

    // Step 1: Fetch Bookings
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $gte: today, $lte: oneYearFromNow },
          checkOutDate: { $gte: today },
        },
        { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
      ],
    }).select("checkInDate checkOutDate rooms");

    bookings.forEach((booking) => {
      booking.rooms.forEach((room) => {
        const isPenthouse = room.roomName === "Panoramic View";
        let currentDate = new Date(booking.checkInDate);

        while (currentDate <= new Date(booking.checkOutDate)) {
          const dateStr = currentDate.toISOString().split("T")[0];

          if (isPenthouse) {
            // Block all rooms if the penthouse is booked
            unavailableDates.add(dateStr);
          } else {
            // Track single-room bookings if the penthouse is not booked
            singleRoomBookings[dateStr] =
              (singleRoomBookings[dateStr] || 0) + 1;

            // If 4 or more single rooms are booked, mark the date as unavailable
            if (singleRoomBookings[dateStr] >= 4) {
              unavailableDates.add(dateStr);
            }
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    });

    // Step 2: Fetch Calendar Events
    const calendarEvents = await Calendar.find({
      date: { $gte: today, $lte: oneYearFromNow },
      status: "booked", // Only consider booked events
    });

    calendarEvents.forEach((event) => {
      const { roomType, date } = event;
      const dateStr = date.toISOString().split("T")[0];

      if (roomType === "Panoramic View") {
        // Block date for all rooms if the penthouse is booked
        unavailableDates.add(dateStr);
      } else {
        // Count single-room bookings from the calendar
        singleRoomBookings[dateStr] = (singleRoomBookings[dateStr] || 0) + 1;

        // If 4 or more single rooms are booked, mark the date as unavailable
        if (singleRoomBookings[dateStr] >= 4) {
          unavailableDates.add(dateStr);
        }
      }
    });

    // Respond with the unavailable dates
    res.status(200).json({ unavailableDates: Array.from(unavailableDates) });
  } catch (error) {
    console.error("Error fetching unavailable dates:", error.message);
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    // Fetch all bookings sorted by creation date
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    // Process each booking and map relevant data
    const bookingsWithRoomNames = bookings.map((booking) => {
      // Extract all room names from the rooms array
      const roomNames = booking.rooms.map(
        (room) => room.roomName || "Unknown Room"
      );

      // Generate a shortened booking ID
      const bookingId = booking.bookingId.slice(-4);

      // Prepare the booking data
      const bookingData = {
        bookingId,
        firstName: booking.firstName,
        lastName: booking.lastName,
        phoneNumber: booking.phoneNumber,
        totalPayment: booking.totalPayment,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        rooms: roomNames,
        numberOfAdults: booking.numberOfAdults,
        numberOfChildren: booking.numberOfChildren,
        source: booking.source,
      };

      return bookingData;
    });

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

    const booking = bookings[0];

    const rooms = booking.rooms.map((room) => room.roomName || "Unknown Room");
    const roomNames = rooms.join(", ");
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
      roomNames,
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

    // Find bookings by matching the last characters of the bookingId
    const bookings = await Booking.find({
      bookingId: { $regex: bookingId + "$" },
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = bookings[0];

    // Fetch room details for each room in the booking
    const roomDetails = await Promise.all(
      booking.rooms.map(async (room) => {
        const roomData = await Room.findOne({ id: room.roomId });
        return {
          id: roomData?.id || room.roomId, // Fallback to the room ID in booking if not found
          name: roomData?.name || "Unknown Room",
          title: roomData?.title || "No Title Available",
          description: roomData?.description || "No Description Available",
          rating: roomData?.rating || 0,
          price: roomData?.price || room.price, // Use price from booking as fallback
          images: roomData?.images || [],
        };
      })
    );

    res.json(roomDetails);
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
  getUnavailableDatesAdmin,
};
