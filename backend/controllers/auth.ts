import bcryptjs from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/index.js';
import { createError } from '../utils/error.js';

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.body.email || !req.body.password) {
		return next(
			createError({
				message: 'Email and password are required',
				statusCode: 400,
			})
		);
	}

	try {
		const result = await db.query(
			'SELECT * FROM user_accounts WHERE email = $1',
			[req.body.email]
		);
		const user = result.rows[0];
		if (!user) {
			return next(
				createError({
					statusCode: 404,
					message: 'User not found with the email',
				})
			);
		}
		const isPasswordCorrect = await bcryptjs.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordCorrect) {
			return next(
				createError({ statusCode: 400, message: 'Password is incorrect' })
			);
		}
		const payload: JwtUserPayload = {
			id: user.id,
			name: user.name,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});
		res
			.cookie('access_token', token, {
				httpOnly: true,
				sameSite: 'none',
				secure: process.env.NODE_ENV === 'production',
			})
			.status(200)
			.json({ name: user.name, email: user.email, message: 'login success' });
	} catch (err) {
		next(err);
	}
};

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.body.name || !req.body.email || !req.body.password) {
		return next(
			createError({
				message: 'Name, Email & password are required',
				statusCode: 400,
			})
		);
	}

	try {
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(req.body.password, salt);
		await db.query(
			'INSERT INTO user_accounts(name, email, password) VALUES($1, $2, $3)',
			[req.body.name, req.body.email, hashedPassword]
		);
		// console.log(newUser);
		res.status(201).json('New User Created');
	} catch (err) {
		next(err);
	}
};

export const logout = async (_: Request, res: Response) => {
	res.clearCookie('access_token');
	res.status(200).json({ message: 'logout success' });
};

export const isLoggedIn = async (req: Request, res: Response) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.status(200).json(false);
	}
	try {
		await jwt.verify(token, process.env.JWT_SECRET);
		return res.status(200).json(true);
	} catch (err) {
		return res.status(200).json(false);
	}
};
