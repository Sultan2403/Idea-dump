const { celebrate } = require("celebrate");
const express = require("express");
const userSchema = require("../Schemas/users.schema");
const { registerUser } = require("../Controllers/users.controller");
const router = express.Router();

router.post("/register", celebrate({ body: userSchema }), registerUser);

module.exports = router