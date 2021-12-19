const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

let DUMMY_PLACES = [
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
const HttpError = require("../models/http-error");

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pId;
    console.log(placeId);
    const place = DUMMY_PLACES.find((p) => {
        return p.id === placeId;
    });

    if (!place) {
        throw new HttpError("Could not find a place for the provided id", 404);
    } else {
        res.json({ place });
    }
};

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter((p) => p.creator === userId);
    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find a place for the provided userId", 404)
        );
    } else {
        res.json({ places });
    }
};

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid request inputs", 422);
    }
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator,
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json(createdPlace);
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid request inputs", 422);
    }
    const placeId = req.params.pId;
    const { title, description } = req.body;
    const searchIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
    const searchedPlace = DUMMY_PLACES.find((p) => placeId === p.id);
    if (searchIndex < 0) {
        return next(
            new HttpError("Could not find place with the procided pId", 404)
        );
    } else {
        const updatedPlace = {
            ...searchedPlace,
            title,
            description,
        };
        DUMMY_PLACES[searchIndex] = updatePlace;
        res.status(200).json({ place: updatedPlace });
    }
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pId;
    if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
        throw new HttpError("No such entry in the database");
    }

    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

    res.status(200).json({ message: "Place deleted" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
