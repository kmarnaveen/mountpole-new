import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { updateContactSubmissionWorkflow } from "@/lib/contact-records";

type BulkLeadWorkflowRequestBody = {
  submissionIds?: number[];
  status?: string;
  followUpStage?: string;
  internalNote?: string;
};

function parseSubmissionIds(value: number[] | undefined) {
  const ids = Array.isArray(value)
    ? value
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0)
    : [];

  return [...new Set(ids)];
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as BulkLeadWorkflowRequestBody;
    const submissionIds = parseSubmissionIds(body.submissionIds);
    const status = body.status?.trim() ?? "";
    const followUpStage = body.followUpStage?.trim() ?? "";
    const internalNote = body.internalNote?.trim() ?? "";

    if (submissionIds.length === 0) {
      return NextResponse.json(
        { error: "Select at least one lead to update." },
        { status: 400 },
      );
    }

    if (submissionIds.length > 100) {
      return NextResponse.json(
        { error: "Bulk actions are limited to 100 leads at a time." },
        { status: 400 },
      );
    }

    if (!status && !followUpStage && !internalNote) {
      return NextResponse.json(
        {
          error: "Choose a status, a follow-up stage, or add an internal note.",
        },
        { status: 400 },
      );
    }

    const results = await Promise.all(
      submissionIds.map((submissionId) =>
        updateContactSubmissionWorkflow({
          submissionId,
          status: status || undefined,
          followUpStage: followUpStage || undefined,
          internalNote: internalNote || undefined,
          updatedByAdminUserId: session.userId,
          updatedByEmail: session.email,
        }),
      ),
    );

    return NextResponse.json({
      success: true,
      updatedCount: results.filter((result) => result.changed).length,
    });
  } catch (error) {
    console.error("[Admin Lead Bulk Action Error]", error);
    return NextResponse.json(
      { error: "Unable to update the selected leads right now." },
      { status: 500 },
    );
  }
}
