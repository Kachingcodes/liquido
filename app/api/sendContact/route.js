// app/api/sendContact/route.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, contact, social, message } = await req.json();
    console.log("API route hit");


    await resend.emails.send({
      from: "onboarding@resend.dev", // must be a verified sender on Resend
      to: "getliquido@gmail.com", // multiple admins
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Social Handle:</strong> ${social || "N/A"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
