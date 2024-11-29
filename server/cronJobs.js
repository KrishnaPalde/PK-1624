const cron = require("node-cron");
const {
  syncCalendar,
  clearOldEvents,
} = require("./controller/calendarController");

// Sync external calendars every hour
cron.schedule("28 * * * *", async () => {
  console.log("Syncing external calendars...");
  try {
    await syncCalendar({
      query: {
        roomType: "Cozy Corner",
        url: "https://www.airbnb.co.in/calendar/ical/1195417586397262230.ics?s=15f38bf6d4da4ab06aac5980a369166e",
      },
    });
  } catch (error) {
    console.error("Error syncing calendars:", error.message);
  }
});

// Clear old events weekly
cron.schedule("0 0 * * 0", async () => {
  console.log("Clearing old events...");
  try {
    await clearOldEvents();
  } catch (error) {
    console.error("Error clearing old events:", error.message);
  }
});

module.exports = cron;
