const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/authJwt");

const {
  getUsers,
  getAllUsersWithPagination,
  addUser,
  updateUser,
} = require("../controllers/usersController");

router
  .route("/")
  .get(verifyToken, getAllUsersWithPagination)
  .post(verifyToken, addUser);
router.route("/all").get(verifyToken, getUsers);
router.route("/:id").put(verifyToken, updateUser);

module.exports = router;
