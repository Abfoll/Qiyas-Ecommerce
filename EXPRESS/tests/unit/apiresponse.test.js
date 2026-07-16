import { ApiError } from '../../utils/apiresponse.js';

describe('ApiError', () => {
  it('carries the given status code and message', () => {
    const err = new ApiError(404, 'Not found');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not found');
    expect(err.isOperational).toBe(true);
  });

  it('attaches a list of field errors when provided', () => {
    const errors = [{ field: 'email', message: 'Email is required' }];
    const err = new ApiError(422, 'Validation failed', errors);
    expect(err.errors).toEqual(errors);
  });
});
