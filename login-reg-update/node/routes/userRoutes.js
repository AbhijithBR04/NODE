const express = require("express");
const validator = require("express-joi-validation").createValidator({});
const {
  registerSchema,
  Authentication,
  register,
  login,
  updatelogin,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", validator.body(registerSchema), register);

router.post("/login", login);

router.post("/update", Authentication, updatelogin);

module.exports = router;
