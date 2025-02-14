const express = require("express");
const { authenticateBiometric } = require("../controllers/authController");
const router = express.Router();

router.post("/authenticate", authenticateBiometric);

module.exports = router;
