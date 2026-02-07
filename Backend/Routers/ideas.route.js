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
const checkObjectId = require("../Validators/validate_Obj_id");

router.get("/", [checkObjectId, userAuthMiddleware], getUserIdeas);
router.get("/:id", [checkObjectId, userAuthMiddleware], getOneIdea);
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
router.put("/:id", [checkObjectId, userAuthMiddleware], updateIdea);
router.delete("/:id", [checkObjectId, userAuthMiddleware], deleteAnIdea);

module.exports = router;
