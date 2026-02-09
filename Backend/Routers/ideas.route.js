const express = require("express");
const router = express.Router();
const { ideaSchema, bulkIdeaSchema } = require("../Schemas/ideas.schema");
const { celebrate } = require("celebrate");
const userAuthMiddleware = require("../Middlewares/Auth/users.auth");
const checkObjectId = require("../Middlewares/Validators/validate_Obj_id");

const {
  getUserIdeas,
  addNewIdea,
  addNewIdeas,
  updateIdea,
  deleteAnIdea,
  getOneIdea,
} = require("../Controllers/ideas.controller");

router.get("/", [userAuthMiddleware], getUserIdeas);
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
