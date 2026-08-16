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
  res.send("updated user");
};

const updateUserPassword = async (req, res) => {
  res.send("updated user password");
};

module.exports = {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
