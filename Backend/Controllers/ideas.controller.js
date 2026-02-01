const ideas = require("../DB/Models/ideas.model");
const mongoose = require("mongoose");

const addNewIdea = async (req, res) => {
  try {
    await ideas.insertOne(req.body);
    const all = await ideas.find();

    res.status(201).json({ msg: "Success", ideas: all });
  } catch (error) {
    res.status(400).json({ message: "An error occoured", error: error.message });
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const fetchedIdeas = await ideas.find();
    res.status(200).json(fetchedIdeas);
  } catch (err) {
    res.status(500).json({ message: "An error occured", error: err.message });
  }
};

const deleteAnIdea = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const deleted = await ideas.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({message: "Deleted successfuly"});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

const getOneIdea = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const idea = await ideas.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(idea);
  } catch (error) {
    console.error("An error occured: ", error);
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

const updateIdea = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  if (!req.body) {
    return res.status(400).json({ message: "Bad request" });
  }

  const { text, title } = req.body;

  if (!text && !title) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const update = {
    title,
    text,
  };

  try {
    const updated = await ideas.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.status(200).json({ message: "Idea updated successfully", updated });
  } catch (error) {
    console.error("An error occoured", error.message);
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

const addNewIdeas = async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Expected an array" });
  }

  if (req.body.length === 0) {
    return res.status(400).json({ message: "Empty array not allowed" });
  }

  try {
    await ideas.insertMany(req.body, { ordered: true });
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};
module.exports = {
  getAllIdeas,
  getOneIdea,
  deleteAnIdea,
  updateIdea,
  addNewIdea,
  addNewIdeas,
};
