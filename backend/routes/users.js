import express from 'express';
import { getUser, getUserInfo, updateUser } from '../controllers/users.js';

const router = express.Router();

router.get('/me/info/', getUserInfo);

router.get('/me', getUser);

router.put('/me', updateUser);

export default router;
