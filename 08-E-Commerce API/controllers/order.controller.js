const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findOne({ _id: orderId }).populate("user", "name email");

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }

  checkPermissions(req.user, order.user._id);

  res.status(StatusCodes.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).populate("user", "name email");
  res.status(StatusCodes.OK).json({ count: orders.length, orders });
};

const createOrder = async (req, res) => {
  req.body.user = req.user.userId;

  const order = await Order.create(req.body);

  res.status(StatusCodes.CREATED).json({ order });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findOneAndUpdate(
    { _id: orderId },
    { status },
    { returnDocument: "after" },
  );

  if (!order) {
    throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
  }

  res.status(StatusCodes.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
