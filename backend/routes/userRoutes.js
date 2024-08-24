const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

router.route("/").post(registerUser).get(auth, allUsers);
router.post("/login", authUser);

module.exports = router;
