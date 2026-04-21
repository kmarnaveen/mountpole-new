import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type ContactSubmissionRecord = {
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

export type ContactSubmissionWorkflowSummary = {
  status: LeadStatus;
  follow_up_stage: FollowUpStage;
  latest_activity_at: string | null;
  latest_activity_by_email: string | null;
};

export const LEAD_STATUS_OPTIONS = [
  {
    value: "new",
    label: "New",
    description: "Awaiting first follow-up.",
    badgeClassName: "border-sky-200 bg-sky-50 text-sky-700",
  },
  {
    value: "working",
    label: "Working",
    description: "Active outreach or follow-up is in progress.",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-700",
  },
  {
    value: "qualified",
    label: "Qualified",
    description: "Lead has clear buying intent or fit.",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    value: "won",
    label: "Won",
    description: "Lead converted successfully.",
    badgeClassName: "border-violet-200 bg-violet-50 text-violet-700",
  },
  {
    value: "lost",
    label: "Lost",
    description: "Lead is closed without conversion.",
    badgeClassName: "border-slate-200 bg-slate-100 text-slate-700",
  },
] as const;

export type LeadStatus = (typeof LEAD_STATUS_OPTIONS)[number]["value"];

export const FOLLOW_UP_STAGE_OPTIONS = [
  {
    value: "new-inquiry",
    label: "New inquiry",
    description: "No outreach has happened yet.",
    badgeClassName: "border-slate-200 bg-slate-100 text-slate-700",
  },
  {
    value: "first-reachout",
    label: "First reach-out",
    description: "Initial contact is being attempted.",
    badgeClassName: "border-sky-200 bg-sky-50 text-sky-700",
  },
  {
    value: "awaiting-reply",
    label: "Awaiting reply",
    description: "Waiting for the lead to respond.",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-700",
  },
  {
    value: "quote-sent",
    label: "Quote sent",
    description: "Pricing or a quote has already been shared.",
    badgeClassName: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
  {
    value: "scheduled-follow-up",
    label: "Scheduled follow-up",
    description: "A specific follow-up touchpoint is booked.",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    value: "decision-pending",
    label: "Decision pending",
    description: "The lead is reviewing next steps internally.",
    badgeClassName: "border-violet-200 bg-violet-50 text-violet-700",
  },
] as const;

export type FollowUpStage = (typeof FOLLOW_UP_STAGE_OPTIONS)[number]["value"];

export type ContactSubmissionMetaRecord = {
  submission_id: number;
  status: LeadStatus;
  follow_up_stage: FollowUpStage;
  internal_notes: string | null;
  updated_at: string;
  created_at: string;
  updated_by_admin_user_id: number | null;
  updated_by_email: string | null;
};

export type ContactSubmissionNavigationRecord = Pick<
  ContactSubmissionRecord,
  "id" | "name" | "submitted_at"
>;

export type ContactSubmissionNeighbors = {
  previous: ContactSubmissionNavigationRecord | null;
  next: ContactSubmissionNavigationRecord | null;
};

export type ContactSubmissionActivityRecord = {
  id: number | string;
  submission_id: number;
  status: LeadStatus;
  follow_up_stage: FollowUpStage;
  internal_note: string | null;
  created_at: string;
  created_by_admin_user_id: number | null;
  created_by_email: string | null;
  isSynthetic?: boolean;
};

export type ContactSubmissionListItem = ContactSubmissionRecord & {
  workflow: ContactSubmissionWorkflowSummary;
};

export type ContactSubmissionListResult = {
  data: ContactSubmissionListItem[];
  count: number;
  limit: number;
  offset: number;
};

type ContactSubmissionListOptions = {
  limit?: number;
  offset?: number;
  source?: string;
  query?: string;
  status?: string;
  followUpStage?: string;
};

type ContactSubmissionNeighborsOptions = {
  source?: string;
};

type UpsertContactSubmissionMetaInput = {
  submissionId: number;
  status?: string;
  followUpStage?: string;
  internalNotes?: string;
  updatedAt?: string;
  updatedByAdminUserId?: number | null;
  updatedByEmail?: string | null;
};

type CreateContactSubmissionActivityInput = {
  submissionId: number;
  status?: string;
  followUpStage?: string;
  internalNote?: string | null;
  createdAt?: string;
  createdByAdminUserId?: number | null;
  createdByEmail?: string | null;
};

type UpdateContactSubmissionWorkflowInput = {
  submissionId: number;
  status?: string;
  followUpStage?: string;
  internalNote?: string | null;
  updatedAt?: string;
  updatedByAdminUserId?: number | null;
  updatedByEmail?: string | null;
};

const supabaseContactTable =
  process.env.NEXT_PUBLIC_SUPABASE_CONTACT_TABLE?.trim() ||
  "contact_submissions";
const supabaseContactMetaTable = "admin_contact_submission_meta";
const supabaseContactActivityTable = "admin_contact_submission_activity";
const DEFAULT_LEAD_STATUS: LeadStatus = LEAD_STATUS_OPTIONS[0].value;
const DEFAULT_FOLLOW_UP_STAGE: FollowUpStage = FOLLOW_UP_STAGE_OPTIONS[0].value;

function normalizeSource(value?: string) {
  return value?.trim() ?? "";
}

function normalizeSearchQuery(value?: string) {
  return value?.trim().replace(/\s+/g, " ") ?? "";
}

function normalizeLeadStatusFilter(value?: string) {
  return (
    LEAD_STATUS_OPTIONS.find((option) => option.value === value)?.value ?? ""
  );
}

function normalizeFollowUpStageFilter(value?: string) {
  return (
    FOLLOW_UP_STAGE_OPTIONS.find((option) => option.value === value)?.value ??
    ""
  );
}

function buildContactSearchFilter(value: string) {
  const sanitizedValue = value.replace(/[(),]/g, " ").trim();
  const pattern = `%${sanitizedValue}%`;

  return [
    `name.ilike.${pattern}`,
    `email.ilike.${pattern}`,
    `company.ilike.${pattern}`,
    `phone.ilike.${pattern}`,
    `message.ilike.${pattern}`,
    `product.ilike.${pattern}`,
    `sku.ilike.${pattern}`,
    `source.ilike.${pattern}`,
  ].join(",");
}

function normalizeLeadStatus(value?: string): LeadStatus {
  const match = LEAD_STATUS_OPTIONS.find((option) => option.value === value);
  return match?.value ?? DEFAULT_LEAD_STATUS;
}

function normalizeFollowUpStage(value?: string): FollowUpStage {
  const match = FOLLOW_UP_STAGE_OPTIONS.find(
    (option) => option.value === value,
  );
  return match?.value ?? DEFAULT_FOLLOW_UP_STAGE;
}

function normalizeNoteValue(value?: string | null) {
  const normalized = value?.replace(/\r\n?/g, "\n").trim() ?? "";
  return normalized || null;
}

export function getLeadStatusOption(value?: string) {
  return (
    LEAD_STATUS_OPTIONS.find((option) => option.value === value) ??
    LEAD_STATUS_OPTIONS[0]
  );
}

export function getFollowUpStageOption(value?: string) {
  return (
    FOLLOW_UP_STAGE_OPTIONS.find((option) => option.value === value) ??
    FOLLOW_UP_STAGE_OPTIONS[0]
  );
}

async function getWorkflowSummaryMap(submissionIds: number[]) {
  if (submissionIds.length === 0) {
    return new Map<number, ContactSubmissionWorkflowSummary>();
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseContactMetaTable)
    .select(
      "submission_id, status, follow_up_stage, updated_at, updated_by_email",
    )
    .in("submission_id", submissionIds);

  if (error) {
    throw error;
  }

  return new Map(
    (
      (data ?? []) as Array<{
        submission_id: number;
        status: LeadStatus;
        follow_up_stage: FollowUpStage;
        updated_at: string | null;
        updated_by_email: string | null;
      }>
    ).map((metadata) => [
      metadata.submission_id,
      {
        status: normalizeLeadStatus(metadata.status),
        follow_up_stage: normalizeFollowUpStage(metadata.follow_up_stage),
        latest_activity_at: metadata.updated_at,
        latest_activity_by_email: metadata.updated_by_email,
      },
    ]),
  );
}

function withWorkflowSummary(
  submissions: ContactSubmissionRecord[],
  workflowBySubmissionId: Map<number, ContactSubmissionWorkflowSummary>,
) {
  return submissions.map((submission) => ({
    ...submission,
    workflow: workflowBySubmissionId.get(submission.id) ?? {
      status: DEFAULT_LEAD_STATUS,
      follow_up_stage: DEFAULT_FOLLOW_UP_STAGE,
      latest_activity_at: null,
      latest_activity_by_email: null,
    },
  }));
}

export async function listContactSubmissions(
  options: ContactSubmissionListOptions = {},
): Promise<ContactSubmissionListResult> {
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
  const offset = Math.max(options.offset ?? 0, 0);
  const source = normalizeSource(options.source);
  const queryText = normalizeSearchQuery(options.query);
  const statusFilter = normalizeLeadStatusFilter(options.status);
  const followUpStageFilter = normalizeFollowUpStageFilter(
    options.followUpStage,
  );
  const hasWorkflowFilters = Boolean(statusFilter || followUpStageFilter);
  const client = getSupabaseAdminClient();

  let query = client
    .from(supabaseContactTable)
    .select("*", { count: hasWorkflowFilters ? undefined : "exact" });

  if (source) {
    query = query.eq("source", source);
  }

  if (queryText) {
    query = query.or(buildContactSearchFilter(queryText));
  }

  if (hasWorkflowFilters) {
    const { data, error } = await query
      .order("submitted_at", { ascending: false })
      .order("id", { ascending: false });

    if (error) {
      throw error;
    }

    const submissions = (data ?? []) as ContactSubmissionRecord[];
    const enrichedSubmissions = withWorkflowSummary(
      submissions,
      await getWorkflowSummaryMap(
        submissions.map((submission) => submission.id),
      ),
    );
    const filteredSubmissions = enrichedSubmissions.filter((submission) => {
      if (statusFilter && submission.workflow.status !== statusFilter) {
        return false;
      }

      if (
        followUpStageFilter &&
        submission.workflow.follow_up_stage !== followUpStageFilter
      ) {
        return false;
      }

      return true;
    });

    return {
      data: filteredSubmissions.slice(offset, offset + limit),
      count: filteredSubmissions.length,
      limit,
      offset,
    };
  }

  const { data, error, count } = await query
    .order("submitted_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  const submissions = (data ?? []) as ContactSubmissionRecord[];

  return {
    data: withWorkflowSummary(
      submissions,
      await getWorkflowSummaryMap(
        submissions.map((submission) => submission.id),
      ),
    ),
    count: count ?? 0,
    limit,
    offset,
  };
}

export async function getContactSubmissionById(id: number) {
  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseContactTable)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data ?? null) as ContactSubmissionRecord | null;
}

export async function getContactSubmissionMeta(submissionId: number) {
  if (!Number.isInteger(submissionId) || submissionId < 1) {
    return null;
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseContactMetaTable)
    .select(
      "submission_id, status, follow_up_stage, internal_notes, updated_at, created_at, updated_by_admin_user_id, updated_by_email",
    )
    .eq("submission_id", submissionId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data ?? null) as ContactSubmissionMetaRecord | null;
}

export async function upsertContactSubmissionMeta(
  input: UpsertContactSubmissionMetaInput,
) {
  if (!Number.isInteger(input.submissionId) || input.submissionId < 1) {
    throw new Error("A valid lead id is required.");
  }

  const client = getSupabaseAdminClient();
  const updatedAt = input.updatedAt ?? new Date().toISOString();
  const { data, error } = await client
    .from(supabaseContactMetaTable)
    .upsert(
      {
        submission_id: input.submissionId,
        status: normalizeLeadStatus(input.status),
        follow_up_stage: normalizeFollowUpStage(input.followUpStage),
        internal_notes: normalizeNoteValue(input.internalNotes),
        updated_at: updatedAt,
        updated_by_admin_user_id: input.updatedByAdminUserId ?? null,
        updated_by_email: input.updatedByEmail?.trim().toLowerCase() ?? null,
      },
      { onConflict: "submission_id" },
    )
    .select(
      "submission_id, status, follow_up_stage, internal_notes, updated_at, created_at, updated_by_admin_user_id, updated_by_email",
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as ContactSubmissionMetaRecord;
}

export async function createContactSubmissionActivity(
  input: CreateContactSubmissionActivityInput,
) {
  if (!Number.isInteger(input.submissionId) || input.submissionId < 1) {
    throw new Error("A valid lead id is required.");
  }

  const client = getSupabaseAdminClient();
  const createdAt = input.createdAt ?? new Date().toISOString();
  const { data, error } = await client
    .from(supabaseContactActivityTable)
    .insert({
      submission_id: input.submissionId,
      status: normalizeLeadStatus(input.status),
      follow_up_stage: normalizeFollowUpStage(input.followUpStage),
      internal_note: normalizeNoteValue(input.internalNote),
      created_at: createdAt,
      created_by_admin_user_id: input.createdByAdminUserId ?? null,
      created_by_email: input.createdByEmail?.trim().toLowerCase() ?? null,
    })
    .select(
      "id, submission_id, status, follow_up_stage, internal_note, created_at, created_by_admin_user_id, created_by_email",
    )
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as ContactSubmissionActivityRecord;
}

export async function updateContactSubmissionWorkflow(
  input: UpdateContactSubmissionWorkflowInput,
) {
  if (!Number.isInteger(input.submissionId) || input.submissionId < 1) {
    throw new Error("A valid lead id is required.");
  }

  const currentMeta = await getContactSubmissionMeta(input.submissionId);
  const existingActivity = currentMeta?.internal_notes
    ? await listContactSubmissionActivity(input.submissionId)
    : [];
  const nextStatus = input.status
    ? normalizeLeadStatus(input.status)
    : getLeadStatusOption(currentMeta?.status).value;
  const nextFollowUpStage = input.followUpStage
    ? normalizeFollowUpStage(input.followUpStage)
    : getFollowUpStageOption(currentMeta?.follow_up_stage).value;
  const nextInternalNote = normalizeNoteValue(input.internalNote);
  const previousStatus = getLeadStatusOption(currentMeta?.status).value;
  const previousFollowUpStage = getFollowUpStageOption(
    currentMeta?.follow_up_stage,
  ).value;
  const shouldRecordActivity =
    Boolean(nextInternalNote) ||
    previousStatus !== nextStatus ||
    previousFollowUpStage !== nextFollowUpStage;

  if (!shouldRecordActivity && currentMeta) {
    return {
      meta: currentMeta,
      activity: null as ContactSubmissionActivityRecord | null,
      changed: false,
    };
  }

  if (!shouldRecordActivity && !currentMeta) {
    return {
      meta: null as ContactSubmissionMetaRecord | null,
      activity: null as ContactSubmissionActivityRecord | null,
      changed: false,
    };
  }

  if (currentMeta?.internal_notes && existingActivity.length === 0) {
    await createContactSubmissionActivity({
      submissionId: input.submissionId,
      status: currentMeta.status,
      followUpStage: currentMeta.follow_up_stage,
      internalNote: currentMeta.internal_notes,
      createdAt: currentMeta.updated_at,
      createdByAdminUserId: currentMeta.updated_by_admin_user_id,
      createdByEmail: currentMeta.updated_by_email,
    });
  }

  const recordedAt = input.updatedAt ?? new Date().toISOString();
  const meta = await upsertContactSubmissionMeta({
    submissionId: input.submissionId,
    status: nextStatus,
    followUpStage: nextFollowUpStage,
    internalNotes: nextInternalNote ?? currentMeta?.internal_notes ?? "",
    updatedAt: recordedAt,
    updatedByAdminUserId: input.updatedByAdminUserId,
    updatedByEmail: input.updatedByEmail,
  });

  let activity: ContactSubmissionActivityRecord | null = null;

  if (shouldRecordActivity) {
    activity = await createContactSubmissionActivity({
      submissionId: input.submissionId,
      status: nextStatus,
      followUpStage: nextFollowUpStage,
      internalNote: nextInternalNote,
      createdAt: recordedAt,
      createdByAdminUserId: input.updatedByAdminUserId,
      createdByEmail: input.updatedByEmail,
    });
  }

  return {
    meta,
    activity,
    changed: true,
  };
}

export async function listContactSubmissionActivity(
  submissionId: number,
  metadata?: ContactSubmissionMetaRecord | null,
) {
  if (!Number.isInteger(submissionId) || submissionId < 1) {
    return [] as ContactSubmissionActivityRecord[];
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(supabaseContactActivityTable)
    .select(
      "id, submission_id, status, follow_up_stage, internal_note, created_at, created_by_admin_user_id, created_by_email",
    )
    .eq("submission_id", submissionId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    throw error;
  }

  const activity = (data ?? []) as ContactSubmissionActivityRecord[];

  if (!metadata?.internal_notes) {
    return activity;
  }

  const hasMatchingLegacyEntry = activity.some((entry) => {
    return (
      entry.internal_note === metadata.internal_notes &&
      entry.status === metadata.status &&
      entry.follow_up_stage === metadata.follow_up_stage &&
      entry.created_at === metadata.updated_at &&
      entry.created_by_email === metadata.updated_by_email
    );
  });

  if (hasMatchingLegacyEntry) {
    return activity;
  }

  return [
    {
      id: `legacy-${submissionId}`,
      submission_id: submissionId,
      status: metadata.status,
      follow_up_stage: metadata.follow_up_stage,
      internal_note: metadata.internal_notes,
      created_at: metadata.updated_at,
      created_by_admin_user_id: metadata.updated_by_admin_user_id,
      created_by_email: metadata.updated_by_email,
      isSynthetic: true,
    },
    ...activity,
  ];
}

export async function getContactSubmissionNeighbors(
  submissionId: number,
  options: ContactSubmissionNeighborsOptions = {},
): Promise<ContactSubmissionNeighbors> {
  if (!Number.isInteger(submissionId) || submissionId < 1) {
    return { previous: null, next: null };
  }

  const source = normalizeSource(options.source);
  const client = getSupabaseAdminClient();
  let query = client
    .from(supabaseContactTable)
    .select("id, name, submitted_at")
    .order("submitted_at", { ascending: false })
    .order("id", { ascending: false });

  if (source) {
    query = query.eq("source", source);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const records = ((data ?? []) as ContactSubmissionNavigationRecord[]) ?? [];
  const currentIndex = records.findIndex(
    (record) => record.id === submissionId,
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: records[currentIndex - 1] ?? null,
    next: records[currentIndex + 1] ?? null,
  };
}
