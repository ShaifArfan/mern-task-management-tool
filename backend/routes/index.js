import express from "express";
import { checkAuth } from "../utils/checkAuth.js";
import authRoutes from './auth.js';
import usersRoutes from './users.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', checkAuth, usersRoutes);


export default router;