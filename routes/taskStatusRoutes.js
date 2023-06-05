const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/authJwt");
const { getTaskStatus } = require("../controllers/taskStatusController");

router.route("/").get(verifyToken, getTaskStatus);

module.exports = router;
