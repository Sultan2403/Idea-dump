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
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true
    },
  },
  {
    timestamps: true,
    strict: true,
  },
);

ideaSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString(); // convert ObjectId to string
    delete obj._id; // remove internal _id
    delete obj.__v; // remove version key
    return obj;
  },
});

const Idea = mongoose.model("Idea", ideaSchema, "ideas");

module.exports = Idea;
