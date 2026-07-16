import jwt from 'jsonwebtoken';

/**
 * Signs a JWT that encodes the user's id + role.
 * We keep the payload minimal on purpose — never put sensitive data
 * (like password hashes) inside a JWT, since it's just base64, not encrypted.
 */
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export default generateToken;
