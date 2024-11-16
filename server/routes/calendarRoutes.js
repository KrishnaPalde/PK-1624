const express = require("express");
const router = express.Router();
const {
  addCalendarEvent,
  syncExternalCalendar,
  clearOldEvents,
} = require("../controller/calendarController");
const { createEvents } = require("ics");
const Calendar = require("../models/Calendar");

router.post("/add-event", addCalendarEvent);
router.get("/sync_calendar", syncExternalCalendar);
router.delete("/clear_old_events", clearOldEvents);

router.get("/calendar/:roomType.ics", async (req, res) => {
  const { roomType } = req.params;

  try {
    // Fetch booked dates from the Calendar model
    const bookings = await Calendar.find({ roomType, status: "booked" }).select(
      "date -_id"
    );

    // Convert dates to iCal events
    const events = bookings.map((booking) => ({
      start: [
        booking.date.getFullYear(),
        booking.date.getMonth() + 1,
        booking.date.getDate(),
      ],
      title: `${roomType} Room Unavailable`,
    }));

    // Generate the .ics file
    createEvents(events, (error, value) => {
      if (error) {
        console.error("Error generating iCal:", error);
        return res.status(500).json({ message: "Error generating calendar" });
      }

      res.setHeader("Content-Type", "text/calendar");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${roomType}.ics"`
      );
      res.send(value);
    });
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    res.status(500).json({ message: "Failed to fetch calendar data" });
  }
});

module.exports = router;
