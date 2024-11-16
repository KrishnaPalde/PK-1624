const Calendar = require("../models/Calendar");
const Booking = require("../models/Bookings");
const ical = require("ical");
// const fetch = require("node-fetch");

// const addCalendarEvent = async (req, res) => {
//   const { dates, roomType, source } = req.body;

//   if (!dates || !roomType) {
//     return res
//       .status(400)
//       .json({ message: "Dates and room type are required." });
//   }

//   try {
//     const events = dates.map((date) => ({
//       eventId: `${roomType}_${date}_${source}`, // Unique event ID
//       roomType,
//       date: new Date(date),
//       source,
//       status: "booked",
//     }));

//     await Calendar.insertMany(events, { ordered: false }).catch((err) => {
//       if (err.code !== 11000) throw err; // Ignore duplicate errors
//     });

//     res.status(200).json({ message: "Events added successfully." });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const addCalendarEvent = async (req, res) => {
  const { dates, roomType, source, roomCount } = req.body; // roomCount is optional, default to 1

  if (!dates || !roomType) {
    return res
      .status(400)
      .json({ message: "Dates and room type are required." });
  }

  try {
    // Fetch existing events for the specified roomType and dates
    const existingEvents = await Calendar.find({
      date: { $in: dates.map((date) => new Date(date)) },
      roomType,
      status: "booked",
    });

    // Count existing single room bookings per date
    const dateRoomCounts = {};
    existingEvents.forEach((event) => {
      const dateStr = event.date.toISOString().split("T")[0];
      dateRoomCounts[dateStr] = (dateRoomCounts[dateStr] || 0) + 1;
    });

    // Prepare events to add
    const events = [];
    dates.forEach((date) => {
      const dateStr = new Date(date).toISOString().split("T")[0];

      if (roomType === "single") {
        const currentRoomCount = dateRoomCounts[dateStr] || 0;

        // If all 4 single rooms are booked, block the entire date for single room bookings
        if (currentRoomCount + roomCount > 4) {
          throw new Error(`All single rooms are fully booked on ${dateStr}.`);
        }

        // Add events for each single room being booked
        for (let i = 0; i < roomCount; i++) {
          events.push({
            eventId: `${roomType}_${date}_${source}_${
              currentRoomCount + i + 1
            }`,
            roomType,
            date: new Date(date),
            source,
            status: "booked",
          });
        }

        dateRoomCounts[dateStr] = currentRoomCount + roomCount;
      } else if (roomType === "penthouse") {
        // Block the date for penthouse booking
        if (dateRoomCounts[dateStr]) {
          throw new Error(
            `Penthouse cannot be booked as single rooms are booked on ${dateStr}.`
          );
        }

        events.push({
          eventId: `${roomType}_${date}_${source}`,
          roomType,
          date: new Date(date),
          source,
          status: "booked",
        });

        // Mark the date as fully booked
        dateRoomCounts[dateStr] = 4; // Treat as fully booked
      }
    });

    // Insert events into the database
    await Calendar.insertMany(events, { ordered: false }).catch((err) => {
      if (err.code !== 11000) throw err; // Ignore duplicate errors
    });

    res.status(200).json({ message: "Events added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const syncExternalCalendar = async (req, res) => {
  const { url, roomType, source } = req.query;

  if (!url || !roomType) {
    return res.status(400).json({ message: "URL and room type are required." });
  }

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url);
    const icsData = await response.text();
    const parsedData = ical.parseICS(icsData);

    const dates = Object.values(parsedData)
      .filter((event) => event.type === "VEVENT")
      .map((event) => ({
        checkInDate: new Date(event.start),
        checkOutDate: new Date(event.end),
      }));

    const bookings = [];
    const events = [];

    dates.forEach((entry) => {
      // Prepare Calendar events
      let currentDate = new Date(entry.checkInDate);
      while (currentDate <= entry.checkOutDate) {
        const dateStr = currentDate.toISOString().split("T")[0];
        events.push({
          eventId: `${roomType}_${dateStr}_${source}`,
          roomType,
          date: new Date(dateStr),
          source,
          status: "booked",
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Prepare Booking model entries
      bookings.push({
        bookingId: `${roomType}_${entry.checkInDate.getTime()}_${source}`,
        firstName: "External", // Dummy data for external bookings
        lastName: "Booking",
        email: "external@booking.com",
        phoneNumber: "0000000000",
        idDocument: "N/A",
        rooms: [
          {
            roomId: `${roomType}_${entry.checkInDate.getTime()}`,
            roomName:
              roomType === "single" ? "Single Bedroom" : "Panoramic View",
            price: 0, // Price is unavailable from external sources
          },
        ],
        checkInDate: entry.checkInDate,
        checkOutDate: entry.checkOutDate,
        paymentStatus: "completed", // Assume external bookings are confirmed
        totalPayment: 0, // External systems may not provide payment details
        paymentBreakdown: [],
        numberOfAdults: 0, // No data available for adults/children
        numberOfChildren: 0,
        numberOfInfants: 0,
        source: source || "external",
      });
    });

    // Insert into Calendar model
    await Calendar.insertMany(events, { ordered: false }).catch((err) => {
      if (err.code !== 11000) throw err;
    });

    // Insert into Booking model
    await Booking.insertMany(bookings, { ordered: false }).catch((err) => {
      if (err.code !== 11000) throw err;
    });

    res
      .status(200)
      .json({ message: "Calendar and bookings synced successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearOldEvents = async (req, res) => {
  try {
    const today = new Date();
    await Calendar.deleteMany({ date: { $lt: today } });
    res.status(200).json({ message: "Old events cleared successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  clearOldEvents,
  syncExternalCalendar,
  addCalendarEvent,
};
