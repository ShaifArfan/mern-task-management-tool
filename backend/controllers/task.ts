import { NextFunction, Request, Response } from 'express';
import db from '../db/index.js';
import { createError } from '../utils/error.js';

export const createTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await db.query(
			'INSERT INTO tasks (title, userId) VALUES ($1, $2) RETURNING *',
			[req.body.title, req.user!.id]
		);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		next(err);
	}
};

const getTask = async (id: number) => {
	const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
	return result.rows[0];
};

export const updateTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const taskId = parseInt(req.params.taskId);
		const task = await getTask(taskId);
		console.log(req.body);
		const result = await db.query(
			`UPDATE tasks SET
        title = COALESCE(NULLIF($1, ''), '${task.title}'),
        completed = COALESCE(NULLIF($2, '')::BOOLEAN, ${task.completed})
      WHERE id = $3 AND userId = $4 RETURNING id, title, completed`,
			[req.body.title, req.body.completed, req.params.taskId, req.user!.id]
		);
		if (result.rowCount === 0) {
			return res.status(404).json('Task not found');
		}
		return res.status(200).json(result.rows[0]);
	} catch (err) {
		return next(err);
	}
};

export const getAllTasks = async (
	_: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await db.query('SELECT * FROM tasks');
		res.status(200).json(result.rows);
	} catch (err) {
		next(err);
	}
};

export const getCurrentUserTasks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await db.query(
			'SELECT id, title, completed FROM tasks WHERE userId = $1',
			[req.user!.id]
		);
		res.status(200).json(result.rows);
	} catch (err) {
		next(err);
	}
};

export const deleteTask = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await db.query(
			'DELETE FROM tasks WHERE id = $1 AND userId = $2',
			[req.params.taskId, req.user!.id]
		);
		if (result.rowCount === 0) {
			return next(createError({ statusCode: 404, message: 'Task not found' }));
		}
		res.json('Task Deleted Successfully');
	} catch (err) {
		next(err);
	}
};

export const deleteAllTasks = async (
	_: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await db.query('DELETE FROM tasks');
		console.log(result);
		res.json(`All Todo Deleted Successfully ${result.rowCount}`);
	} catch (err) {
		next(err);
	}
};
