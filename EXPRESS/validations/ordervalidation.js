import Joi from 'joi';

const addCartItemSchema = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).default(1),
});

const updateCartItemSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

const createOrderSchema = Joi.object({
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().allow('', null),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().allow('', null),
  }).required(),
  paymentMethod: Joi.string().valid('stripe', 'cash_on_delivery').required(),
  couponCode: Joi.string().trim().uppercase().allow('', null),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required(),
  trackingNumber: Joi.string().allow('', null),
});

export { addCartItemSchema, updateCartItemSchema, createOrderSchema, updateOrderStatusSchema };
