const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
// Controller
const {
    getUsers,
    createUser,
    loginUser,
} = require("../controllers/users-controllers");

router.get("/", getUsers);
router.post(
    "/signup",
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 }),
    ],
    createUser
);
router.post(
    "/login",
    [
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 }),
    ],
    loginUser
);

module.exports = router;
