const express = require("express");
const router = express.Router();
const {
  saveGlobalSettings,
  editGlobalSettings,
  getGlobalSettings,
  getGatewaySettings,
  getCalendarLinks,
  updateCalendarLinks,
} = require("../controller/globalSettingsController");

router.post("/admin/global-settings", saveGlobalSettings);
router.put("/admin/global-settings/:id", editGlobalSettings);
router.get("/admin/global-settings", getGlobalSettings);
router.get("/admin/gateway-settings", getGatewaySettings);
// Route to fetch all calendar links
router.get("/admin/calendar-links", getCalendarLinks);

// Route to update calendar links
router.put("/admin/calendar-links", updateCalendarLinks);
module.exports = router;
