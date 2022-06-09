import User from "../models/User.js";
import { createError } from "../utils/error.js";
import getUserData from "../utils/getUserData.js";

export const createUser = async (req, res, next) => {
  try{
    const user = new User(req.body);
    const newUser = await user.save();
    const newUserData = getUserData(newUser);
    res.status(201).json(newUserData);
  }catch(err){
    next(err);
  }
}

export const getAllUsers = async (req, res, next) => {
  try{
    const users = await User.find();
    const usersData = users.map(user => {
      return getUserData(user)
    })
    res.status(200).json(usersData);
  }catch(err){
    next(err);
  }
}

export const getUser = async (req, res, next) => {
  if(!req.params.userId || req.params.userId !== req.user.id){
    return next(createError({ status: 401, message: "Invalid User Id" }));
  }
  try{
    const user = await User.findById(req.params.userId);
    const userData= getUserData(user);
    res.status(200).json(userData);
  }catch(err){
    next(err);
  }
}

export const updateUser = async (req, res, next) => {
  if(!req.params.userId || req.params.userId !== req.user.id){
    return next(createError({ status: 401, message: "Invalid User Id" }));
  }
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    res.status(200).json(getUserData(updatedUser));
  }catch(err){
    next(err);
  }
}
