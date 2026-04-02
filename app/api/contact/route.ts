import { NextResponse } from "next/server";
import { appendContactSubmission } from "@/lib/google-sheets";

export const runtime = "nodejs";

type ContactSubmission = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  product?: string;
  sku?: string;
  source?: string;
};

function normalizeValue(value?: string) {
  return value?.trim() ?? "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactSubmission;
    const name = normalizeValue(body.name);
    const email = normalizeValue(body.email);
    const company = normalizeValue(body.company);
    const phone = normalizeValue(body.phone);
    const message = normalizeValue(body.message);
    const product = normalizeValue(body.product);
    const sku = normalizeValue(body.sku);
    const source =
      normalizeValue(body.source) || (product || sku ? "product-quote" : "contact-form");

    // Input validation
    if (!name || !email || !message) {
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

    const submittedAt = new Date().toISOString();
    await appendContactSubmission({
      submittedAt,
      source,
      name,
      email,
      company,
      phone,
      message,
      product,
      sku,
      referrer: req.headers.get("referer") ?? "",
      userAgent: req.headers.get("user-agent") ?? "",
    });

    console.log("[Contact Form Submission]", {
      name,
      email,
      company,
      phone,
      message,
      product,
      sku,
      source,
      timestamp: submittedAt,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact Form Submission Error]", error);
    return NextResponse.json(
      { error: "Failed to send your request. Please try again." },
      { status: 500 },
    );
  }
}
