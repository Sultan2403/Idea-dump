const ideas = require("./Models/ideaModel");

const addNewIdea = async (req, res) => {
  try {
    await ideas.insertOne(req.body);
    const all = await ideas.find();
    console.log(all);
    res.status(201).json({msg: "success", all})
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllIdeas = async (req, res) => {
  try {
    const fetchedIdeas = await ideas.find();
    res.json(fetchedIdeas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addNewIdea, getAllIdeas };

module.exports = { getAllIdeas, addNewIdea };
