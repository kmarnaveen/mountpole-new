import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  clearAdminSessionCookie,
  revokeAdminSession,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  await revokeAdminSession(
    request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null,
  );

  const response = NextResponse.json({ success: true });
  response.cookies.set(clearAdminSessionCookie());
  return response;
}
