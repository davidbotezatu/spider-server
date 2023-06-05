const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/authJwt");

const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").get(verifyToken, getTasks).post(verifyToken, addTask);

router
  .route("/:id")
  .put(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);

module.exports = router;
