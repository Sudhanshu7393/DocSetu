// src/app/api/contact/route.ts
// POST /api/contact — receives contact form submissions

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    // In production: send via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM!,
    //   to: "support@docsetu.in",
    //   subject: `[DocSetu Contact] ${subject}`,
    //   html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
    // });

    console.log("Contact form submission:", { name, email, subject });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We will respond within 24 hours.",
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
