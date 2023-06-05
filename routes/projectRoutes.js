const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/authJwt");

const {
  getAllProjectsWithPagination,
  addNewProject,
  updateProject,
} = require("../controllers/projectController");

router
  .route("/")
  .get(verifyToken, getAllProjectsWithPagination)
  .post(verifyToken, addNewProject);

router.route("/:id").put(verifyToken, updateProject);

module.exports = router;
