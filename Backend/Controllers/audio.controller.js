const audio_controller = async (req, res) => {
  try {
    console.log(req, req.file)
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

module.exports = audio_controller;
