import express from "express";
import { createTask, getAllTasks, getTasksByUserId, updateTask } from "../controllers/task.js";

const router = express.Router();

router.post("/", createTask);

router.put("/", updateTask);

router.get('/', getAllTasks);

router.get('/myTasks', getTasksByUserId);

export default router;