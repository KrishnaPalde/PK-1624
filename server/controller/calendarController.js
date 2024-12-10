const Calendar = require("../models/Calendar");
const Booking = require("../models/Bookings");
const ical = require("ical");
const { createEvents } = require("ics");
const { v4: uuidv4 } = require("uuid");

const getUnavailableDatesByRoomType = async (req, res) => {
  const { roomType } = req.query;

  if (!roomType) {
    return res.status(400).json({ message: "Room type is required" });
  }

  try {
    const today = new Date();

    // Fetch bookings from the Booking model
    const bookings = await Booking.find({
      "rooms.roomName": roomType,
      checkOutDate: { $gte: today }, // Only future bookings
    }).select("checkInDate checkOutDate source"); // Include source field if available

    // Fetch events from the Calendar model
    const calendarEvents = await Calendar.find({
      roomType,
      date: { $gte: today },
      status: "booked",
    }).select("date source");

    const unavailableDates = [];

    // Process bookings
    bookings.forEach((booking) => {
      let currentDate = new Date(booking.checkInDate);
      const checkOutDate = new Date(booking.checkOutDate);

      while (currentDate <= checkOutDate) {
        unavailableDates.push({
          date: currentDate.toISOString().split("T")[0],
          status: "fullyBooked",
          source: booking.source || "Website", // Default to "Website" if no source is specified
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    // Process calendar events
    calendarEvents.forEach((event) => {
      unavailableDates.push({
        date: event.date.toISOString().split("T")[0],
        status: "fullyBooked",
        source: event.source || "External", // Default to "External" if no source is specified
      });
    });

    // Deduplicate dates
    const uniqueUnavailableDates = unavailableDates.reduce((acc, current) => {
      if (
        !acc.find(
          (date) => date.date === current.date && date.source === current.source
        )
      ) {
        acc.push(current);
      }
      return acc;
    }, []);

    res.status(200).json({ unavailableDates: uniqueUnavailableDates });
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    res.status(500).json({ message: "Failed to fetch unavailable dates" });
  }
};

const syncCalendar = async (req, res) => {
  const { roomType, url } = req.query;

  if (!roomType || !url) {
    return res.status(400).json({ message: "Room type and URL are required." });
  }

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36",
        Accept: "text/calendar, text/plain, */*",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch calendar for ${roomType}:`,
        response.statusText
      );
      return res
        .status(response.status)
        .json({ message: `Failed to fetch calendar: ${response.statusText}` });
    }

    const icsData = await response.text();

    if (!icsData.startsWith("BEGIN:VCALENDAR")) {
      console.error(`Invalid iCal data for ${roomType}:`, icsData);
      return res
        .status(500)
        .json({ message: `Invalid iCal data received for ${roomType}` });
    }

    const parsedData = ical.parseICS(icsData);
    const dates = Object.values(parsedData)
      .filter((event) => event.type === "VEVENT" && event.start && event.end)
      .map((event) => ({
        checkInDate: new Date(event.start),
        checkOutDate: new Date(event.end),
      }));

    console.log("DATES :-\n\n");
    console.log(dates);
    // Exclude the last event
    if (dates.length > 0) {
      dates.pop();
    }

    // Clear existing events for this room type
    await Calendar.deleteMany({ roomType });

    const events = [];

    for (const entry of dates) {
      let currentDate = new Date(entry.checkInDate);
      const endDate = new Date(entry.checkOutDate);

      while (currentDate < endDate) {
        const dateStr = currentDate.toISOString().split("T")[0];

        // Fetch events for this date to avoid duplicates
        const existingEvents = await Calendar.find({
          date: new Date(dateStr),
          roomType,
        }).catch((err) => {
          console.error(`Error fetching events for date ${dateStr}:`, err);
          return []; // Safeguard against errors
        });

        if (existingEvents.length === 0) {
          // Add new event only if no existing events are found
          events.push({
            eventId: `${roomType}_${dateStr}_airbnb`,
            roomType,
            date: new Date(dateStr),
            source: "airbnb",
            status: "booked",
          });
        } else {
          console.warn(`Duplicate event detected for ${dateStr}, skipping.`);
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    if (events.length > 0) {
      await Calendar.insertMany(events, { ordered: false });
      console.log(`Successfully synced calendar for ${roomType}.`);
      res.status(200).json({ message: "Calendar synced successfully." });
    } else {
      console.log(`No new events to sync for ${roomType}.`);
      res.status(200).json({ message: "No new events to sync." });
    }
  } catch (error) {
    console.error("Error syncing calendar:", error);
    res.status(500).json({ message: error.message });
  }
};

// Generate .ics file for rooms

const generateICalFile = async (req, res) => {
  const { roomType } = req.params;

  try {
    // Define sources to filter
    const allowedSources = [
      "Google",
      "website",
      "Instagram",
      "Friends",
      "Competitor Ref",
      "Repeat Guest",
    ];

    // Fetch bookings from Booking model
    const bookings = await Booking.find({
      "rooms.roomName": roomType,
      checkOutDate: { $gte: new Date() }, // Only future bookings
      source: { $in: allowedSources }, // Include bookings from specified sources
    }).select("checkInDate checkOutDate");

    const events = [];

    // Process bookings
    bookings.forEach((booking) => {
      let currentDate = new Date(booking.checkInDate);
      const checkOutDate = new Date(booking.checkOutDate);

      while (currentDate < checkOutDate) {
        events.push({
          dtstamp: new Date().toISOString(),
          dtstart: currentDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
          dtend: new Date(currentDate.setDate(currentDate.getDate() + 1))
            .toISOString()
            .split("T")[0],
          summary: `${roomType} Room Unavailable`,
          uid: uuidv4(), // Generate a unique identifier for the event
        });
      }
    });

    // Build the iCal file
    let icalData = "BEGIN:VCALENDAR\n";
    icalData += "PRODID:-//Tranquil Trails//Hosting Calendar 1.0//EN\n";
    icalData += "CALSCALE:GREGORIAN\n";
    icalData += "VERSION:2.0\n";

    events.forEach((event) => {
      icalData += "BEGIN:VEVENT\n";
      icalData += `DTSTAMP:${
        event.dtstamp.replace(/[-:]/g, "").split(".")[0]
      }Z\n`;
      icalData += `DTSTART;VALUE=DATE:${event.dtstart.replace(/-/g, "")}\n`;
      icalData += `DTEND;VALUE=DATE:${event.dtend.replace(/-/g, "")}\n`;
      icalData += `SUMMARY:${event.summary}\n`;
      icalData += `UID:${event.uid}\n`;
      icalData += "END:VEVENT\n";
    });

    icalData += "END:VCALENDAR";

    // Send the response
    res.setHeader("Content-Type", "text/calendar");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${roomType}.ics"`
    );
    res.send(icalData);
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    res.status(500).json({ message: "Failed to fetch calendar data" });
  }
};

// Clear old events
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
  syncCalendar,
  getUnavailableDatesByRoomType,
  generateICalFile,
  clearOldEvents,
};
