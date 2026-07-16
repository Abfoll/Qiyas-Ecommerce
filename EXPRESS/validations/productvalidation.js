import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().trim().min(10).required(),
  price: Joi.number().min(0).required(),
  comparePrice: Joi.number().min(0).allow(null),
  category: Joi.string().hex().length(24).required(),
  brand: Joi.string().trim().allow('', null),
  sku: Joi.string().trim().allow('', null),
  stock: Joi.number().integer().min(0).required(),
  variants: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      options: Joi.array().items(Joi.string()).min(1).required(),
    })
  ),
  isFeatured: Joi.boolean(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(150),
  description: Joi.string().trim().min(10),
  price: Joi.number().min(0),
  comparePrice: Joi.number().min(0).allow(null),
  category: Joi.string().hex().length(24),
  brand: Joi.string().trim().allow('', null),
  sku: Joi.string().trim().allow('', null),
  stock: Joi.number().integer().min(0),
  variants: Joi.array().items(
    Joi.object({ name: Joi.string().required(), options: Joi.array().items(Joi.string()).min(1).required() })
  ),
  isFeatured: Joi.boolean(),
  isActive: Joi.boolean(),
}).min(1);

const createReviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().min(3).max(1000).required(),
});

export { createProductSchema, updateProductSchema, createReviewSchema };
