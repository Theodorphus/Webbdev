import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Alla fält måste fyllas i.' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'Webbdev Studio <hej@webbdev.se>',
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
    return NextResponse.json({ error: 'Kunde inte skicka meddelandet.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
