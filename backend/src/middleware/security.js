import rateLimit from 'express-rate-limit';

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // Limit each IP to 8 contact submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many inquiries from this IP. Please wait 15 minutes or reach out directly via WhatsApp (+91 9599535114).',
  },
});

export function requireAdminAuth(req, res, next) {
  const expectedPassword = process.env.ADMIN_PASSWORD || 'akshat-studio-admin-2026';
  const authHeader = req.headers.authorization || '';
  const queryKey = req.query.key || req.headers['x-admin-key'] || '';

  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  const provided = bearerToken || queryKey;

  if (!provided || provided !== expectedPassword) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Valid admin password required.',
    });
  }

  next();
}

export async function verifyTurnstileToken(token, remoteip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return true; // Optional unless TURNSTILE_SECRET_KEY is configured

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip,
      }),
    });
    const data = await response.json();
    return Boolean(data.success);
  } catch (err) {
    console.warn('[Turnstile] Verification error:', err.message);
    return true;
  }
}
