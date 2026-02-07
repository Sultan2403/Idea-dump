const ideas = require("../DB/Models/ideas.model");
const mongoose = require("mongoose");

const addNewIdea = async (req, res) => {
  const userId = req.user.id;
  const data = { ...req.body, userId };
  try {
    const idea = await ideas.insertOne(data);

    res.status(201).json({ success: true, idea });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occoured" });
  }
};

const getUserIdeas = async (req, res) => {
  const userId = req.user.id;
  try {
    const fetchedIdeas = await ideas.find({ userId });
    res.status(200).json({ success: true, ideas: fetchedIdeas });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occured",
      error: err.message,
    });
  }
};

const deleteAnIdea = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deleted = await ideas.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Idea not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const getOneIdea = async (req, res) => {
  const { userId } = req.user;
  const ideaId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(ideaId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const idea = await ideas.find({ userId, _id: ideaId });

    if (!idea) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, idea });
  } catch (error) {
    console.error("An error occured: ", error);
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

const updateIdea = async (req, res) => {
  try {
    const updated = await ideas.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const { userId, ...data } = updated;

    res.status(200).json({ message: "Idea updated successfully", data });
  } catch (error) {
    console.error("An error occoured", error.message);
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};

const addNewIdeas = async (req, res) => {
  try {
    const inserted = await ideas.insertMany(req.body, { ordered: true });
    res.status(201).json({ message: "Success", inserted });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "An error occured" });
  }
};

module.exports = {
  getUserIdeas,
  getOneIdea,
  deleteAnIdea,
  updateIdea,
  addNewIdea,
  addNewIdeas,
};
