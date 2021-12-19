const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
// Controller
const placesControllers = require("../controllers/places-controllers");

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.get("/:pId", placesControllers.getPlaceById);

router.post(
    "/",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty(),
    ],
    placesControllers.createPlace
);

router.patch(
    "/:pid",
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
