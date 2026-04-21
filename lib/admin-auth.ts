import "server-only";

import {
  createHash,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type { NextRequest } from "next/server";
import {
  getSupabaseAdminClient,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-admin";

export const ADMIN_SESSION_COOKIE_NAME = "mountpole_admin_session";

const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;
const ADMIN_USERS_TABLE = "admin_users";
const ADMIN_SESSIONS_TABLE = "admin_sessions";
const PASSWORD_HASH_PREFIX = "scrypt";
const PASSWORD_HASH_KEY_LENGTH = 64;

export type AdminSession = {
  userId: number;
  email: string;
  role: string;
  expiresAt: string;
  sessionId: number;
};

type AdminUserRecord = {
  id: number;
  email: string;
  password_hash: string;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
};

type AdminSessionRecord = {
  id: number;
  admin_user_id: number;
  expires_at: string;
  revoked_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  last_seen_at: string;
};

type AdminSessionMeta = {
  ipAddress?: string | null;
  userAgent?: string | null;
};

function normalizeEmail(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

function parsePasswordHash(value: string) {
  const [prefix, cost, blockSize, parallelization, salt, derivedKey] =
    value.split("$");

  if (
    prefix !== PASSWORD_HASH_PREFIX ||
    !cost ||
    !blockSize ||
    !parallelization ||
    !salt ||
    !derivedKey
  ) {
    return null;
  }

  const parsedCost = Number(cost);
  const parsedBlockSize = Number(blockSize);
  const parsedParallelization = Number(parallelization);

  if (
    !Number.isInteger(parsedCost) ||
    !Number.isInteger(parsedBlockSize) ||
    !Number.isInteger(parsedParallelization)
  ) {
    return null;
  }

  return {
    salt,
    derivedKey,
    cost: parsedCost,
    blockSize: parsedBlockSize,
    parallelization: parsedParallelization,
  };
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function hashAdminSessionToken(value: string) {
  return createHash("sha256").update(value).digest("base64url");
}

export function isAdminAuthConfigured() {
  return isSupabaseAdminConfigured();
}

export function normalizeAdminRedirectPath(value?: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }

  return value;
}

export function getAdminLoginPath(nextPath?: string | null) {
  const redirectPath = normalizeAdminRedirectPath(nextPath);
  if (redirectPath === "/admin") {
    return "/admin/login";
  }

  return `/admin/login?next=${encodeURIComponent(redirectPath)}`;
}

export function hashAdminPassword(password: string, salt?: string) {
  const passwordSalt = salt ?? randomBytes(16).toString("base64url");
  const derivedKey = scryptSync(
    password,
    passwordSalt,
    PASSWORD_HASH_KEY_LENGTH,
    {
      N: 16384,
      r: 8,
      p: 1,
    },
  ).toString("base64url");

  return [PASSWORD_HASH_PREFIX, 16384, 8, 1, passwordSalt, derivedKey].join(
    "$",
  );
}

export function verifyAdminPassword(password: string, storedHash: string) {
  const parsed = parsePasswordHash(storedHash);

  if (!parsed) {
    return false;
  }

  const derivedKey = scryptSync(
    password,
    parsed.salt,
    PASSWORD_HASH_KEY_LENGTH,
    {
      N: parsed.cost,
      r: parsed.blockSize,
      p: parsed.parallelization,
    },
  ).toString("base64url");

  return safeCompare(derivedKey, parsed.derivedKey);
}

async function getAdminUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(ADMIN_USERS_TABLE)
    .select(
      "id, email, password_hash, role, is_active, last_login_at, created_at",
    )
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as AdminUserRecord | null;
}

async function getAdminUserById(id: number) {
  const client = getSupabaseAdminClient();
  const { data, error } = await client
    .from(ADMIN_USERS_TABLE)
    .select(
      "id, email, password_hash, role, is_active, last_login_at, created_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as AdminUserRecord | null;
}

async function getAdminSessionRecord(token?: string | null) {
  if (!token) {
    return null;
  }

  const client = getSupabaseAdminClient();
  const { data: sessionData, error: sessionError } = await client
    .from(ADMIN_SESSIONS_TABLE)
    .select(
      "id, admin_user_id, expires_at, revoked_at, ip_address, user_agent, created_at, last_seen_at",
    )
    .eq("session_hash", hashAdminSessionToken(token))
    .is("revoked_at", null)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (sessionError) {
    throw sessionError;
  }

  const session = sessionData as AdminSessionRecord | null;

  if (!session) {
    return null;
  }

  const user = await getAdminUserById(session.admin_user_id);

  return { session, user };
}

export async function validateAdminCredentials(
  email: string,
  password: string,
) {
  const user = await getAdminUserByEmail(email);

  if (!user || !user.is_active) {
    return null;
  }

  if (!verifyAdminPassword(password, user.password_hash)) {
    return null;
  }

  return user;
}

export async function createAdminSession(
  user: Pick<AdminUserRecord, "id" | "email" | "role">,
  meta: AdminSessionMeta = {},
) {
  const client = getSupabaseAdminClient();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(
    Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
  ).toISOString();

  const { error } = await client.from(ADMIN_SESSIONS_TABLE).insert({
    admin_user_id: user.id,
    session_hash: hashAdminSessionToken(token),
    expires_at: expiresAt,
    ip_address: meta.ipAddress ?? null,
    user_agent: meta.userAgent ?? null,
  });

  if (error) {
    throw error;
  }

  await client
    .from(ADMIN_USERS_TABLE)
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", user.id);

  return token;
}

export async function readAdminSession(
  token?: string | null,
): Promise<AdminSession | null> {
  const record = await getAdminSessionRecord(token);

  if (!record?.session || !record.user?.is_active) {
    return null;
  }

  return {
    userId: record.user.id,
    email: record.user.email,
    role: record.user.role,
    expiresAt: record.session.expires_at,
    sessionId: record.session.id,
  };
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  return await readAdminSession(
    request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null,
  );
}

export async function revokeAdminSession(token?: string | null) {
  if (!token) {
    return;
  }

  const client = getSupabaseAdminClient();

  await client
    .from(ADMIN_SESSIONS_TABLE)
    .update({ revoked_at: new Date().toISOString() })
    .eq("session_hash", hashAdminSessionToken(token))
    .is("revoked_at", null);
}

export function createAdminSessionCookie(token: string) {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}

export function clearAdminSessionCookie() {
  return {
    name: ADMIN_SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  };
}
