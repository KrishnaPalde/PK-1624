const express = require("express");
const { login } = require("../controller/authenticateAdmin");

const router = express.Router();

router.post("/authenticateAdmin", login);

module.exports = router; 
