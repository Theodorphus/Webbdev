import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Server misconfiguration.' }, { status: 500 });
  }

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Alla fält måste fyllas i.' }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: 'Webbdev Studio <onboarding@resend.dev>',
    to: 'webbdevstudio@gmail.com',
    replyTo: email,
    subject: `Ny förfrågan från ${name}`,
    html: `
      <p><strong>Namn:</strong> ${name}</p>
      <p><strong>E-post:</strong> ${email}</p>
      <p><strong>Meddelande:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Email sent:', data?.id);
  return NextResponse.json({ ok: true });
}
