//  I intend to handle all crud operations here.

const getAllIdeas = async (req, res) => {
  const results = await db.find().toArray();
  res.json(results)
};


module.exports = getAllIdeas