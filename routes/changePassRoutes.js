const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/authJwt");

const { changePassword } = require("../controllers/changePassController");

router.route("/").put(verifyToken, changePassword);

module.exports = router;
