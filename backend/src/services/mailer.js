import nodemailer from 'nodemailer';

const OWNER_EMAIL = process.env.NOTIFICATION_EMAIL || 'singhakshat875@gmail.com';

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_USER || !SMTP_PASS || SMTP_PASS === 'your_16_char_gmail_app_password') {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
    port: Number(SMTP_PORT) || 465,
    secure: SMTP_SECURE !== 'false',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

export async function sendLeadNotifications(lead) {
  const transporter = createTransporter();
  const servicesList = lead.services.join(', ');

  const ownerMailOptions = {
    from: `"Akshat Portfolio Bot" <${process.env.SMTP_USER || OWNER_EMAIL}>`,
    to: OWNER_EMAIL,
    replyTo: lead.email,
    subject: `⚡ New Project Inquiry: ${lead.name} (${lead.budget})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0c; color: #f4f4f6; padding: 32px; border-radius: 16px; border: 1px solid #222;">
        <div style="display:inline-block; background:#d4ff00; color:#09090b; font-weight:700; font-size:12px; padding:4px 10px; border-radius:99px; text-transform:uppercase; letter-spacing:0.08em;">
          New Portfolio Lead
        </div>
        <h2 style="margin: 16px 0 8px; font-size: 24px; color: #ffffff;">${lead.name} wants to work with you</h2>
        <p style="margin: 0 0 24px; color: #a1a1aa; font-size: 14px;">Submitted on ${new Date(lead.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #a1a1aa; width: 140px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff;"><a href="mailto:${lead.email}" style="color:#d4ff00;">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #a1a1aa;">Phone / WhatsApp</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff;">${lead.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #a1a1aa;">Company</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff;">${lead.company || 'Independent / Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #a1a1aa;">Services Needed</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #d4ff00; font-weight: 600;">${servicesList}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #a1a1aa;">Budget Range</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222; color: #fff; font-weight: 600;">${lead.budget}</td>
          </tr>
        </table>

        <div style="background: #141418; padding: 20px; border-radius: 12px; border: 1px solid #27272a;">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #a1a1aa; margin-bottom: 8px;">Project Brief</div>
          <p style="margin: 0; color: #f4f4f6; line-height: 1.6; white-space: pre-wrap;">${lead.message}</p>
        </div>

        <div style="margin-top: 24px; display: flex; gap: 12px;">
          <a href="mailto:${lead.email}?subject=Re: Your project inquiry with Akshat Singh" style="background: #d4ff00; color: #09090b; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 700; font-size: 14px;">Reply via Email</a>
          ${
            lead.phone
              ? `<a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="background: #27272a; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-left: 10px;">Message on WhatsApp</a>`
              : ''
          }
        </div>
      </div>
    `,
  };

  const clientAutoReplyOptions = {
    from: `"Akshat Singh — Studio" <${process.env.SMTP_USER || OWNER_EMAIL}>`,
    to: lead.email,
    replyTo: OWNER_EMAIL,
    subject: `Got your message, ${lead.name.split(' ')[0]}! — Akshat Singh`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0c; color: #f4f4f6; padding: 36px; border-radius: 16px; border: 1px solid #222;">
        <h1 style="margin: 0 0 12px; font-size: 26px; color: #ffffff; letter-spacing: -0.02em;">AKSHAT SINGH<span style="color:#d4ff00;">.</span></h1>
        <p style="color: #d4d4d8; font-size: 16px; line-height: 1.6;">Hi ${lead.name.split(' ')[0]},</p>
        <p style="color: #a1a1aa; font-size: 15px; line-height: 1.65;">
          Thank you for reaching out! I've received your project inquiry regarding <strong style="color:#fff;">${servicesList}</strong> (${lead.budget}) and I'm reviewing your brief now.
        </p>
        <p style="color: #a1a1aa; font-size: 15px; line-height: 1.65;">
          I typically respond within <strong style="color:#d4ff00;">6–12 business hours</strong> with initial thoughts, timeline estimates, and a link to book a quick discovery call.
        </p>
        <div style="margin: 28px 0; padding: 18px; border-radius: 12px; background: #141418; border: 1px solid #27272a;">
          <div style="font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;">Need an urgent response?</div>
          <p style="margin: 0; font-size: 14px; color: #e4e4e7;">
            WhatsApp / Call directly: <a href="https://wa.me/919599535114" style="color: #d4ff00; text-decoration: none; font-weight: 600;">+91 9599535114</a>
          </p>
        </div>
        <p style="color: #71717a; font-size: 13px; margin-top: 32px;">
          Best regards,<br/>
          <strong style="color: #ffffff;">Akshat Singh</strong><br/>
          Freelance Full-Stack Developer & Designer • India (Working Worldwide)
        </p>
      </div>
    `,
  };

  const results = { emailSent: false, autoReplySent: false, telegramSent: false };

  if (transporter) {
    try {
      await transporter.sendMail(ownerMailOptions);
      results.emailSent = true;
      await transporter.sendMail(clientAutoReplyOptions);
      results.autoReplySent = true;
    } catch (err) {
      console.error('[Mailer] SMTP error:', err.message);
    }
  } else {
    console.log('[Mailer] SMTP credentials not set — logged email payload for', lead.email);
  }

  // Optional Telegram Instant Alert
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    try {
      const text = `🚀 *New Portfolio Lead*\n*Name:* ${lead.name}\n*Email:* ${lead.email}\n*Phone:* ${lead.phone || 'N/A'}\n*Services:* ${servicesList}\n*Budget:* ${lead.budget}\n*Brief:* ${lead.message}`;
      await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'Markdown',
        }),
      });
      results.telegramSent = true;
    } catch (err) {
      console.warn('[Telegram] Alert failed:', err.message);
    }
  }

  return results;
}
