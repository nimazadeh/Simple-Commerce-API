const { Router } = require("express");
const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/user.controller");
const { authenticateUser: authUser } = require("../middleware/authentication");

const router = Router();

router.get("/", authUser, getAllUser);

router.get("/showMe", showCurrentUser);

router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);

router.get("/:id", authUser, getSingleUser);

module.exports = router;
