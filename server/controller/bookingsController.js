const Booking = require("../models/Bookings");
const Calendar = require("../models/Calendar");
const Room = require("../models/Room");
const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf"); // Import html-pdf
const { v4: uuidv4 } = require("uuid");
const GlobalSetting = require("../models/GlobalSetting");

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
      city: room.city,
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

const getCitiesByRoom = async (req, res) => {
  try {
    const rooms = await Room.find({}, "city"); // fetch only city field
    const citySet = new Set();

    rooms.forEach((room) => {
      if (room.city) {
        citySet.add(capitalize(room.city.trim()));
      }
    });

    const uniqueCities = Array.from(citySet).sort(); // optional sorting
    res.status(200).json(uniqueCities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getAllRooms = async (req, res) => {
  try {
    const { checkinDate, checkoutDate, city } = req.query;
    console.log(city);
    if (!checkinDate || !checkoutDate || !city)
      return res.status(400).json({ message: "Missing required parameters" });

    const parsedCheckIn = new Date(checkinDate);
    const parsedCheckOut = new Date(checkoutDate);
    if (isNaN(parsedCheckIn) || isNaN(parsedCheckOut))
      return res
        .status(400)
        .json({ message: "Invalid check-in/check-out dates" });

    const allRooms = await Room.find({ city: city.trim().toLowerCase() });

    // STEP 1: Build maps and helpers
    const roomMap = new Map();
    const roomNameMap = new Map();
    const propertyRoomCount = {}; // propertyId -> total child rooms

    allRooms.forEach((room) => {
      const id = room._id.toString();
      roomMap.set(id, room);
      roomNameMap.set(room.name, room);
      if (!room.isProperty && room.propertyRef) {
        const propId = room.propertyRef.toString();
        propertyRoomCount[propId] = (propertyRoomCount[propId] || 0) + 1;
      }
    });

    const dateRange = [];
    let curr = new Date(parsedCheckIn);
    while (curr <= parsedCheckOut) {
      dateRange.push(curr.toISOString().split("T")[0]);
      curr.setDate(curr.getDate() + 1);
    }

    // STEP 2: Get bookings overlapping the range
    const bookings = await Booking.find({
      "rooms.roomId": { $in: [...roomMap.keys()] },
      $or: [
        {
          checkInDate: { $lte: parsedCheckOut },
          checkOutDate: { $gte: parsedCheckIn },
        },
      ],
    }).select("rooms checkInDate checkOutDate");

    const calendarEvents = await Calendar.find({
      date: { $gte: parsedCheckIn, $lte: parsedCheckOut },
      status: "booked",
    }).select("roomType date");

    const blockedProps = new Set();
    const blockedRoomNames = new Set();

    // STEP 3: Process Booking data
    bookings.forEach((booking) => {
      const roomCounts = {}; // temp for per-day counts per property

      const overlapDates = [];
      let dt = new Date(booking.checkInDate);
      while (dt <= booking.checkOutDate) {
        const dateStr = dt.toISOString().split("T")[0];
        if (dateRange.includes(dateStr)) overlapDates.push(dateStr);
        dt.setDate(dt.getDate() + 1);
      }

      booking.rooms.forEach((r) => {
        const meta = roomMap.get(r.roomId);
        if (!meta) return;

        overlapDates.forEach(() => {
          if (meta.isProperty) {
            blockedProps.add(meta._id.toString());
          } else if (meta.propertyRef) {
            const propId = meta.propertyRef.toString();
            roomCounts[propId] = (roomCounts[propId] || 0) + 1;
            if (roomCounts[propId] >= propertyRoomCount[propId]) {
              blockedProps.add(propId);
            }
          } else {
            blockedRoomNames.add(meta.name);
          }
        });
      });
    });

    // STEP 4: Process Calendar data
    calendarEvents.forEach((event) => {
      const meta = roomNameMap.get(event.roomType);
      if (!meta) return;

      if (meta.isProperty) {
        blockedProps.add(meta._id.toString());
      } else if (meta.propertyRef) {
        const propId = meta.propertyRef.toString();
        blockedProps.add(propId);
      } else {
        blockedRoomNames.add(meta.name);
      }
    });

    // STEP 5: Final filter
    const availableRooms = allRooms.filter((room) => {
      const id = room._id.toString();

      if (room.isProperty) return !blockedProps.has(id);

      if (room.propertyRef && blockedProps.has(room.propertyRef.toString()))
        return false;

      if (!room.propertyRef && blockedRoomNames.has(room.name)) return false;

      return true;
    });

    res.status(200).json(availableRooms);
  } catch (err) {
    console.error("Error fetching rooms:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProperties = async (req, res) => {
  try {
    // Find rooms that are marked as full property packages
    const properties = await Room.find({ isProperty: true }).select("_id name");

    // Format: [{ id, name }]
    const result = properties.map((property) => ({
      id: property._id,
      name: property.name,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching properties:", error.message);
    res.status(500).json({ message: "Failed to fetch properties" });
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

// const getUnavailableDatesAdmin = async (req, res) => {
//   try {
//     const today = new Date();
//     const oneYearFromNow = new Date();
//     oneYearFromNow.setDate(today.getDate() + 365);

//     const unavailableDates = {}; // Tracks dates and their statuses

//     // Helper function to process a date
//     const processDate = (dateStr, roomName) => {
//       const isPenthouse = roomName === "Panoramic View";

//       if (!unavailableDates[dateStr]) {
//         unavailableDates[dateStr] = {
//           singleCount: 0,
//           penthouse: false,
//           status: "available",
//         };
//       }

//       if (isPenthouse) {
//         // If penthouse is booked, mark the date as fully booked
//         unavailableDates[dateStr] = {
//           singleCount: 0,
//           penthouse: true,
//           status: "fullyBooked",
//         };
//       } else {
//         // Increment single room count only if the penthouse is not booked
//         if (!unavailableDates[dateStr].penthouse) {
//           unavailableDates[dateStr].singleCount += 1;

//           // Update status based on single room bookings
//           if (unavailableDates[dateStr].singleCount >= 4) {
//             unavailableDates[dateStr].status = "fullyBooked";
//           } else {
//             unavailableDates[dateStr].status = "partiallyBooked";
//           }
//         }
//       }
//     };

//     // Step 1: Process Bookings
//     const bookings = await Booking.find({
//       $or: [
//         {
//           checkInDate: { $gte: today, $lte: oneYearFromNow },
//           checkOutDate: { $gte: today },
//         },
//         { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
//       ],
//     }).select("checkInDate checkOutDate rooms");

//     bookings.forEach((booking) => {
//       booking.rooms.forEach((room) => {
//         let currentDate = new Date(booking.checkInDate);
//         while (currentDate <= new Date(booking.checkOutDate)) {
//           const dateStr = currentDate.toISOString().split("T")[0];
//           processDate(dateStr, room.roomName);
//           currentDate.setDate(currentDate.getDate() + 1);
//         }
//       });
//     });

//     // Step 2: Process Calendar Events
//     const calendarEvents = await Calendar.find({
//       date: { $gte: today, $lte: oneYearFromNow },
//       status: "booked",
//     });

//     calendarEvents.forEach((event) => {
//       const dateStr = event.date.toISOString().split("T")[0];
//       processDate(dateStr, event.roomType); // Assuming `roomType` maps to room names
//     });

//     // Step 3: Format the response
//     const formattedUnavailableDates = Object.entries(unavailableDates).map(
//       ([date, { status }]) => ({ date, status })
//     );

//     res.status(200).json({ unavailableDates: formattedUnavailableDates });
//   } catch (error) {
//     console.error("Error fetching unavailable dates:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
const getUnavailableDatesAdmin = async (req, res) => {
  try {
    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setDate(today.getDate() + 365);

    const allRooms = await Room.find().select(
      "_id name isProperty propertyRef"
    );
    const roomIdToMeta = new Map();
    const nameToRoomMeta = new Map();
    const properties = new Map();

    allRooms.forEach((room) => {
      const roomId = room._id.toString();
      const propertyId = room.isProperty
        ? roomId
        : room.propertyRef?.toString();
      if (!propertyId) return;

      roomIdToMeta.set(roomId, room);
      nameToRoomMeta.set(room.name, room);

      if (!properties.has(propertyId)) {
        properties.set(propertyId, {
          totalRooms: 0,
          bookedCountByDate: {},
          isParentBooked: new Set(),
        });
      }

      const property = properties.get(propertyId);
      property.totalRooms += 1;
    });

    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $gte: today, $lte: oneYearFromNow },
          checkOutDate: { $gte: today },
        },
        { checkOutDate: { $gte: today, $lte: oneYearFromNow } },
      ],
    }).select("checkInDate checkOutDate rooms");

    const getDateRange = (start, end) => {
      const dates = [];
      const cur = new Date(start);
      while (cur <= end) {
        dates.push(cur.toISOString().split("T")[0]);
        cur.setDate(cur.getDate() + 1);
      }
      return dates;
    };

    for (const booking of bookings) {
      const dates = getDateRange(booking.checkInDate, booking.checkOutDate);

      for (const roomEntry of booking.rooms) {
        const room = roomIdToMeta.get(roomEntry.roomId);
        if (!room) continue;

        const propertyId = room.isProperty
          ? room._id.toString()
          : room.propertyRef?.toString();
        if (!propertyId || !properties.has(propertyId)) continue;

        const property = properties.get(propertyId);

        for (const dateStr of dates) {
          if (room.isProperty) {
            property.isParentBooked.add(dateStr);
          } else {
            property.bookedCountByDate[dateStr] =
              (property.bookedCountByDate[dateStr] || 0) + 1;
          }
        }
      }
    }

    const calendarEvents = await Calendar.find({
      date: { $gte: today, $lte: oneYearFromNow },
      status: "booked",
    });

    for (const event of calendarEvents) {
      const room = nameToRoomMeta.get(event.roomType);
      if (!room) continue;

      const propertyId = room.isProperty
        ? room._id.toString()
        : room.propertyRef?.toString();
      if (!propertyId || !properties.has(propertyId)) continue;

      const property = properties.get(propertyId);
      const dateStr = event.date.toISOString().split("T")[0];

      if (room.isProperty) {
        property.isParentBooked.add(dateStr);
      } else {
        property.bookedCountByDate[dateStr] =
          (property.bookedCountByDate[dateStr] || 0) + 1;
      }
    }

    const formatted = [];

    for (const [propertyId, prop] of properties.entries()) {
      const allDates = new Set([
        ...Object.keys(prop.bookedCountByDate),
        ...Array.from(prop.isParentBooked),
      ]);

      for (const dateStr of allDates) {
        const isParentBooked = prop.isParentBooked.has(dateStr);
        const childBookings = prop.bookedCountByDate[dateStr] || 0;

        const status = isParentBooked
          ? "fullyBooked"
          : childBookings >= prop.totalRooms
          ? "fullyBooked"
          : childBookings > 0
          ? "partiallyBooked"
          : "available";

        formatted.push({ date: dateStr, propertyId, status });
      }
    }

    res.status(200).json({ unavailableDates: formatted });
  } catch (error) {
    console.error("Error fetching unavailable dates:", error.message);
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

//     bookings.forEach((booking) => {
//       booking.rooms.forEach((room) => {
//         const isPenthouse = room.roomName === "Panoramic View";
//         let currentDate = new Date(booking.checkInDate);

//         while (currentDate <= new Date(booking.checkOutDate)) {
//           const dateStr = currentDate.toISOString().split("T")[0];

//           if (isPenthouse) {
//             // Block all rooms if the penthouse is booked
//             unavailableDates.add(dateStr);
//           } else {
//             // Track single-room bookings if the penthouse is not booked
//             singleRoomBookings[dateStr] =
//               (singleRoomBookings[dateStr] || 0) + 1;

//             // If 4 or more single rooms are booked, mark the date as unavailable
//             if (singleRoomBookings[dateStr] >= 4) {
//               unavailableDates.add(dateStr);
//             }
//           }

//           currentDate.setDate(currentDate.getDate() + 1);
//         }
//       });
//     });

//     // Step 2: Fetch Calendar Events
//     const calendarEvents = await Calendar.find({
//       date: { $gte: today, $lte: oneYearFromNow },
//       status: "booked", // Only consider booked events
//     });

//     calendarEvents.forEach((event) => {
//       const { roomType, date } = event;
//       const dateStr = date.toISOString().split("T")[0];

//       if (roomType === "Panoramic View") {
//         // Block date for all rooms if the penthouse is booked
//         unavailableDates.add(dateStr);
//       } else {
//         // Count single-room bookings from the calendar
//         singleRoomBookings[dateStr] = (singleRoomBookings[dateStr] || 0) + 1;

//         // If 4 or more single rooms are booked, mark the date as unavailable
//         if (singleRoomBookings[dateStr] >= 4) {
//           unavailableDates.add(dateStr);
//         }
//       }
//     });

//     // Respond with the unavailable dates
//     res.status(200).json({ unavailableDates: Array.from(unavailableDates) });
//   } catch (error) {
//     console.error("Error fetching unavailable dates:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

const getUnavailableDates = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: "City is required" });

    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(today.getFullYear() + 1);

    const unavailableDates = new Set();

    // Step 1: Fetch rooms in the city
    const rooms = await Room.find({ city: city.toLowerCase().trim() }).select(
      "_id isProperty propertyRef name"
    );

    const properties = new Map(); // propertyId => { totalRooms, bookedCountByDate }

    rooms.forEach((room) => {
      const roomId = room._id.toString();
      const propertyId = room.isProperty
        ? roomId
        : room.propertyRef?.toString();
      if (!propertyId) return;

      if (!properties.has(propertyId)) {
        properties.set(propertyId, {
          totalRooms: 0,
          bookedCountByDate: {},
          isParentBooked: new Set(), // Tracks dates parent property itself is booked
        });
      }

      const property = properties.get(propertyId);
      property.totalRooms += 1;
    });

    const roomIds = rooms.map((r) => r._id.toString());

    // Helper: get all dates in range
    const getDateRange = (start, end) => {
      const dates = [];
      const cur = new Date(start);
      while (cur <= end) {
        dates.push(cur.toISOString().split("T")[0]);
        cur.setDate(cur.getDate() + 1);
      }
      return dates;
    };

    // Step 2: Bookings
    const bookings = await Booking.find({
      "rooms.roomId": { $in: roomIds },
      checkInDate: { $lte: oneYearFromNow },
      checkOutDate: { $gte: today },
    });

    for (const booking of bookings) {
      const dates = getDateRange(booking.checkInDate, booking.checkOutDate);

      for (const roomEntry of booking.rooms) {
        const room = rooms.find((r) => r._id.toString() === roomEntry.roomId);
        if (!room) continue;

        const propertyId = room.isProperty
          ? room._id.toString()
          : room.propertyRef?.toString();
        if (!propertyId || !properties.has(propertyId)) continue;

        const property = properties.get(propertyId);

        for (const dateStr of dates) {
          if (room.isProperty) {
            property.isParentBooked.add(dateStr);
          } else {
            property.bookedCountByDate[dateStr] =
              (property.bookedCountByDate[dateStr] || 0) + 1;
          }
        }
      }
    }

    // Step 3: Calendar Events
    const calendarEvents = await Calendar.find({
      date: { $gte: today, $lte: oneYearFromNow },
      status: "booked",
    });

    for (const event of calendarEvents) {
      const room = rooms.find((r) => r.name === event.roomType);
      if (!room) continue;

      const propertyId = room.isProperty
        ? room._id.toString()
        : room.propertyRef?.toString();
      if (!propertyId || !properties.has(propertyId)) continue;

      const property = properties.get(propertyId);
      const dateStr = event.date.toISOString().split("T")[0];

      if (room.isProperty) {
        property.isParentBooked.add(dateStr);
      } else {
        property.bookedCountByDate[dateStr] =
          (property.bookedCountByDate[dateStr] || 0) + 1;
      }
    }

    // Step 4: Final date evaluation
    const dateAvailabilityMap = {}; // dateStr => count of available properties

    for (const [propertyId, prop] of properties.entries()) {
      const allDates = new Set([
        ...Object.keys(prop.bookedCountByDate),
        ...Array.from(prop.isParentBooked),
      ]);

      for (const dateStr of allDates) {
        const isParentBooked = prop.isParentBooked.has(dateStr);
        const childBookings = prop.bookedCountByDate[dateStr] || 0;

        const isFullyBooked =
          isParentBooked || childBookings >= prop.totalRooms;

        if (!isFullyBooked) {
          dateAvailabilityMap[dateStr] =
            (dateAvailabilityMap[dateStr] || 0) + 1;
        }
      }
    }

    // Step 5: Mark unavailable dates (all properties are fully booked)
    // Final Step: Unavailable Dates - A date is unavailable if ALL properties are booked on that date
    // const unavailableDates = new Set();
    const allDates = new Set();

    for (const [, prop] of properties) {
      Object.keys(prop.bookedCountByDate).forEach((d) => allDates.add(d));
      prop.isParentBooked.forEach((d) => allDates.add(d));
    }

    for (const dateStr of allDates) {
      let fullyBookedProps = 0;

      for (const [propId, prop] of properties) {
        const isParentBooked = prop.isParentBooked.has(dateStr);
        const childBookedCount = prop.bookedCountByDate[dateStr] || 0;

        const isFullyBooked =
          isParentBooked || childBookedCount >= prop.totalRooms;

        if (isFullyBooked) {
          fullyBookedProps++;
        }
      }

      if (fullyBookedProps === properties.size) {
        unavailableDates.add(dateStr);
      }
    }

    console.log("Unavailable Dates:", unavailableDates);

    return res.status(200).json({
      unavailableDates: Array.from(unavailableDates).sort(),
    });
  } catch (error) {
    console.error("Error fetching unavailable dates:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const fetchBookingsAdmin = async (req, res) => {
  try {
    const { recent, limit, timeframe } = req.query;

    let query = Booking.find();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we compare only the date part

    // Filter bookings based on check-in dates
    query = query.where("checkInDate").gte(today);

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

const getReportingStats = async (req, res) => {
  try {
    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Revenue generated
    const revenueData = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPayment" }, // Assuming totalPayment holds the payment amount for bookings
        },
      },
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Total rooms
    const totalRooms = await Room.countDocuments(); // Assuming Room collection holds all rooms

    // Get the earliest and latest booking dates
    const bookingDates = await Booking.aggregate([
      {
        $group: {
          _id: null,
          earliestBooking: { $min: "$checkInDate" },
          latestBooking: { $max: "$checkOutDate" },
        },
      },
    ]);
    const earliestBooking = bookingDates[0]?.earliestBooking || new Date();
    const latestBooking = bookingDates[0]?.latestBooking || new Date();

    // Total days covered by the bookings
    const totalDays = Math.ceil(
      (new Date(latestBooking) - new Date(earliestBooking)) /
        (1000 * 60 * 60 * 24)
    );

    // Total room nights available
    const totalRoomNightsAvailable = totalRooms * totalDays;

    // Total room nights sold
    const roomNightsData = await Booking.aggregate([
      {
        $project: {
          _id: 0,
          nights: {
            $divide: [
              { $subtract: ["$checkOutDate", "$checkInDate"] },
              1000 * 60 * 60 * 24, // Convert milliseconds to days
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalNights: { $sum: "$nights" },
        },
      },
    ]);
    const totalRoomNightsSold = roomNightsData[0]?.totalNights || 0;

    // Calculate occupancy rate
    const occupancyRate = totalRoomNightsAvailable
      ? ((totalRoomNightsSold / totalRoomNightsAvailable) * 100).toFixed(2)
      : 0;

    // Calculate average room rate (ARR)
    const averageRoomRate = totalRoomNightsSold
      ? (totalRevenue / totalRoomNightsSold).toFixed(2)
      : 0;

    // Send response with all stats
    res.status(200).json({
      totalBookings,
      revenueGenerated: totalRevenue,
      occupancyRate: occupancyRate,
      averageRoomRate: `₹${averageRoomRate}`,
    });
  } catch (error) {
    console.error("Error fetching reporting stats:", error.message);
    res.status(500).json({ message: "Failed to fetch reporting stats." });
  }
};

const getBookings = async (req, res) => {
  try {
    // Extract filters from query parameters
    const { startDate, endDate, preset, limit } = req.query;

    let filterCriteria = {};
    if (preset) {
      const now = new Date();
      switch (preset) {
        case "1_month":
          filterCriteria.checkInDate = {
            $gte: new Date(now.setMonth(now.getMonth() - 1)),
          };
          break;
        case "3_months":
          filterCriteria.checkInDate = {
            $gte: new Date(now.setMonth(now.getMonth() - 3)),
          };
          break;
        case "6_months":
          filterCriteria.checkInDate = {
            $gte: new Date(now.setMonth(now.getMonth() - 6)),
          };
          break;
        default:
          break;
      }
    } else if (startDate && endDate) {
      filterCriteria.checkInDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch filtered bookings or all if no filter applied
    let bookingsQuery = Booking.find(filterCriteria).sort({ createdAt: -1 });

    // Apply limit if specified
    if (limit) {
      bookingsQuery = bookingsQuery.limit(parseInt(limit, 10));
    }

    const bookings = await bookingsQuery.exec();

    // Process each booking and map all relevant data
    const bookingsWithDetails = bookings.map((booking) => {
      // Extract room names
      const roomNames = booking.rooms.map(
        (room) => room.roomName || "Unknown Room"
      );

      return {
        bookingId: booking.bookingId,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email || "N/A",
        phoneNumber: booking.phoneNumber,
        idDocument: booking.idDocument || "N/A",
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        rooms: roomNames,
        numberOfAdults: booking.numberOfAdults || 0,
        numberOfChildren: booking.numberOfChildren || 0,
        numberOfInfants: booking.numberOfInfants || 0,
        totalPayment: booking.totalPayment || 0,
        paymentStatus: booking.paymentStatus || "N/A",
        paymentBreakdown: booking.paymentBreakdown || [],
        source: booking.source || "N/A",
        bookingPurpose: booking.bookingPurpose || "N/A",
        bookingStatus: booking.bookingStatus || "N/A",
        feedbackLink: booking.feedbackLink || false,
        transactions: booking.transactions || [],
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      };
    });

    res.json(bookingsWithDetails);
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
          city: roomData?.city || "",
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

const addRoom = async (req, res) => {
  try {
    const {
      name,
      city,
      title,
      description,
      price,
      weekend,
      images,
      rating,
      isProperty,
      propertyRef,
      amenities,
      freebies,
    } = req.body;

    const newRoom = new Room({
      id: Date.now().toString(),
      name,
      city: city.toLowerCase().trim(),
      title,
      description,
      price,
      weekend,
      images,
      rating,
      isProperty,
      propertyRef: isProperty ? null : propertyRef, // null if it's a standalone property
      amenities,
      freebies,
    });

    const savedRoom = await newRoom.save();

    const globalSetting = await GlobalSetting.findOne();
    if (globalSetting) {
      globalSetting.calendarLinks.push({
        roomType: name,
        sources: [],
      });
      await globalSetting.save();
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    console.error("Error adding room:", error);
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

const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { name, title, description, price, weekend, rating } = req.body;

  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { id },
      { name, title, description, price, weekend, rating },
      { new: true }
    );

    if (!updatedRoom)
      return res.status(404).json({ message: "Room not found" });

    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: "Failed to update room", error });
  }
};

const createCustomBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      idDocument,
      checkInDate,
      checkOutDate,
      guestCount,
      selectedRooms,
      bookingPurpose,
      bookingStatus,
      bookingSource,
      paymentMethods,
      paymentAmounts,
      totalAmount,
      discountPercentage,
      discountAmount,
      commissionPercentage,
      commissionAmount,
      netPayable,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !checkInDate ||
      !checkOutDate ||
      !guestCount ||
      !selectedRooms.length ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Generate a unique booking ID
    const bookingId = `CBK-${uuidv4()}`;

    // Calculate adults and children
    const numberOfAdults = guestCount;
    const numberOfChildren = 0;
    const numberOfInfants = 0;

    // Build the payment breakdown
    const paymentBreakdown = Object.entries(paymentAmounts).map(
      ([method, amount]) => ({
        description: `${
          method.charAt(0).toUpperCase() + method.slice(1)
        } Payment`,
        amount,
      })
    );

    paymentBreakdown.push({
      description: "Discount",
      amount: discountAmount || 0,
    });

    paymentBreakdown.push({
      description: "Commission",
      amount: commissionAmount || 0,
    });

    // Map selected rooms
    const rooms = selectedRooms.map((room) => ({
      roomId: room.id,
      roomName: room.name,
      price: room.price,
    }));

    // Create a new booking object
    const newBooking = new Booking({
      bookingId,
      firstName,
      lastName,
      email: email || null,
      phoneNumber: phoneNumber || null,
      idDocument: idDocument || null,
      rooms,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      totalPayment: totalAmount,
      paymentBreakdown,
      numberOfAdults,
      numberOfChildren,
      numberOfInfants,
      paymentStatus: paymentMethods.includes("cash") ? "pending" : "completed",
      transactions: [], // Populate if needed
      source: bookingSource || "website",
      bookingPurpose: bookingPurpose || "Other",
      bookingStatus: bookingStatus || "Confirmed",
      isCustom: true,
    });

    // Save the booking to the database
    await newBooking.save();

    return res.status(201).json({
      message: "Custom booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating custom booking:", error);
    return res.status(500).json({ message: "Internal Server Error" });
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
  createCustomBooking,
  getReportingStats,
  getCitiesByRoom,
  getAllProperties,
  updateRoom,
};
