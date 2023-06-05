const TaskStatus = require("../models/TaskStatus");

exports.getTaskStatus = async (req, res) => {
  try {
    const statuses = await TaskStatus.findAll();
    res.json(statuses);
  } catch (error) {
    console.log("Statusurile nu pot fi preluate: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
