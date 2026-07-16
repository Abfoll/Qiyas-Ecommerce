import Joi from 'joi';

const createPostSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  content: Joi.string().trim().min(20).required(),
  excerpt: Joi.string().trim().max(300).allow('', null),
  tags: Joi.array().items(Joi.string().trim()),
  isPublished: Joi.boolean(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200),
  content: Joi.string().trim().min(20),
  excerpt: Joi.string().trim().max(300).allow('', null),
  tags: Joi.array().items(Joi.string().trim()),
  isPublished: Joi.boolean(),
}).min(1);

const createCommentSchema = Joi.object({
  comment: Joi.string().trim().min(2).max(1000).required(),
});

export { createPostSchema, updatePostSchema, createCommentSchema };
