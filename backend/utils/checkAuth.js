import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token) {
    return next(createError({ status: 401, message: "Unauthorized" })); 
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err){
      return next(createError({ status: 401, message: "Unauthorized, invalid token" })); 
    }else{
      req.user = decoded;
      next();
    }
  })
}