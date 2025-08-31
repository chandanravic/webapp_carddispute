import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware/auth';
import { StripeService } from '../services/stripe';
import { PayPalService } from '../services/paypal';

const router = Router();
const prisma = new PrismaClient();
const stripeService = new StripeService();
const paypalService = new PayPalService();

// Get all disputes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const disputes = await prisma.dispute.findMany({
      include: {
        assignedTo: true,
        rebuttals: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(disputes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching disputes' });
  }
});

// Get dispute by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const dispute = await prisma.dispute.findUnique({
      where: { id },
      include: {
        assignedTo: true,
        rebuttals: true
      }
    });
    
    if (!dispute) {
      return res.status(404).json({ message: 'Dispute not found' });
    }
    
    res.json(dispute);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dispute' });
  }
});

// Sync disputes from payment processors
router.post('/sync', authenticateToken, requireRole(['ADMIN', 'MANAGER']), async (req, res) => {
  try {
    // Sync from Stripe
    const stripeDisputes = await stripeService.getDisputes();
    // Sync from PayPal
    const paypalDisputes = await paypalService.getDisputes();
    
    res.json({ 
      message: 'Sync completed',
      stripeCount: stripeDisputes.length,
      paypalCount: paypalDisputes.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error syncing disputes' });
  }
});

export default router;
