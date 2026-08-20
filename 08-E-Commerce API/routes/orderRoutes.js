const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controllers/order.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.use(authenticateUser);

router.post("/", authenticateUser, createOrder);

router.get("/showAllMyOrders", authenticateUser, getCurrentUserOrders);

router.get("/", authenticateUser, authorizePermissions("admin"), getAllOrders);

router.patch("/:id", authenticateUser, updateOrder);

router.get("/:id", authenticateUser, getSingleOrder);

module.exports = router;
