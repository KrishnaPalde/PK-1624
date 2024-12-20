// const cron = require("node-cron");
// const {
//   syncCalendar,
//   clearOldEvents,
// } = require("./controller/calendarController");

// // Sync external calendars every hour
// cron.schedule("0 * * * *", async () => {
//   console.log("Syncing external calendars...");
//   try {
//     await syncCalendar({
//       query: {
//         roomType: "Cozy Corner",
//         url: "https://www.airbnb.co.in/calendar/ical/1195417586397262230.ics?s=15f38bf6d4da4ab06aac5980a369166e",
//       },
//     });
//   } catch (error) {
//     console.error("Error syncing calendars:", error.message);
//   }
// });

// // Clear old events weekly
// cron.schedule("0 0 * * 0", async () => {
//   console.log("Clearing old events...");
//   try {
//     await clearOldEvents();
//   } catch (error) {
//     console.error("Error clearing old events:", error.message);
//   }
// });

// module.exports = cron;

const cron = require("node-cron");
const mongoose = require("mongoose");
const GlobalSetting = require("./models/GlobalSetting"); // Ensure the correct path to the GlobalSetting model
const {
  syncCalendar,
  clearOldEvents,
} = require("./controller/calendarController");

// Sync external calendars every hour
cron.schedule("12 * * * *", async () => {
  console.log("Syncing external calendars...");
  try {
    // Fetch all calendar links from the database
    const globalSettings = await GlobalSetting.findOne()
      .select("calendarLinks")
      .exec();

    if (globalSettings && globalSettings.calendarLinks) {
      for (const room of globalSettings.calendarLinks) {
        if (room.sources && room.sources.length > 0) {
          for (const source of room.sources) {
            try {
              console.log(
                `Syncing calendar for room: ${room.roomType}, source: ${source.source}`
              );
              await syncCalendar({
                query: {
                  roomType: room.roomType,
                  url: source.url,
                },
              });
            } catch (error) {
              console.error(
                `Error syncing calendar for room: ${room.roomType}, source: ${source.source}`,
                error.message
              );
            }
          }
        } else {
          console.log(`No sources found for room: ${room.roomType}`);
        }
      }
    } else {
      console.log("No calendar links found in the database.");
    }
  } catch (error) {
    console.error("Error fetching calendar links:", error.message);
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
