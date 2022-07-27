import jwt from 'jsonwebtoken';
import createError from './createError.js';

export default (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError({ status: 401, message: 'Unauthorized' }));
  }
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError({ status: 401, message: 'Unauthorized, invalid token' }));
    }
    req.user = decoded;
    return next();
  });
};
