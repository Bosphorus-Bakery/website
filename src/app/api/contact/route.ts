import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Escapes HTML special characters so form input can't break the email layout or inject markup
const escapeHtml = (value: string) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// When POST request is made to /api/contact, this function will be called
export async function POST(request: Request) {
  // Parses text body back into JSON object
  const formData = await request.json();

  // Send email using Resend API
  const { error } = await resend.emails.send({
    // Resolves to { data: { id: '...' } | null, error: SomeErrorType | null } shape
    from: 'Bosphorous Bakery <onboarding@resend.dev>', // sandbox sender for testing
    to: process.env.CONTACT_EMAIL_TO!,
    subject: `New contact form message from ${formData.firstName} ${formData.lastName}`,
    text: `
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Message: ${formData.message}
    `,
    html: `
      <div style="font-family: Georgia, 'Times New Roman', serif; background-color: #f5efe6; padding: 24px;">
        <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e6dccd;">
          <div style="background-color: #6b4226; padding: 20px 24px;">
            <h1 style="margin: 0; color: #f5efe6; font-size: 20px;">New Contact Form Message</h1>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 15px; color: #3a2e26;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 90px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0;">${escapeHtml(formData.firstName)} ${escapeHtml(formData.lastName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(formData.email)}" style="color: #6b4226;">${escapeHtml(formData.email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Phone</td>
                <td style="padding: 8px 0;">${escapeHtml(formData.phone)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(formData.message)}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f5efe6; padding: 12px 24px; font-size: 12px; color: #8a7a6d; text-align: center;">
            Sent from the Bosphorous Bakery website contact form
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: false, error }, { status: 500 });
}
