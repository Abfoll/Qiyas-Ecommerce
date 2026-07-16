import { ApiError } from '../utils/apiresponse.js';

/**
 * Generic middleware factory: pass it a Joi schema, it validates req.body.
 * Usage: router.post('/register', validate(registerSchema), authController.register)

 */
const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false, // collect ALL validation errors, not just the first
    stripUnknown: true, // remove fields not defined in schema
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/"/g, ''),
    }));
    return next(new ApiError(422, 'Validation failed', errors));
  }

  req[property] = value; // use the sanitized/validated value going forward
  next();
};

export default validate;
