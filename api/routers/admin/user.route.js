const express = require("express");
const {
  getAllUser,
  deleteUser,
  updateRole,
  createUser,
} = require("../../controllers/admin/user.controller");
const { checkSignin, checkAdmin } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.get("/", checkSignin, checkAdmin, getAllUser);

router.post("/", checkSignin, checkAdmin, createUser);

router.post("/role", checkSignin, checkAdmin, updateRole);

router.delete("/:id", checkSignin, checkAdmin, deleteUser);

module.exports = router;
