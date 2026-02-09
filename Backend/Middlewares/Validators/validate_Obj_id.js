const mongoose = require("mongoose");

const checkObjectId = (req, res, next) => {
  const value = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ID`,
    });
  }

  next();
};

module.exports = checkObjectId;
