const express = require("express");
const router = express.Router();
const audio_controller = require("../Controllers/audio.controller");

router.post("/", audio_controller);

module.exports = router;
