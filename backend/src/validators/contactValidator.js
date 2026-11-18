import { z } from 'zod';

const ALLOWED_SERVICES = [
  'Website Design & Development',
  'Custom CRM Systems',
  'Custom Software & Web Apps',
  'Branding & Identity',
  'Product Redesign & Changes',
  'Maintenance & Support',
];

// Strip HTML tags & dangerous characters to prevent XSS
export function sanitizeText(input = '') {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long')),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Please enter a valid email address')
    .max(160),
  phone: z
    .string()
    .optional()
    .default('')
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .max(30, 'Phone number is too long')
        .refine((val) => !val || /^[+\d\s()-]{7,25}$/.test(val), 'Invalid phone format')
    ),
  company: z
    .string()
    .optional()
    .default('')
    .transform(sanitizeText)
    .pipe(z.string().max(120, 'Company name is too long')),
  services: z
    .array(z.string().transform(sanitizeText))
    .min(1, 'Please select at least one service')
    .max(6)
    .refine(
      (arr) => arr.every((s) => ALLOWED_SERVICES.includes(s)),
      'One or more selected services are invalid'
    ),
  budget: z
    .string()
    .transform(sanitizeText)
    .pipe(z.string().min(2, 'Please select a budget range').max(60)),
  message: z
    .string()
    .transform(sanitizeText)
    .pipe(
      z
        .string()
        .min(15, 'Please share at least 15 characters about your project')
        .max(4000, 'Project details must be under 4000 characters')
    ),
  // Honeypot field — must be empty
  website_url_hp: z.string().optional().default(''),
  turnstileToken: z.string().optional().default(''),
});
