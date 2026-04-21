import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type ContactSubmissionInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source: string;
  product?: string;
  sku?: string;
};

type NormalizedContactSubmission = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  source: string;
  product: string;
  sku: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseContactTable =
  process.env.NEXT_PUBLIC_SUPABASE_CONTACT_TABLE?.trim() ||
  "contact_submissions";

let supabaseClient: SupabaseClient | null = null;

function normalizeValue(value?: string) {
  return value?.trim() ?? "";
}

function normalizeSubmission(
  input: ContactSubmissionInput,
): NormalizedContactSubmission {
  return {
    name: normalizeValue(input.name),
    email: normalizeValue(input.email),
    company: normalizeValue(input.company),
    phone: normalizeValue(input.phone),
    message: normalizeValue(input.message),
    source: normalizeValue(input.source),
    product: normalizeValue(input.product),
    sku: normalizeValue(input.sku),
  };
}

function validateSubmission(input: NormalizedContactSubmission) {
  if (!input.name || !input.email || !input.message) {
    throw new Error("Name, email, and message are required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    throw new Error("Invalid email address.");
  }
}

function getSupabaseClient() {
  if (!supabaseUrl || !supabasePublishableKey) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

async function submitViaApiRoute(input: NormalizedContactSubmission) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Failed to send");
  }
}

async function submitViaSupabase(input: NormalizedContactSubmission) {
  const client = getSupabaseClient();
  if (!client) {
    await submitViaApiRoute(input);
    return;
  }

  const { error } = await client.from(supabaseContactTable).insert({
    submitted_at: new Date().toISOString(),
    source: input.source,
    name: input.name,
    email: input.email,
    company: input.company || null,
    phone: input.phone || null,
    message: input.message,
    product: input.product || null,
    sku: input.sku || null,
    referrer: window.location.href,
    user_agent: navigator.userAgent,
  });

  if (error) {
    throw new Error(error.message || "Failed to send");
  }
}

export async function submitContactSubmission(input: ContactSubmissionInput) {
  const normalizedInput = normalizeSubmission(input);
  validateSubmission(normalizedInput);
  await submitViaSupabase(normalizedInput);
}
