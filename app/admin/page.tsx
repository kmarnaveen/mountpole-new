import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Filter, Inbox, Sparkles } from "lucide-react";
import AdminInboxManager from "@/components/admin-inbox-manager";
import AdminSidebar from "@/components/admin-sidebar";
import AdminTemplateManager from "@/components/admin-template-manager";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminLoginPath,
  readAdminSession,
} from "@/lib/admin-auth";
import {
  type AdminMessageTemplateRecord,
  listAdminMessageTemplates,
  MESSAGE_TEMPLATE_CHANNEL_OPTIONS,
} from "@/lib/admin-message-templates";
import {
  FOLLOW_UP_STAGE_OPTIONS,
  getFollowUpStageOption,
  getLeadStatusOption,
  LEAD_STATUS_OPTIONS,
  listContactSubmissions,
  type ContactSubmissionListResult,
} from "@/lib/contact-records";

export const metadata: Metadata = {
  title: "Admin Inbox | MountPole",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{
    limit?: string;
    offset?: string;
    view?: string;
    q?: string;
    source?: string;
    status?: string;
    followUpStage?: string;
  }>;
};

type AdminView = "leads" | "templates";

function parseInteger(
  value: string | undefined,
  fallback: number,
  minimum: number,
  maximum: number,
) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < minimum) {
    return fallback;
  }

  return Math.min(parsed, maximum);
}

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

function normalizeAdminView(value?: string): AdminView {
  return value === "templates" ? "templates" : "leads";
}

