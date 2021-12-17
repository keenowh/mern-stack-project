const express = require("express");

const router = express.Router();
// Controller
const placesControllers = require("../controllers/places-controllers");

router.get("/user/:uid", placesControllers.getPlaceByUserId);

router.get("/:pId", placesControllers.getPlaceById);

router.post("/", placesControllers.createPlace);

router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
