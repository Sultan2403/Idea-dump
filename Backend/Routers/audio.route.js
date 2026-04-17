const express = require("express");
const router = express.Router();
const audio_controller = require("../Controllers/audio.controller");
const audioMiddleware = require("../Middlewares/Media/audio.middleware");

router.post("/", audioMiddleware, audio_controller);

module.exports = router;
