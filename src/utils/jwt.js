import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key-change-in-production';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

/**
 * Generate access token
 * @param {Object} payload - Token payload (user data)
 * @returns {string} JWT access token
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

/**
 * Generate refresh token
 * @param {Object} payload - Token payload (user data)
 * @returns {string} JWT refresh token
 */
export function generateRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  });
}

/**
 * Verify access token
 * @param {string} token - JWT access token
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Verify refresh token
 * @param {string} token - JWT refresh token
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

/**
 * Generate both access and refresh tokens
 * @param {Object} user - User object from database
 * @returns {Object} Object with accessToken and refreshToken
 */
export function generateTokens(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  };
}
