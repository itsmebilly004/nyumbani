import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// All admin routes require authentication and admin role
router.use(requireAuth);
router.use(requireAdmin);

/**
 * GET /api/admin/applications
 * Get all applications with optional filters
 */
router.get('/applications', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { full_name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { country: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    // Get applications with user info
    const applications = await prisma.application.findMany({
      where,
      skip,
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Get total count
    const total = await prisma.application.count({ where });

    res.json({
      success: true,
      data: applications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch applications',
    });
  }
});

/**
 * GET /api/admin/applications/:id
 * Get a specific application by ID
 */
router.get('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch application',
    });
  }
});

/**
 * DELETE /api/admin/applications/:id
 * Delete an application
 */
router.delete('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    await prisma.application.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete application',
    });
  }
});

/**
 * GET /api/admin/users
 * Get all users with optional filters
 */
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build where clause
    const where = {};
    if (role) {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get users with application count
    const users = await prisma.user.findMany({
      where,
      skip,
      take: parseInt(limit),
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        created_at: true,
        updated_at: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Get total count
    const total = await prisma.user.count({ where });

    res.json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
});

/**
 * GET /api/admin/users/:id
 * Get a specific user with their applications
 */
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        created_at: true,
        updated_at: true,
        applications: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    });
  }
});

/**
 * PATCH /api/admin/users/:id/role
 * Update a user's role
 */
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"',
      });
    }

    // Prevent admin from changing their own role
    if (id === req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You cannot change your own role',
      });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: user,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user role',
    });
  }
});

/**
 * DELETE /api/admin/users/:id
 * Delete a user (soft delete or hard delete)
 */
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (id === req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You cannot delete your own account',
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    });
  }
});

/**
 * GET /api/admin/stats
 * Get dashboard statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalApplications,
      adminUsers,
      recentApplications,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.user.count({ where: { role: 'admin' } }),
      prisma.application.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
          },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalApplications,
        adminUsers,
        regularUsers: totalUsers - adminUsers,
        recentApplications,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
    });
  }
});

export default router;
