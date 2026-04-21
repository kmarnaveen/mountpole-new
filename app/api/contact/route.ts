import { NextRequest, NextResponse } from "next/server";
import { appendContactSubmission } from "@/lib/google-sheets";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { listContactSubmissions } from "@/lib/contact-records";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function parseInteger(
  value: string | null,
  fallback: number,
  minimum: number,
  maximum?: number,
) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < minimum) {
    return fallback;
  }

  if (typeof maximum === "number") {
    return Math.min(parsed, maximum);
  }

  return parsed;
}

export async function GET(req: NextRequest) {
  try {
    if (!(await getAdminSessionFromRequest(req))) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const limit = parseInteger(
      req.nextUrl.searchParams.get("limit"),
      50,
      1,
      100,
    );
    const offset = parseInteger(req.nextUrl.searchParams.get("offset"), 0, 0);
    const query = normalizeValue(
      req.nextUrl.searchParams.get("q") ?? undefined,
    );
    const source = normalizeValue(
      req.nextUrl.searchParams.get("source") ?? undefined,
    );
    const status = normalizeValue(
      req.nextUrl.searchParams.get("status") ?? undefined,
    );
    const followUpStage = normalizeValue(
      req.nextUrl.searchParams.get("followUpStage") ?? undefined,
    );
    const result = await listContactSubmissions({
      limit,
      offset,
      query,
      source,
      status,
      followUpStage,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[Contact Submission List Error]", error);
    return NextResponse.json(
      { error: "Failed to load submitted contacts." },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
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
      normalizeValue(body.source) ||
      (product || sku ? "product-quote" : "contact-form");

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
