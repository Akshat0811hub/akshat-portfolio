import express from 'express';
import { contactSchema } from '../validators/contactValidator.js';
import { LeadRepository } from '../models/Lead.js';
import { sendLeadNotifications } from '../services/mailer.js';
import {
  contactRateLimiter,
  requireAdminAuth,
  verifyTurnstileToken,
} from '../middleware/security.js';

const router = express.Router();

/**
 * POST /api/contact
 * Validates, sanitizes, checks honeypot/Turnstile, stores in DB, and emails Akshat + client.
 */
router.post('/contact', contactRateLimiter, async (req, res) => {
  try {
    // 1. Honeypot spam check (bots fill hidden fields)
    if (req.body?.website_url_hp && String(req.body.website_url_hp).trim().length > 0) {
      // Return fake 200 to fool bots without storing spam
      return res.status(200).json({
        success: true,
        message: 'Inquiry received successfully.',
      });
    }

    // 2. Validate & sanitize payload with Zod
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError =
        Object.values(fieldErrors).flat()[0] || 'Please check your form inputs and try again.';
      return res.status(400).json({
        success: false,
        error: firstError,
        fieldErrors,
      });
    }

    const data = parsed.data;

    // 3. Optional Cloudflare Turnstile check
    const ipAddress =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
    const turnstileValid = await verifyTurnstileToken(data.turnstileToken, ipAddress);
    if (!turnstileValid) {
      return res.status(400).json({
        success: false,
        error: 'Spam protection verification failed. Please refresh and try again.',
      });
    }

    // 4. Save lead to MongoDB Atlas (or local persistent store fallback)
    const savedLead = await LeadRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      services: data.services,
      budget: data.budget,
      message: data.message,
      ipAddress,
      userAgent: req.headers['user-agent'] || '',
    });

    // 5. Dispatch email to singhakshat875@gmail.com + client auto-reply asynchronously
    const notificationStatus = await sendLeadNotifications(savedLead);

    return res.status(201).json({
      success: true,
      message:
        'Thank you! Your project brief has been received. Expect a personal reply within 6–12 hours.',
      leadId: savedLead._id,
      notifications: notificationStatus,
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return res.status(500).json({
      success: false,
      error:
        'Something went wrong on our end. Please message directly on WhatsApp (+91 9599535114) or email singhakshat875@gmail.com.',
    });
  }
});

/**
 * GET /api/admin/leads
 * Password-protected endpoint to inspect all captured leads.
 */
router.get('/admin/leads', requireAdminAuth, async (_req, res) => {
  try {
    const leads = await LeadRepository.findAll();
    return res.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error('[Admin Leads Error]:', error);
    return res.status(500).json({ success: false, error: 'Failed to load leads.' });
  }
});

/**
 * PATCH /api/admin/leads/:id
 * Update lead status (new, contacted, in-discussion, archived)
 */
router.patch('/admin/leads/:id', requireAdminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'in-discussion', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value.' });
    }
    const updated = await LeadRepository.updateStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Lead not found.' });
    }
    return res.json({ success: true, lead: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update lead status.' });
  }
});

/**
 * DELETE /api/admin/leads/:id
 */
router.delete('/admin/leads/:id', requireAdminAuth, async (req, res) => {
  try {
    await LeadRepository.remove(req.params.id);
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete lead.' });
  }
});

export default router;
