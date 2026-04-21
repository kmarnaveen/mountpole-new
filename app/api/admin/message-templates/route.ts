import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import {
  createAdminMessageTemplate,
  deleteAdminMessageTemplate,
  listAdminMessageTemplates,
  updateAdminMessageTemplate,
} from "@/lib/admin-message-templates";

type MessageTemplateRequestBody = {
  id?: number;
  channel?: string;
  name?: string;
  subject?: string;
  body?: string;
};

function parseTemplateId(value: unknown) {
  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    return null;
  }

  return id;
}

export async function GET(request: NextRequest) {
  try {
    if (!(await getAdminSessionFromRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const templates = await listAdminMessageTemplates();
    return NextResponse.json({ data: templates });
  } catch (error) {
    console.error("[Admin Message Templates List Error]", error);
    return NextResponse.json(
      { error: "Unable to load saved templates right now." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as MessageTemplateRequestBody;
    const template = await createAdminMessageTemplate({
      channel: body.channel,
      name: body.name,
      subject: body.subject,
      body: body.body,
      adminUserId: session.userId,
      adminEmail: session.email,
    });

    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error("[Admin Message Template Create Error]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create a template right now.",
      },
      { status: 400 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getAdminSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as MessageTemplateRequestBody;
    const templateId = parseTemplateId(body.id);

    if (!templateId) {
      return NextResponse.json(
        { error: "A valid template id is required." },
        { status: 400 },
      );
    }

    const template = await updateAdminMessageTemplate({
      id: templateId,
      channel: body.channel,
      name: body.name,
      subject: body.subject,
      body: body.body,
      adminUserId: session.userId,
      adminEmail: session.email,
    });

    return NextResponse.json({ success: true, template });
  } catch (error) {
    console.error("[Admin Message Template Update Error]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update the template right now.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!(await getAdminSessionFromRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request
      .json()
      .catch(() => ({}))) as MessageTemplateRequestBody;
    const templateId = parseTemplateId(body.id);

    if (!templateId) {
      return NextResponse.json(
        { error: "A valid template id is required." },
        { status: 400 },
      );
    }

    await deleteAdminMessageTemplate(templateId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin Message Template Delete Error]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to delete the template right now.",
      },
      { status: 400 },
    );
  }
}
