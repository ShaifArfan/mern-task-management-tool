import express from "express";
import { createUser, getAllUsers, getUser, updateUser } from "../controllers/users.js";

const router = express.Router();

// for dev only
// router.get('/', getAllUsers);
// router.post('/', createUser);

router.get('/:userId', getUser);

router.patch('/:userId', updateUser);

export default router;