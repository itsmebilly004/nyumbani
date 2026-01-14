import { verifyAccessToken } from '../utils/jwt.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Middleware to authenticate requests using JWT
 * Expects token in Authorization header: "Bearer <token>"
 */
export async function authenticate(req, res, next) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyAccessToken(token);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        created_at: true
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please log in again.'
      });
    }

    // Attach user to request object
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please log in again.'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired. Please log in again.'
      });
    }

    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed.'
    });
  }
}

/**
 * Middleware to check if user has required role
 * Must be used after authenticate middleware
 * @param {string[]} roles - Array of allowed roles
 */
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource.'
      });
    }

    next();
  };
}

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't block request if not
 */
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        created_at: true
      }
    });

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
}

/**
 * Shorthand for authenticate middleware
 */
export const requireAuth = authenticate;

/**
 * Middleware to require admin role
 * Must be used after requireAuth
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required. You do not have permission to access this resource.'
    });
  }

  next();
}
