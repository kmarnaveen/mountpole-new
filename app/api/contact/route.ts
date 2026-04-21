import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { appendContactSubmission } from "@/lib/google-sheets";

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

type ContactSubmissionRecord = {
  id: number;
  submitted_at: string;
  source: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
  product: string | null;
  sku: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const supabaseContactTable =
  process.env.NEXT_PUBLIC_SUPABASE_CONTACT_TABLE?.trim() ||
  "contact_submissions";

let supabaseClient: SupabaseClient | null = null;

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

function getSupabaseClient() {
  const supabaseKey = supabaseServiceRoleKey || supabasePublishableKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not configured.");
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

export async function GET(req: NextRequest) {
  try {
    const limit = parseInteger(req.nextUrl.searchParams.get("limit"), 50, 1, 100);
    const offset = parseInteger(req.nextUrl.searchParams.get("offset"), 0, 0);
    const source = normalizeValue(req.nextUrl.searchParams.get("source") ?? undefined);
    const client = getSupabaseClient();

    let query = client.from(supabaseContactTable).select("*", { count: "exact" });

    if (source) {
      query = query.eq("source", source);
    }

    const { data, error, count } = await query
      .order("submitted_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return NextResponse.json(
      {
        data: (data ?? []) as ContactSubmissionRecord[],
        count: count ?? 0,
        limit,
        offset,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
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
