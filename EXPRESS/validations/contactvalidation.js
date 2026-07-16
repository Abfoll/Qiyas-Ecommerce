import Joi from 'joi';

const contactMessageSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  subject: Joi.string().trim().min(3).max(150).required(),
  message: Joi.string().trim().min(10).max(2000).required(),
});

export { contactMessageSchema };
