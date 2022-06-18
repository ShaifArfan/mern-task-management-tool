import Task from "../models/Task.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createTask = async (req, res, next) => {
  const newTask = new Task({
    title: req.body.title,
    user: req.user.id,
    completed: req.body.completed
  });
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

export const deleteTask = async (req, res, next) => {
  try{
    const task = await Task.findById(req.params.taskId);
    if(task.user === req.user.id){
      return next(createError({ status: 401, message: "It's not your todo." }));
    }
    const user = await User.findById(req.user.id);
    await Task.findByIdAndDelete(req.params.taskId);
    user.tasks.pull(req.params.taskId);
    await user.save();
    res.json('Task Deleted Successfully');
  }catch(err){
    next(err);
  }
}

export const deleteAllTasks = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id);
    await Task.deleteMany({ user: req.user.id });
    user.tasks = [];
    await user.save();
    res.json('All Todo Deleted Successfully');
  }catch(err){
    next(err);
  }
}