import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { firstName, lastName, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New message from ${firstName} ${lastName}`,
      text: message,
      html: `
        <h3>New message from ${firstName} ${lastName}</h3>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your message has been received',
      text: 'Thank you for contacting us! We have received your message and will get back to you shortly.',
      html: `
        <h3>Thank you for contacting us!</h3>
        <p>We have received your message and will get back to you shortly.</p>
      `,
    });

    return NextResponse.json({ message: 'Emails sent successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
