const express = require("express");
const router = express.Router();
const { ideaSchema } = require("../Schemas/ideas.schema");
const { celebrate } = require("celebrate");

const {
  getAllIdeas,
  addNewIdea,
  addNewIdeas,
  updateIdea,
  deleteAnIdea,
  getOneIdea,
} = require("../Controllers/ideas.controller");

router.get("/", getAllIdeas);
router.get("/:id", getOneIdea);
router.post("/", celebrate({ body: ideaSchema }), addNewIdea);
router.post("/bulk", addNewIdeas);
router.put("/:id", updateIdea);
router.delete("/:id", deleteAnIdea);

module.exports = router;
