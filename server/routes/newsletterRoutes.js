const express = require("express");
const router = express.Router();
const newsletterController = require("../controller/newsletterController");

router.post("/subscribe", newsletterController.subscribeEmailToNewsletter);

module.exports = router;
