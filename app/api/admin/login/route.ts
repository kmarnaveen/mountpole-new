import { NextResponse } from "next/server";
import {
  createAdminSession,
  createAdminSessionCookie,
  isAdminAuthConfigured,
  normalizeAdminRedirectPath,
  validateAdminCredentials,
} from "@/lib/admin-auth";

type LoginRequestBody = {
  email?: string;
  password?: string;
  next?: string;
};

function normalizeEmail(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function getClientAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return request.headers.get("x-real-ip")?.trim() ?? null;
}

export async function POST(request: Request) {
  try {
    if (!isAdminAuthConfigured()) {
      return NextResponse.json(
        { error: "Admin login is not configured." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as LoginRequestBody;
    const email = normalizeEmail(body.email);
    const password = body.password ?? "";
    const redirectTo = normalizeAdminRedirectPath(body.next);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const user = await validateAdminCredentials(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await createAdminSession(user, {
      ipAddress: getClientAddress(request),
      userAgent: request.headers.get("user-agent"),
    });

    const response = NextResponse.json({ success: true, redirectTo });
    response.cookies.set(createAdminSessionCookie(token));
    return response;
  } catch (error) {
    console.error("[Admin Login Error]", error);
    return NextResponse.json(
      { error: "Unable to sign in right now." },
      { status: 500 },
    );
  }
}
