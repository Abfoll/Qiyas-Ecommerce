import Joi from 'joi';

const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().trim().max(500).allow('', null),
  parent: Joi.string().hex().length(24).allow(null),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  description: Joi.string().trim().max(500).allow('', null),
  parent: Joi.string().hex().length(24).allow(null),
  isActive: Joi.boolean(),
}).min(1);

export { createCategorySchema, updateCategorySchema };
