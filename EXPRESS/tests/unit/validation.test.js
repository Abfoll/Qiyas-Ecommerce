import { registerSchema, loginSchema } from '../../validations/authvalidation.js';
import { createProductSchema } from '../../validations/productvalidation.js';

describe('authValidation', () => {
  it('accepts a valid registration payload', () => {
    const { error } = registerSchema.validate({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    });
    expect(error).toBeUndefined();
  });

  it('rejects a password shorter than 8 characters', () => {
    const { error } = registerSchema.validate({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'short',
    });
    expect(error).toBeDefined();
  });

  it('rejects an invalid email', () => {
    const { error } = loginSchema.validate({ email: 'not-an-email', password: 'password123' });
    expect(error).toBeDefined();
  });
});

describe('productValidation', () => {
  it('requires a valid 24-char hex category id', () => {
    const { error } = createProductSchema.validate({
      name: 'Test Product',
      description: 'A perfectly good description of the product.',
      price: 10,
      category: 'not-a-valid-id',
      stock: 5,
    });
    expect(error).toBeDefined();
  });

  it('accepts a valid product payload', () => {
    const { error } = createProductSchema.validate({
      name: 'Test Product',
      description: 'A perfectly good description of the product.',
      price: 10,
      category: '64f0000000000000000000aa',
      stock: 5,
    });
    expect(error).toBeUndefined();
  });
});
