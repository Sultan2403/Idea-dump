const { celebrate } = require("celebrate");
const express = require("express");
const { registerSchema, loginSchema } = require("../Schemas/auth.schema");
const {
  registerUser,
  loginUser,
  refreshTokenController
  } = require("../Controllers/auth.controller");
const router = express.Router();


router.post("/refresh", celebrate({ body: registerSchema }), refreshTokenController);
router.post("/register", celebrate({ body: registerSchema }), registerUser);
router.post("/login", celebrate({ body: loginSchema }), loginUser);

module.exports = router;
