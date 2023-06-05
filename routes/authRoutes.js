const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");
const { verifyToken } = require("../utils/authJwt");

router.route("/").post(login).get(verifyToken, logout);

module.exports = router;
