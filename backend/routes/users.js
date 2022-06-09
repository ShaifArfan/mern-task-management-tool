import express from "express";
import { createUser, getAllUsers, getUser, getUserTasks, updateUser } from "../controllers/users.js";

const router = express.Router();

// for dev only
// router.get('/', getAllUsers);
// router.post('/', createUser);

router.get('/tasks/', getUserTasks);

router.get('/', getUser);

router.put('/', updateUser);


export default router;