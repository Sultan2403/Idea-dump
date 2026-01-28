const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      trim: true,
    },
    title: {
      type: String,
      required: false, 
      trim: true,
    },
    
  },
  {
    strict: true,
  },
);


const Idea = mongoose.model("Idea", ideaSchema, "ideas");

module.exports = Idea;
