const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const router = express.Router();

router.route("/").post(auth, accessChat).get(auth, fetchChats);
router.route("/group").post(auth, createGroupChat);
router.route("/rename").put(auth, renameGroup);
router.route("/groupadd").put(auth, addToGroup);
router.route("/groupremove").put(auth, removeFromGroup);

module.exports = router;
