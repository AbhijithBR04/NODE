const express = require("express");
const router = express.Router();
const Task = require("./model");

//to get all the data
router.get("/todos", async (req, res) => {
  const tasks = await Task.findAll();

  res.status(200).json(tasks);
});


//to create a todo data
router.post("/todos", async (req, res) => {
  const { content, description } = req.body;
  const existingTask = await Task.findOne({ where:{content:content} });

  if (existingTask) {
    // Task with the same content already exists
    return res.status(400).json({ message: "Task with the same content already exists" });
  }
  const newTask = Task.build({
    content: content,
    description: description,
  });

  try {
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.json(error);
  }
});


//to get a data of an specific one with the help of id passing as a parameter
router.get("/todo/:id", async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(task);
});


//to update the is_complete true of false value
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


//to update the entire todo data with the the help of id passing as a parameter
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


//to delete the todo data with the help of id passing as a parameter
router.delete("/todo/:id", async (req, res) => {
  const task = await Task.findOne({
    where: {
      id: req.params.id,
    },
  });

  await task.destroy();

  res.status(204).json({message:"user deleted"});
});

module.exports = router;