function buildAdminHref({
  view,
  limit,
  offset,
  q,
  source,
  status,
  followUpStage,
}: {
  view: AdminView;
  limit: number;
  offset: number;
  q: string;
  source: string;
  status: string;
  followUpStage: string;
}) {
  const params = new URLSearchParams();

  if (view === "templates") {
    params.set("view", view);
  }

  if (limit !== 25) {
    params.set("limit", String(limit));
  }

  if (offset > 0) {
    params.set("offset", String(offset));
  }

  if (q) {
    params.set("q", q);
  }

  if (source) {
    params.set("source", source);
  }

  if (status) {
    params.set("status", status);
  }

  if (followUpStage) {
    params.set("followUpStage", followUpStage);
  }

  const query = params.toString();
  return query ? `/admin?${query}` : "/admin";
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const cookieStore = await cookies();
  const session = await readAdminSession(
    cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null,
  );

  if (!session) {
    redirect(getAdminLoginPath("/admin"));
  }

  const params = await searchParams;
  const currentView = normalizeAdminView(params.view);
  const limit = parseInteger(params.limit, 25, 1, 100);
  const offset = parseInteger(params.offset, 0, 0, 5000);
  const queryText = normalizeSearchQuery(params.q);
  const source = normalizeSource(params.source);
  const status = normalizeLeadStatusFilter(params.status);
  const followUpStage = normalizeFollowUpStageFilter(params.followUpStage);

  let result: ContactSubmissionListResult = {
    data: [],
    count: 0,
    limit,
    offset,
  };
  let errorMessage = "";
  let templates: AdminMessageTemplateRecord[] = [];
  let templateErrorMessage = "";

  if (currentView === "leads") {
    try {
      result = await listContactSubmissions({
        limit,
        offset,
        query: queryText,
        source,
        status,
        followUpStage,
      });
    } catch (error) {
      errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load contact submissions.";
    }
  }

  try {
    templates = await listAdminMessageTemplates();
  } catch (error) {
    templateErrorMessage =
      error instanceof Error
        ? error.message
        : "Unable to load saved templates right now.";
  }

  const previousOffset = Math.max(0, result.offset - result.limit);
  const hasPreviousPage = result.offset > 0;
  const hasNextPage = result.offset + result.limit < result.count;
  const rangeStart = result.count === 0 ? 0 : result.offset + 1;
  const activeFilters = [
    queryText ? `Search: ${queryText}` : "",
    source ? `Source: ${source}` : "",
    status ? `Status: ${getLeadStatusOption(status).label}` : "",
    followUpStage
      ? `Stage: ${getFollowUpStageOption(followUpStage).label}`
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const emailTemplateCount = templates.filter(
    (template) => template.channel === "email",
  ).length;
  const whatsappTemplateCount = templates.filter(
    (template) => template.channel === "whatsapp",
  ).length;
  const leadsHref = buildAdminHref({
    view: "leads",
    limit,
    offset,
    q: queryText,
    source,
    status,
    followUpStage,
  });
  const templatesHref = buildAdminHref({
    view: "templates",
    limit,
    offset,
    q: queryText,
    source,
    status,
    followUpStage,
  });
  const resetLeadsHref = buildAdminHref({
    view: "leads",
    limit: 25,
    offset: 0,
    q: "",
    source: "",
    status: "",
    followUpStage: "",
  });

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)] px-6 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-400 lg:flex lg:items-start lg:gap-8">
        <AdminSidebar
          currentView={currentView}
          sessionEmail={session.email}
          leadsHref={leadsHref}
          templatesHref={templatesHref}
          leadCount={currentView === "leads" ? result.count : undefined}
          templateCount={templates.length}
        />

        <div className="mt-6 min-w-0 space-y-8 lg:mt-0">
          {currentView === "leads" ? (
            <>
              <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <div className="bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_26%),linear-gradient(135deg,#0f172a_0%,#111827_100%)] px-8 py-10 text-white">
                  <div className="space-y-2">
                    <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      Lead inbox
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Contact submissions
                    </h1>
                    <p className="max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                      Review inbound leads, bulk update workflow, and forward
                      personalized outreach from one place.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-slate-200 bg-slate-50/80 px-8 py-6 md:grid-cols-3">
                  <Card className="gap-3 border-slate-200/80 bg-white py-5 shadow-none">
                    <CardHeader className="px-5 pb-0">
                      <CardDescription>Total matches</CardDescription>
                      <CardTitle className="text-3xl text-slate-950">
                        {result.count}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="gap-3 border-slate-200/80 bg-white py-5 shadow-none">
                    <CardHeader className="px-5 pb-0">
                      <CardDescription>Current page size</CardDescription>
                      <CardTitle className="text-3xl text-slate-950">
                        {result.data.length}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="gap-3 border-slate-200/80 bg-white py-5 shadow-none">
                    <CardHeader className="px-5 pb-0">
                      <CardDescription>Active filters</CardDescription>
                      <CardTitle className="text-base leading-6 text-slate-950">
                        {activeFilters || "All submissions"}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </section>

              <section className="rounded-4xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Filter className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        Refine results
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                        Keep the inbox full-width while filtering by search,
                        workflow state, source, and page size.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 xl:max-w-md">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Current slice
                    </div>
                    <div className="mt-2 leading-6 text-slate-700">
                      {activeFilters ||
                        "All submissions across every source, status, and follow-up stage."}
                    </div>
                  </div>
                </div>

                <form
                  className="mt-6 grid gap-3 xl:grid-cols-[minmax(0,1.55fr)_minmax(150px,0.75fr)_minmax(180px,0.95fr)_minmax(200px,1fr)_120px_auto_auto] xl:items-end"
                  method="get"
                >
                  <div className="space-y-2 xl:col-span-1">
                    <label
                      htmlFor="q"
                      className="text-sm font-medium text-slate-700"
                    >
                      Search
                    </label>
                    <Input
                      id="q"
                      name="q"
                      defaultValue={queryText}
                      placeholder="Name, email, phone, company, product, message"
                      className="border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="source"
                      className="text-sm font-medium text-slate-700"
                    >
                      Source
                    </label>
                    <Input
                      id="source"
                      name="source"
                      defaultValue={source}
                      placeholder="lead-modal"
                      className="border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-slate-700"
                    >
                      Lead status
                    </label>
                    <select
                      id="status"
                      name="status"
                      defaultValue={status}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="">All statuses</option>
                      {LEAD_STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="followUpStage"
                      className="text-sm font-medium text-slate-700"
                    >
                      Follow-up stage
                    </label>
                    <select
                      id="followUpStage"
                      name="followUpStage"
                      defaultValue={followUpStage}
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-xs outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="">All stages</option>
                      {FOLLOW_UP_STAGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="limit"
                      className="text-sm font-medium text-slate-700"
                    >
                      Rows per page
                    </label>
                    <Input
                      id="limit"
                      name="limit"
                      type="number"
                      min={1}
                      max={100}
                      defaultValue={limit}
                      className="border-slate-200"
                    />
                  </div>

                  <Button className="w-full rounded-full bg-slate-950 text-white hover:bg-slate-800 xl:w-auto">
                    Apply filters
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-slate-200 xl:w-auto"
                  >
                    <Link href={resetLeadsHref}>Reset</Link>
                  </Button>
                </form>
              </section>

              <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/80 px-6 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-8">
                  <div className="space-y-2">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                      <Inbox className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">
                        Latest submissions
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Sorted by most recent submission time, with bulk workflow
                        and outreach tools kept directly above the grid.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right text-sm text-slate-500">
                    <div className="font-medium text-slate-900">
                      {rangeStart} - {result.offset + result.data.length}
                    </div>
                    <div>of {result.count} rows</div>
                  </div>
                </div>

                <div className="px-6 py-6 sm:px-8">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                      {errorMessage}
                    </div>
                  ) : null}

                  {!errorMessage && result.data.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
                      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h2 className="mt-4 text-lg font-semibold text-slate-950">
                        No submissions found
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Try clearing the filters or submit a new inquiry from
                        the site to populate the inbox.
                      </p>
                    </div>
                  ) : null}

                  {result.data.length > 0 ? (
                    <AdminInboxManager
                      submissions={result.data}
                      returnToHref={buildAdminHref({
                        view: "leads",
                        limit: result.limit,
                        offset: result.offset,
                        q: queryText,
                        source,
                        status,
                        followUpStage,
                      })}
                      templatesHref={templatesHref}
                      previousHref={buildAdminHref({
                        view: "leads",
                        limit: result.limit,
                        offset: previousOffset,
                        q: queryText,
                        source,
                        status,
                        followUpStage,
                      })}
                      nextHref={buildAdminHref({
                        view: "leads",
                        limit: result.limit,
                        offset: result.offset + result.limit,
                        q: queryText,
                        source,
                        status,
                        followUpStage,
                      })}
                      hasPreviousPage={hasPreviousPage}
                      hasNextPage={hasNextPage}
                      offset={result.offset}
                      templates={templates}
                      templateErrorMessage={templateErrorMessage}
                      statusOptions={LEAD_STATUS_OPTIONS}
                      followUpStageOptions={FOLLOW_UP_STAGE_OPTIONS}
                      channelOptions={MESSAGE_TEMPLATE_CHANNEL_OPTIONS}
                    />
                  ) : null}
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <div className="bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_26%),linear-gradient(135deg,#0f172a_0%,#111827_100%)] px-8 py-10 text-white">
                  <div className="space-y-2">
                    <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                      Template library
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Template CRUD
                    </h1>
                    <p className="max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
                      Manage reusable email and WhatsApp templates that the team
                      can start from while forwarding outreach.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 border-t border-slate-200 bg-slate-50/80 px-8 py-6 md:grid-cols-3">
                  <Card className="gap-3 border-slate-200/80 bg-white py-5 shadow-none">
                    <CardHeader className="px-5 pb-0">
                      <CardDescription>Total templates</CardDescription>
                      <CardTitle className="text-3xl text-slate-950">
                        {templates.length}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="gap-3 border-slate-200/80 bg-white py-5 shadow-none">
                    <CardHeader className="px-5 pb-0">
                      <CardDescription>Email templates</CardDescription>
                      <CardTitle className="text-3xl text-slate-950">
                        {emailTemplateCount}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="gap-3 border-slate-200/80 bg-white py-5 shadow-none">
                    <CardHeader className="px-5 pb-0">
                      <CardDescription>WhatsApp templates</CardDescription>
                      <CardTitle className="text-3xl text-slate-950">
                        {whatsappTemplateCount}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </section>

              <section className="rounded-4xl border border-slate-200 bg-white shadow-sm">
                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  <AdminTemplateManager
                    templates={templates}
                    channelOptions={MESSAGE_TEMPLATE_CHANNEL_OPTIONS}
                    templateErrorMessage={templateErrorMessage}
                  />
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
