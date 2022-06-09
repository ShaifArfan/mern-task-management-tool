import Task from "../models/Task.js";
import User from "../models/User.js";

export const createTask = async (req, res, next) => {
  const newTask = new Task(req.body);
  try{
    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { tasks: savedTask._id } });
    res.status(200).json(savedTask);
  }catch(err){
    next(err);
  }
}

export const updateTask = async (req, res, next) => {
  try{
    const updatedTask = await Task.findByIdAndUpdate(req.task.id, req.body, { new: true});
    res.status(200).json(updatedTask);
  }catch(err){
    next(err);
  }
}

export const getAllTasks = async (req, res, next) => {
  try{
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  }catch(err){
    next(err);
  }
}

export const getTasksByUserId = async (req, res, next) => {
  try{
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  }catch(err){
    next(err);
  }
}