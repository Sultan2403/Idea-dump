const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
      minlength: 8,
    },
  },
  { timestamps: true, strict: true },
);
userSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString(); // convert ObjectId to string
    delete obj._id; // remove internal _id
    delete obj.__v; // remove version key
    delete obj.password; // remove password hash
    delete obj.createdAt; // optional
    delete obj.updatedAt; // optional
    return obj;
  },
});

const userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel;
