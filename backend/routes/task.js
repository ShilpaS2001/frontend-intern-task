const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @route   POST /api/tasks
 * @desc    Add new task
 */
router.post("/", auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      userId: req.user.id
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
});

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks of logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});


module.exports = router;
