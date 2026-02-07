const express = require("express");
const router = express.Router();
const { ideaSchema, bulkIdeaSchema } = require("../Schemas/ideas.schema");
const { celebrate } = require("celebrate");
const userAuthMiddleware = require("../Middlewares/users.auth");

const {
  getUserIdeas,
  addNewIdea,
  addNewIdeas,
  updateIdea,
  deleteAnIdea,
  getOneIdea,
} = require("../Controllers/ideas.controller");

router.get("/", userAuthMiddleware, getUserIdeas);
router.get("/:id", userAuthMiddleware, getOneIdea);
router.post(
  "/",
  [userAuthMiddleware, celebrate({ body: ideaSchema })],
  addNewIdea,
);
router.post(
  "/bulk",
  [userAuthMiddleware, celebrate({ body: bulkIdeaSchema })],
  addNewIdeas,
);
router.put("/:id", userAuthMiddleware, updateIdea);
router.delete("/:id", userAuthMiddleware, deleteAnIdea);

module.exports = router;
