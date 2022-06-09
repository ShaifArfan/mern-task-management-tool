import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import getUserData from "../utils/getUserData.js";

export const login = async (req, res, next) => {
  if(!req.body.email || !req.body.password){
    return next(createError({ message: "Email and password are required", statusCode: 400 }));
  }

  try{
    const user = await User.findOne({ email: req.body.email });
    if(!user) {
      return next(createError({status: 404, message: "User not found with the email"})); 
    }
    const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
    if(!isPasswordCorrect) {
      return next(createError({status: 400, message: "Password is incorrect"}));
    }
    const userData = getUserData(user);
    const payload = {
      id: user._id,
      name: user.name
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
    res.cookie('access_token', token, {
      httpOnly: true,
    }).status(200).json({userData});
    
  }catch(err){
    next(err);
  }
}

export const register = async (req, res, next) => {
  if( !req.body.name || !req.body.email || !req.body.password){
    return next(createError({ message: "Name, Email & password are required", statusCode: 400 }));
  }

  try{
    const salt  = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json('New User Created');
  }catch(err){
    next(err);
  }
}