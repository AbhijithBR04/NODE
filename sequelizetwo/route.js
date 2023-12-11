const express = require("express");
const router = express.Router();
const Task = require("./model");

router.get("/todos", async (req, res) => {
  const tasks = await Task.findAll();

  res.status(200).json(tasks);
});

router.post("/todos", async (req, res) => {
  const { content, description } = req.body;

  const newTask = Task.build({
    'content': content,
    'description': description,
  });

  try {
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.json(error);
  }
});

router.get("/todo/:id", async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(task);
});

router.patch("/todo/:id", async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });

  const { is_complete } = req.body;

  await task.set({
    is_complete: is_complete,
  });

  await task.save();

  res.status(200).json(task);
});

router.put("/todo/:id", async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });

  const { is_complete, content, description } = req.body;

  await task.set({
    is_complete: is_complete,
    content: content,
    description: description,
  });

  await task.save();

  res.status(200).json(task);
});

router.delete("/todo/:id", async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });

  await task.destroy();

  res.status(204).json({});
});

module.exports = router;
