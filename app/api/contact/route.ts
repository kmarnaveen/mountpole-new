import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Input validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 },
      );
    }

    // TODO: Integrate an email service here, e.g.:
    // import { Resend } from "resend"
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "noreply@mountpole.com",
    //   to: "sales@mountpole.com",
    //   subject: `Quote request from ${name}`,
    //   text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`,
    // })

    console.log("[Contact Form Submission]", {
      name: body.name,
      email: body.email,
      company: body.company ?? "",
      phone: body.phone ?? "",
      message: body.message,
      product: body.product ?? "",
      sku: body.sku ?? "",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
