const HttpError = require("../models/http-error");
const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const DUMMY_USERS = [
    {
        id: "u1",
        name: "naneun",
        email: "naneun@gmail.com",
        password: "naneun",
    },
];
const getUsers = (req, res) => {
    res.status(200).send({ users: DUMMY_USERS });
};

const createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid request inputs", 422);
    }
    const { name, email, password } = req.body;
    const existing = DUMMY_USERS.find((u) => u.email === email);
    if (existing) {
        throw new HttpError("User already exists", 404);
    }
    const user = { id: uuid(), name, email, password };
    DUMMY_USERS.push(user);
    res.status(201).json(user);
};

const loginUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError("Invalid request inputs", 422);
    }
    const { email, password } = req.body;
    const user = DUMMY_USERS.find((u) => u.email === email);
    console.log(user);
    if (!user || user.password !== password) {
        throw new HttpError("Could not find email or password", 404);
    }

    res.status(200).json(user);
};

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
