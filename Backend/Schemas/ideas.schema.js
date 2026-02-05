const { Joi } = require("celebrate");

const baseText = Joi.string().trim().min(3);

const ideaSchema = Joi.object({
  text: baseText.required(),
  title: baseText.required(),
}).required().options({ stripUnknown: true });

module.exports = { ideaSchema };
