const ideas = require("./Models/ideaModel");

const addNewIdea = async (req, res) => {
  const existing = await ideas.find(req.body);
  if (existing) res.status(401).json("idea exists already");
  await ideas.insertOne(req.body);
  const all = ideas.find();
  console.log(all);
};

const getAllIdeas =  async(req,res)=>{
    const fetchedIdeas = await ideas.find()
    res.json(fetchedIdeas)
}

module.exports = getAllIdeas, addNewIdea