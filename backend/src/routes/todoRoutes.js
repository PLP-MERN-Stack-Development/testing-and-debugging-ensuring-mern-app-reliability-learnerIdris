const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({ title: req.body.title });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all
router.get("/", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: 1 });
  res.json(todos);
});

// Update
router.put("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
});

// Delete
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
