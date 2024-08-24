const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");

const router = express.Router();

router.route("/").post(auth, sendMessage);
router.route("/:chatId").get(auth, allMessages);

module.exports = router;
