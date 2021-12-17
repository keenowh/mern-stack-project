const express = require("express");

const router = express.Router();
// Controller
const placesControllers = require("../controllers/places-controllers");

router.get("/");
router.post("/signup");
router.post("/login");

module.exports = router;
