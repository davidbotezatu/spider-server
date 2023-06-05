const sequelize = require("../config/database");
const TaskStatus = require("../models/TaskStatus");

const addTaskStatuses = async () => {
  try {
    // Synchronize the models with the database
    const exists = await TaskStatus.findOne({ status: "Nou" });
    if (exists) {
      console.log("Statusurile exista deja");
      return;
    }

    // Create the roles
    await TaskStatus.create({ status: "Nerezolvate" });
    await TaskStatus.create({ status: "De rezolvat" });
    await TaskStatus.create({ status: "Rezolvate" });
    await TaskStatus.create({ status: "Testate" });
    await TaskStatus.create({ status: "Terminate" });
    await TaskStatus.create({ status: "Livrate" });
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

module.exports = { addTaskStatuses };
