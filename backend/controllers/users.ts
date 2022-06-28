import { NextFunction, Request, Response } from 'express';
import db from '../db/index.js';

const getCurrentUser = async (id: number) => {
	const result = await db.query(`SELECT * FROM user_accounts WHERE id = $1`, [
		id,
	]);
	return result.rows[0];
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const result = await db.query(
			'SELECT id, name, email FROM user_accounts WHERE id = $1',
			[req.user!.id]
		);
		const user = result.rows[0];
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const currentUser = await getCurrentUser(req.user!.id);
		const result = await db.query(
			`UPDATE user_accounts SET
        name = COALESCE(NULLIF($1, ''), '${currentUser.name}'),
        email = COALESCE(NULLIF($2, ''), '${currentUser.email}')
      WHERE id = $3 RETURNING name, email`,
			[req.body.name, req.body.email, req.user!.id]
		);
		console.log(result);
		res.status(200).json(result.rows[0]);
	} catch (err) {
		next(err);
	}
};

export const getUserInfo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await db.query(
			'SELECT id, name, email FROM user_accounts WHERE id = $1',
			[req.user!.id]
		);
		const user = data.rows[0];
		console.log(req.user);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
