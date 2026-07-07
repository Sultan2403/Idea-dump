const { transcribeAudio } = require("../Services/audio.service");

const audio_controller = async (req, res) => {
  try {
    console.log(req.file);

    const audio = req.file.buffer;

    const transcribed = await transcribeAudio(audio);
    res.json({ stuff: req.file, success: true, transcribed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

module.exports = audio_controller;
