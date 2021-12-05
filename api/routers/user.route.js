const express = require("express");
const {
  signin,
  signup,
  updateUser,
} = require("../controllers/user.controller");
const { checkSignin, checkUser } = require("../middlewares/auth.middleware");
const {
  validatorSignup,
  validatorSignin,
  isValidation,
} = require("../middlewares/check-validators");
const { upload } = require("../middlewares/upload.middleware");
const router = express.Router();

router.post("/signin", validatorSignin, isValidation, signin);

router.post("/signup", validatorSignup, isValidation, signup);

router.put("/", checkSignin, checkUser, upload, updateUser);

module.exports = router;
