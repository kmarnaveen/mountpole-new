import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin-login-form";
import {
  ADMIN_SESSION_COOKIE_NAME,
  isAdminAuthConfigured,
  normalizeAdminRedirectPath,
  readAdminSession,
} from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | MountPole",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type AdminLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const nextPath = normalizeAdminRedirectPath(params.next);
  const cookieStore = await cookies();
  const session = await readAdminSession(
    cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value ?? null,
  );

  if (session) {
    redirect(nextPath);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.16),transparent_34%),linear-gradient(135deg,#f8fafc_0%,#e2e8f0_45%,#f8fafc_100%)] px-6 py-10 text-slate-900 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
        <section className="w-full max-w-md">
          <AdminLoginForm
            nextPath={nextPath}
            isConfigured={isAdminAuthConfigured()}
          />
        </section>
      </div>
    </main>
  );
}
