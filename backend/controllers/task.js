import Task from "../models/Task.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

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
    const task = await Task.findById( req.params.taskId).exec();
    if(!task) return next(createError({ status: 404, message: "Task not found" }));
    if(task.user.toString() !== req.user.id) return next(createError({ status: 401, message: "It's not your todo." }));

    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      title: req.body.title,
      completed: req.body.completed
    }, { new: true});
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

export const getCurrentUserTasks = async (req, res, next) => {
  try{
    const tasks = await Task.find({ user: req.user.id});
    res.status(200).json(tasks);
  }catch(err){
    next(err);
  }
}