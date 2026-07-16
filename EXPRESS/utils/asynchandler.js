/**
 * Wraps an async controller function so we don't need try/catch
 * in every single controller. Any rejected promise / thrown error
 * is automatically forwarded to next(err) -> our global errorHandler.
 *
 
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
