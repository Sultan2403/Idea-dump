const ideas = require("../DB/Models/ideaModel");

const addNewIdea = async (req, res) => {
  try {
    await ideas.insertOne(req.body);
    const all = await ideas.find();
    console.log(all);
    res.status(201).json({ msg: "success", all });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const fetchedIdeas = await ideas.find();
    res.json(fetchedIdeas);
  } catch (err) {
    res.status(500).json({ message: "An error occured", error: err.message });
  }
};

const deleteAnIdea = async (req, res) => {
  if (!req.params.id || typeof req.params.id === String) {
    res.status(400).json({ message: "Bad request" });
  }
  try {
    const data = ideas.findByIdAndDelete(req.params.id);
    res.status(203).json("deleted successfuly");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

const getOneIdea = async (req, res) => {
  if (!req.params.id || typeof req.params.id === String) {
    res.status(400).json({ message: "Bad request" });
  }
  try {
    const result = await ideas.findOne(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("An error occured: ", error);
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

const updateIdea = async (req, res) => {
  if (!req.params.id || typeof req.params.id === String) {
    res.status(400).json({ message: "Bad request" });
  }

  const { text, title } = req.body;
  try {
    await ideas.findOneAndUpdate({ _id: req.params.id }, { text, title });
    res.status(200).json({ message: "Idea updated successfully" });
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
    await ideas.insertMany(req.body, {ordered: true});
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
