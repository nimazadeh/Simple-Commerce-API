const { Router } = require("express");
const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/user.controller");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const router = Router();

router.get("/", authenticateUser, authorizePermissions, getAllUser);

router.get("/showMe", showCurrentUser);

router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);

router.get("/:id", authenticateUser, authorizePermissions,getSingleUser);

module.exports = router;
