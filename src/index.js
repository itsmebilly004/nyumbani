import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { optionalAuth } from './middleware/auth.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Nyumbani Backend API',
    status: 'active',
    version: '2.0.0',
    features: ['Authentication', 'User Management', 'Admin Panel', 'Applications'],
    endpoints: {
      health: 'GET /',
      auth: 'POST /api/auth/*',
      admin: 'GET /api/admin/*',
      submitApplication: 'POST /applications'
    }
  });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// Validation rules for application submission
const applicationValidation = [
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Country must be between 2 and 100 characters'),
  
  body('relationship_to_kenya')
    .trim()
    .notEmpty()
    .withMessage('Relationship to Kenya is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Relationship to Kenya must be between 2 and 500 characters'),
  
  body('interest_area')
    .trim()
    .notEmpty()
    .withMessage('Interest area is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Interest area must be between 2 and 500 characters')
];

// POST /applications - Submit a new application
// Authentication is optional - if user is logged in, link application to their account
app.post('/applications', optionalAuth, applicationValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Extract validated data
    const { full_name, email, country, relationship_to_kenya, interest_area } = req.body;

    // Save to database using Prisma
    // If user is authenticated, link application to their account
    const application = await prisma.application.create({
      data: {
        full_name,
        email,
        country,
        relationship_to_kenya,
        interest_area,
        user_id: req.user ? req.user.id : null
      }
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: application.id,
        created_at: application.created_at
      }
    });

  } catch (error) {
    console.error('Error creating application:', error);
    
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your application',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing server...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing server...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nyumbani Backend API running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/`);
});
