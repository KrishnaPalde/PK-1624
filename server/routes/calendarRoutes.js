const express = require("express");
const router = express.Router();
const {
  syncCalendar,
  generateICalFile,
  clearOldEvents,
  getUnavailableDatesByRoomType,
} = require("../controller/calendarController");

router.get("/sync_calendar", syncCalendar);
router.get("/calendar/:roomType.ics", generateICalFile);
router.delete("/clear_old_events", clearOldEvents);
router.get("/calendar/unavailable_dates", getUnavailableDatesByRoomType);

module.exports = router;
