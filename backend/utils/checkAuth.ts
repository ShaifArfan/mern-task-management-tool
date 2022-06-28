import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const checkAuth = async (
	req: Request,
	_: Response,
	next: NextFunction
) => {
	const token = req.cookies.access_token;
	if (!token) {
		return next(createError({ statusCode: 401, message: 'Unauthorized' }));
	}
	try {
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded as JwtUserPayload;

		next();
	} catch (err) {
		next(
			createError({ statusCode: 401, message: 'Unauthorized, invalid token' })
		);
	}
};
