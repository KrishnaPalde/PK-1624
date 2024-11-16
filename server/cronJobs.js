const cron = require("node-cron");
const { clearOldEvents } = require("./controller/calendarController");
const Calendar = require("./models/Calendar");
const Booking = require("./models/Bookings");
const ical = require("ical");

const syncExternalCalendar = async (req) => {
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

    // res
    //   .status(200)
    //   .json({ message: "Calendar and bookings synced successfully." });
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
};

// Sync external calendars every hour
cron.schedule("0 * * * *", () => {
  console.log("Syncing external calendar...");
  syncExternalCalendar({
    query: {
      url: "https://example.com/airbnb.ics",
      roomType: "single",
      source: "airbnb",
    },
  });
});

cron.schedule("0 0 * * 0", () => {
  console.log("Clearing old events...");
  clearOldEvents();
});

module.exports = cron;
