require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

const { addAdmin } = require("./sql/addAdmin");
const { addUserRoles } = require("./sql/addUserRoles");
const { addTaskStatuses } = require("./sql/addTaskStatuses");

const usersRoutes = require("./routes/usersRoutes");
const userRoleRoutes = require("./routes/userRolesRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const validateTokenRoutes = require("./routes/validateTokenRoutes");
const changePassRoutes = require("./routes/changePassRoutes");
const taskRoutes = require("./routes/taskRoutes");
const taskStatusRoutes = require("./routes/taskStatusRoutes");

// Sync the database models
sequelize
  .sync()
  .then(async () => {
    await addUserRoles();
    await addAdmin();
    await addTaskStatuses();

    app.use("/api/auth", authRoutes);
    app.use("/api/validate-token", validateTokenRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/userroles", userRoleRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/change-password", changePassRoutes);
    app.use("/api/tasks", taskRoutes);
    app.use("/api/task-status", taskStatusRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
