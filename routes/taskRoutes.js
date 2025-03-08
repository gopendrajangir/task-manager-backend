import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { verifyJWTToken } from "../controllers/userController.js";

const router = express.Router({ mergeParams: true });

router.use(verifyJWTToken);

router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

export default router;
