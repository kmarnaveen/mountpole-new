"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, LockKeyhole, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AdminLoginFormProps = {
  nextPath: string;
  isConfigured: boolean;
};

export default function AdminLoginForm({
  nextPath,
  isConfigured,
}: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setupMessage =
    "Server-side admin auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then run supabase/admin-auth.sql.";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setError("");

    if (!isConfigured) {
      setError(setupMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          next: nextPath,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        redirectTo?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Unable to sign in.");
      }

      router.replace(data.redirectTo || nextPath);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-white/15 bg-white/95 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur">
      <CardHeader className="space-y-4 border-b border-slate-200/80 pb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
            <Shield className="h-5 w-5" />
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${
              isConfigured
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-amber-50 text-amber-800 ring-amber-200"
            }`}
          >
            {isConfigured ? "Connection ready" : "Setup required"}
          </span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl text-slate-950">
            Admin sign in
          </CardTitle>
          <CardDescription className="max-w-sm text-sm leading-6 text-slate-600">
            Use your internal MountPole admin email and password to access
            submitted contact inquiries.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="gauravdev@mountpole.com"
              disabled={isSubmitting}
              className="h-11 border-slate-200 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                disabled={isSubmitting}
                className="h-11 border-slate-200 bg-white pl-10"
              />
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          {!isConfigured ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              You can enter credentials now, but sign-in will stay offline until
              NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are
              available to the server and the admin auth tables are installed.
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`h-11 w-full rounded-full text-white ${
              isConfigured
                ? "bg-slate-950 hover:bg-slate-800"
                : "bg-amber-600 hover:bg-amber-500"
            }`}
          >
            {isSubmitting
              ? "Signing in..."
              : isConfigured
                ? "Sign in to admin"
                : "Review local setup"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
