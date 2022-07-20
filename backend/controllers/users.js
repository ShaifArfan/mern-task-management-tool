import User from '../models/User.js';

export const createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save().select('name user');
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('name email');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
      },
    ).select('name email');
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id)
      .select('name email tasks');
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
