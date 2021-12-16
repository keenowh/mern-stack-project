const express = require("express");

const router = express.Router();
const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creator: "u2",
    },
];
router.get("/user/:uid", (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find((p) => p.creator === userId);
    if (!place) {
        const error = new Error(
            "Could not find a place for the provided userId"
        );
        error.code = 404;
        next(error);
    } else {
        res.json({ place });
    }
});

router.get("/:pId", (req, res, next) => {
    const placeId = req.params.pId;
    console.log(placeId);
    const place = DUMMY_PLACES.find((p) => {
        return p.id === placeId;
    });

    if (!place) {
        const error = new Error("Could not find a place for the provided id");
        error.code = 404;
        throw error;
    } else {
        res.json({ place });
    }
});

module.exports = router;