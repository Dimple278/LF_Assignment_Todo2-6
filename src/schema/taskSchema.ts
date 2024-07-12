import Joi from "joi";

export const taskIdParamSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    "number.base": "Task ID must be a number",
    "number.integer": "Task ID must be an integer",
    "any.required": "Task ID is required",
  }),
});

export const createTaskBodySchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.base": "Title must be a string",
  }),
  completed: Joi.boolean().optional().messages({
    "boolean.base": "Completed must be a boolean",
  }),
}).options({
  stripUnknown: true,
});

export const updateTaskBodySchema = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Title must be a string",
  }),
  completed: Joi.boolean().optional().messages({
    "boolean.base": "Completed must be a boolean",
  }),
}).options({
  stripUnknown: true,
});
