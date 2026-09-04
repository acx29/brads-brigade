import { Resend } from 'resend';

// Until a domain is verified in Resend, only this sender is allowed, and it can
// only deliver to the email address on the Resend account itself.
const DEFAULT_FROM = 'Brad’s Brigade <onboarding@resend.dev>';

const SUBJECT = 'You’re on the Brad’s Brigade waitlist';

const TEXT = `You’re on the list. We’ll be in touch.

Brad’s Brigade is the home base for firetruck musters: register for musters in a few clicks, keep every truck’s documents in one place, and track what your chapter raises for MDA.

We’ll send one email when your chapter goes live. Nothing else until then.

If you didn’t sign up, you can ignore this email.

Brad’s Brigade`;

const HTML = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#F6F3EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#24201B;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F6F3EC;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FCFBF9;border:1px solid #D8D1C5;border-radius:12px;">
            <tr>
              <td style="padding:32px 32px 8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#24201B;">Brad’s Brigade</td>
            </tr>
            <tr>
              <td style="padding:8px 32px 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#24201B;">You’re on the list.</td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;font-size:17px;line-height:1.6;color:#57514A;">
                Brad’s Brigade is the home base for firetruck musters: register for musters in a few clicks,
                keep every truck’s documents in one place, and track what your chapter raises for MDA.
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;font-size:17px;line-height:1.6;color:#57514A;">
                We’ll send one email when your chapter goes live. Nothing else until then.
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px;font-size:14px;line-height:1.6;color:#7A7268;">
                If you didn’t sign up, you can ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

/**
 * Sends the waitlist confirmation email through Resend.
 *
 * If RESEND_API_KEY is not set the function logs a warning and returns, so the
 * signup flow still works in environments where email is not configured yet.
 * Any Resend API error is thrown so the caller can decide how to handle it.
 */
export async function sendWaitlistConfirmation(to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not set; skipping waitlist confirmation email');
    return;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM || DEFAULT_FROM,
    to,
    subject: SUBJECT,
    text: TEXT,
    html: HTML,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}
