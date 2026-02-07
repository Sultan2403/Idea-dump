const mongoose = require("mongoose");

// Middleware factory: paramName defaults to "id"
const checkObjectId = (req, res, next) => {
  const value = req.params[paramName];

  if (!mongoose.Types.ObjectId.isValid(value)) {
    return res.status(400).json({
      success: false,
      message: `Invalid ID format for '${paramName}'`,
    });
  }

  next();
};

module.exports = checkObjectId;
