import mongoose from "mongoose";
import Task from '../models/Task.js';

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
}


export async function getTaskById(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
    task
      ? res.status(200).json({ status: "success", data: task })
      : res.status(404).json({ success: false, message: "Task not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching task" });
  }
}

export async function createTask(req, res) {
  try {
    const task = await Task.create({ ...req.body, userId: req.userId });
    res.status(201).json({ status: "success", data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating task" });
  }
}

export async function updateTask(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    task
      ? res.status(200).json({ status: "success", data: task })
      : res.status(404).json({ success: false, message: "Task not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating task" });
  }
}

export async function deleteTask(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    task
      ? res.status(200).json({ status: "success" })
      : res.status(404).json({ success: false, message: "Task not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
}
