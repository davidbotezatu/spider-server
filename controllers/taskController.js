const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");
const TaskStatus = require("../models/TaskStatus");

exports.getTasks = async (req, res) => {
  try {
    const { page, sortBy, limit, pid } = req.query;

    if (!pid) return res.status(204).json({ message: "Lipseste ID proiect" });

    let tasks;

    if (!page) {
      tasks = await Task.findAll({
        where: { idProiect: pid },
        include: [
          { model: User, as: "reporterName" },
          { model: User, as: "assigneeName" },
          { model: Project, as: "projectName" },
          { model: TaskStatus, as: "taskStatus" },
        ],
        order: [["titlu", "ASC"]],
      });

      res.json({ tasks });
    } else {
      tasks = await Task.findAndCountAll({
        where: { idProiect: pid },
        include: [
          { model: User, as: "reporterName" },
          { model: User, as: "assigneeName" },
          { model: Project, as: "projectName" },
          { model: TaskStatus, as: "taskStatus" },
        ],
        order: [["titlu", sortBy === "desc" ? "DESC" : "ASC"]],
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });

      const totalPages = Math.ceil(tasks.count / limit);

      res.json({ tasks: tasks.rows, totalPages });
    }
  } catch (error) {
    console.log("Eroare la getTasks: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { idProiect, titlu, descriere, reporter, assignee, status } =
      req.body;

    await Task.create({
      idProiect,
      titlu,
      descriere,
      reporter,
      assignee,
      status,
    });

    res.status(200).json({ message: "Task creat cu succes" });
  } catch (error) {
    console.log("Eroare la addTask: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    console.log("called");
    const { titlu, descriere, assignee, status } = req.body;
    console.log(req.params.id);
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task-ul nu a fost gasit" });
    }

    await task.update({ titlu, descriere, assignee, status });
    res.status(200).json({ message: "Task modificat cu succes" });
  } catch (error) {
    console.error("Eroare la updateTask:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task-ul nu a fost gasit" });
    }

    await Task.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Task sters cu succes" });
  } catch (error) {
    console.error("Eroare la deleteTask:", error);
    res.status(500).json({ message: "Server error" });
  }
};
