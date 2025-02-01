import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { feedbackType, subject, description, email } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'your_email@example.com',
      subject: `New feedback: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 24px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #ffffff;
              }
              .header {
                border-bottom: 2px solid #000000;
                padding-bottom: 16px;
                margin-bottom: 24px;
              }
              .header h2 {
                margin: 0;
                color: #000000;
                font-size: 24px;
                font-weight: 600;
              }
              .content {
                color: #1a1a1a;
              }
              .field {
                margin-bottom: 20px;
                padding: 16px;
                background-color: #fafafa;
                border: 1px solid #e0e0e0;
              }
              .field strong {
                display: block;
                margin-bottom: 8px;
                color: #000000;
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Feedback</h2>
              </div>
              <div class="content">
                <div class="field">
                  <strong>Type</strong>
                  ${feedbackType}
                </div>
                <div class="field">
                  <strong>Subject</strong>
                  ${subject}
                </div>
                <div class="field">
                  <strong>Description</strong>
                  ${description}
                </div>
                <div class="field">
                  <strong>Sender's Email</strong>
                  ${email || 'Not specified'}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке feedback' },
      { status: 500 }
    );
  }
} 