const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const CustomError = require("../errors");

const getAllUser = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res
    .status(StatusCodes.OK)
    .json({ success: true, count: users.length, users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`Not user with id: ${req.params.id}`);
  }

  res.status(200).json(user);
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("please  provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credential");
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({msg: 'Success! Password Updated.'});
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
