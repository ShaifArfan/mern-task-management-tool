import express from "express";
import { createTask, getAllTasks, getCurrentUserTasks, updateTask } from "../controllers/task.js";

const router = express.Router();

router.get('/all', getAllTasks);

router.post("/", createTask);

router.put("/:taskId", updateTask);

router.get('/myTasks', getCurrentUserTasks);

export default router;