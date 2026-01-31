const express = require("express");
const router = express.Router();
const speech_to_text_controller = require("../Controllers/speech-to-text.controller");

router.post("/", speech_to_text_controller);

module.exports = router;
