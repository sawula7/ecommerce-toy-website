import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_REGION ?? "ap-southeast-1",
  ...(process.env.AWS_ACCESS_KEY_ID
    ? {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      }
    : {}),
});

const FROM = process.env.SES_FROM_EMAIL ?? "noreply@toyhouse.lk";

export async function sendPasswordResetEmail(toEmail: string, resetUrl: string) {
  await ses.send(
    new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: "Reset your Toyhouse.lk password", Charset: "UTF-8" },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,.08);overflow:hidden;">
        <tr><td style="padding:32px 40px 0;">
          <p style="margin:0;font-size:28px;">🧸</p>
          <h1 style="margin:8px 0 4px;font-size:20px;color:#111;">Reset your password</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            We received a request to reset the password for your Toyhouse.lk account.
            Click the button below — this link expires in <strong>15 minutes</strong>.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:#f97316;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:12px 28px;border-radius:10px;">
            Reset Password
          </a>
          <p style="margin:24px 0 0;font-size:12px;color:#9ca3af;">
            If you did not request this, you can safely ignore this email.
            Your password will not change.
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;border-top:1px solid #f3f4f6;margin-top:24px;">
          <p style="margin:0;font-size:11px;color:#d1d5db;">
            Or copy this link: <span style="color:#6b7280;">${resetUrl}</span>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
          },
          Text: {
            Charset: "UTF-8",
            Data: `Reset your Toyhouse.lk password\n\nClick this link to reset your password (expires in 15 minutes):\n${resetUrl}\n\nIf you did not request this, ignore this email.`,
          },
        },
      },
    })
  );
}
