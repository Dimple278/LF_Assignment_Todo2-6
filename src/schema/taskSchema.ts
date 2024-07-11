import Joi from "joi";

export const createTaskBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
  }),
  completed: Joi.boolean().optional(),
}).options({
  stripUnknown: true,
});

export const updateTaskBodySchema = Joi.object({
  title: Joi.string().optional(),
  completed: Joi.boolean().optional(),
}).options({
  stripUnknown: true,
});
