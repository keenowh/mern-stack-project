const uuid = require("uuid/v4");

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

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find((p) => p.creator === userId);
    if (!place) {
        return next(
            new HttpError("Could not find a place for the provided userId", 404)
        );
    } else {
        res.json({ place });
    }
};

const createPlace = (req, res, next) => {
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
    const searchIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
    if (searchIndex < 0) {
        return next(
            new HttpError("Could not find place with the provided pId", 404)
        );
    }
    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

    res.status(201).json(DUMMY_PLACES);
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
