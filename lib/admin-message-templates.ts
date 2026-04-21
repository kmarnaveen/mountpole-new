import "server-only";

import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const MESSAGE_TEMPLATE_CHANNEL_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type MessageTemplateChannel =
  (typeof MESSAGE_TEMPLATE_CHANNEL_OPTIONS)[number]["value"];

export type AdminMessageTemplateRecord = {
  id: number;
  channel: MessageTemplateChannel;
  name: string;
  subject: string | null;
  body: string;
  created_at: string;
  updated_at: string;
  created_by_admin_user_id: number | null;
  created_by_email: string | null;
  updated_by_admin_user_id: number | null;
  updated_by_email: string | null;
};

type CreateAdminMessageTemplateInput = {
  channel?: string;
  name?: string;
  subject?: string | null;
  body?: string;
  adminUserId?: number | null;
  adminEmail?: string | null;
};

type UpdateAdminMessageTemplateInput = CreateAdminMessageTemplateInput & {
  id: number;
};

const supabaseAdminTemplateTable = "admin_message_templates";
const adminTemplateSelectFields =
  "id, channel, name, subject, body, created_at, updated_at, created_by_admin_user_id, created_by_email, updated_by_admin_user_id, updated_by_email";

function normalizeTemplateChannel(value?: string) {
  return (
    MESSAGE_TEMPLATE_CHANNEL_OPTIONS.find((option) => option.value === value)
      ?.value ?? null
  );
}

function normalizeTemplateText(value?: string | null) {
  return value?.replace(/\r\n?/g, "\n").trim() ?? "";
}

function normalizeTemplateInput(input: CreateAdminMessageTemplateInput) {
  const channel = normalizeTemplateChannel(input.channel);
  const name = normalizeTemplateText(input.name);
  const subject = normalizeTemplateText(input.subject);
  const body = normalizeTemplateText(input.body);

  if (!channel) {
    throw new Error("A valid template channel is required.");
  }

  if (!name) {
    throw new Error("Template name is required.");
  }

  if (!body) {
    throw new Error("Template body is required.");
  }

  if (channel === "email" && !subject) {
    throw new Error("Email templates require a subject.");
  }

  return {
    channel,
    name,
    subject: channel === "email" ? subject : null,
    body,
    updatedByAdminUserId: input.adminUserId ?? null,
    updatedByEmail: input.adminEmail?.trim().toLowerCase() ?? null,
  };
}

export async function listAdminMessageTemplates() {
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseAdminTemplateTable)
    .select(adminTemplateSelectFields)
    .order("updated_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as AdminMessageTemplateRecord[];
}

export async function createAdminMessageTemplate(
  input: CreateAdminMessageTemplateInput,
) {
  const normalizedInput = normalizeTemplateInput(input);

  const client = getSupabaseAdminClient();
  const now = new Date().toISOString();
  const { data, error } = await client
    .from(supabaseAdminTemplateTable)
    .insert({
      channel: normalizedInput.channel,
      name: normalizedInput.name,
      subject: normalizedInput.subject,
      body: normalizedInput.body,
      created_at: now,
      updated_at: now,
      created_by_admin_user_id: normalizedInput.updatedByAdminUserId,
      created_by_email: normalizedInput.updatedByEmail,
      updated_by_admin_user_id: normalizedInput.updatedByAdminUserId,
      updated_by_email: normalizedInput.updatedByEmail,
    })
    .select(adminTemplateSelectFields)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as AdminMessageTemplateRecord;
}

export async function updateAdminMessageTemplate(
  input: UpdateAdminMessageTemplateInput,
) {
  if (!Number.isInteger(input.id) || input.id < 1) {
    throw new Error("A valid template id is required.");
  }

  const normalizedInput = normalizeTemplateInput(input);
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseAdminTemplateTable)
    .update({
      channel: normalizedInput.channel,
      name: normalizedInput.name,
      subject: normalizedInput.subject,
      body: normalizedInput.body,
      updated_at: new Date().toISOString(),
      updated_by_admin_user_id: normalizedInput.updatedByAdminUserId,
      updated_by_email: normalizedInput.updatedByEmail,
    })
    .eq("id", input.id)
    .select(adminTemplateSelectFields)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Template not found.");
  }

  return data as AdminMessageTemplateRecord;
}

export async function deleteAdminMessageTemplate(id: number) {
  if (!Number.isInteger(id) || id < 1) {
    throw new Error("A valid template id is required.");
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseAdminTemplateTable)
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error("Template not found.");
  }
}
