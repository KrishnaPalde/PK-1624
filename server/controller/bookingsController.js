const Booking = require("../models/Bookings");
const Room = require("../models/Room");
const fs = require("fs");
const path = require("path");
const pdf = require('html-pdf'); // Import html-pdf


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
    // Find room by custom id
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({
      id: room.id, // Return custom ID
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

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).select("-reviews");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUnavailableDates = async (req, res) => {
  try {
    // Fetch all bookings for the next 30 days
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const bookings = await Booking.find({
      checkInDate: { $gte: today, $lte: thirtyDaysFromNow },
    }).select("checkInDate checkOutDate");

    const unavailableDates = [];

    bookings.forEach((booking) => {
      let currentDate = new Date(booking.checkInDate);
      while (currentDate <= new Date(booking.checkOutDate)) {
        unavailableDates.push(
          new Date(currentDate).toISOString().split("T")[0]
        ); // Store the date in YYYY-MM-DD format
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    res.status(200).json({ unavailableDates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchBookingsAdmin = async (req, res) => {
  try {
    const { recent, limit } = req.query;

    // Fetch all bookings by default
    let query = Booking.find();

    // If 'recent' parameter is provided and true, fetch the most recently added bookings
    if (recent === "true") {
      query = query.sort({ _id: -1 }).limit(parseInt(limit) || 5); // Default limit is 5 if not specified
    }

    // Execute the query
    const bookings = await query.exec();

    // Return the fetched bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const bookings = await Booking.find({});

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
          roomId: booking.roomId  
        };

        return bookingData;
      })
    );

    res.json(bookingsWithRoomNames);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log('Received bookingId:', bookingId);

    const bookings = await Booking.find({
      bookingId: { $regex: bookingId + '$' }
    });

    console.log('Matching bookings found:', bookings.length);

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (bookings.length > 1) {
      console.warn('Multiple bookings found with the same last 4 characters');
    }

    const booking = bookings[0];

    const room = await Room.findOne({ id: booking.roomId });
    const roomName = room ? room.name : "Unknown Room";
    const transactionId = booking.transactions.length > 0 ? booking.transactions[0].transactionId : "No Transaction ID";

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
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRoomDetailsForm = async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log('Received bookingId:', bookingId);

    const bookings = await Booking.find({
      bookingId: { $regex: bookingId + '$' }
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = bookings[0];

    const room = await Room.findOne({ id: booking.roomId });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const roomData = {
      id: room.id,
      name: room.name,
      title: room.title,
      description: room.description,
      rating: room.rating,
      price: room.price,
      images: room.images
    };

    res.json(roomData);
  } catch (error) {
    console.error('Error fetching room details for booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addRoom = async (req, res) => {
  try {
    const { name, title, description, price } = req.body;
    const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
    const freebies = req.body.freebies ? JSON.parse(req.body.freebies) : [];
    const images = req.files ? req.files.map(file => file.path) : [];

    const newRoom = new Room({
      id: Date.now().toString(),
      name,
      title,
      description,
      price,
      amenities,
      freebies,
      images,
    });

    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRoomStatuses = async (req, res) => {
  try {
    const rooms = await Room.find({});
    const currentDate = new Date();

    for (let room of rooms) {
      const activeBooking = await Booking.findOne({
        roomId: room.id,
        checkInDate: { $lte: currentDate },
        checkOutDate: { $gt: currentDate }
      });

      room.status = activeBooking ? 'Booked' : 'Available';
      await room.save();
    }

    res.status(200).json({ message: 'Room statuses updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room statuses', error: error.message });
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
  getAllRooms,
  updateRoomStatuses,
};
