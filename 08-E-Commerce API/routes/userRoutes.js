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

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUser);

router.get("/showMe", authenticateUser, showCurrentUser);

router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);

router.get(
  "/:id",
  authenticateUser,
  authorizePermissions("admin"),
  getSingleUser,
);

module.exports = router;
