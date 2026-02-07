const { Joi } = require("celebrate");

const baseText = Joi.string().trim().min(3);

const ideaSchema = Joi.object({
  text: baseText.required(),
  title: baseText.required(),
}).required().options({ stripUnknown: true });

const bulkIdeaSchema = Joi.array().items(ideaSchema).min(1).required();

module.exports = { ideaSchema, bulkIdeaSchema };
