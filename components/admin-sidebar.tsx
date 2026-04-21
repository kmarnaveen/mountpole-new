"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  Layers3,
  MessageSquareQuote,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";
import AdminLogoutButton from "@/components/admin-logout-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminSidebarView = "leads" | "templates";

type AdminSidebarProps = {
  currentView: AdminSidebarView;
  sessionEmail: string;
  leadsHref: string;
  templatesHref: string;
  leadCount?: number;
  templateCount?: number;
};

type AdminSidebarItemProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  isActive: boolean;
  badge?: string;
  collapsed?: boolean;
};

function AdminSidebarItem({
  href,
  icon: Icon,
  title,
  description,
  isActive,
  badge,
  collapsed = false,
}: AdminSidebarItemProps) {
  return (
    <Link
      href={href}
      title={collapsed ? title : undefined}
      className={cn(
        "block rounded-3xl border transition",
        collapsed ? "px-3 py-3" : "px-4 py-4",
        isActive
          ? "border-white/20 bg-white/12 text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)]"
          : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white",
      )}
    >
      <div
        className={cn(
          "flex gap-3",
          collapsed
            ? "flex-col items-center justify-center"
            : "items-start justify-between",
        )}
      >
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
          <Icon className="h-5 w-5" />
        </div>
        {badge ? (
          <span
            className={cn(
              "inline-flex rounded-full border border-white/15 bg-white/10 font-semibold uppercase tracking-[0.16em] text-white/70",
              collapsed
                ? "min-w-7 justify-center px-1.5 py-1 text-[10px]"
                : "px-2.5 py-1 text-[11px]",
            )}
          >
            {badge}
          </span>
        ) : null}
      </div>
      {!collapsed ? (
        <div className="mt-4 space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-sm leading-6 text-white/60">{description}</p>
        </div>
      ) : (
        <span className="sr-only">{description}</span>
      )}
    </Link>
  );
}

export default function AdminSidebar({
  currentView,
  sessionEmail,
  leadsHref,
  templatesHref,
  leadCount,
  templateCount,
}: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "w-full lg:sticky lg:top-6 lg:shrink-0 lg:self-start lg:transition-[width] lg:duration-300",
        isCollapsed ? "lg:w-24" : "lg:w-80",
      )}
    >
      <div className="overflow-hidden rounded-4xl border border-slate-800 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] text-white shadow-[0_32px_80px_rgba(15,23,42,0.22)]">
        <div
          className={cn(
            "border-b border-white/10",
            isCollapsed ? "px-3 py-4" : "px-6 py-6",
          )}
        >
          <div
            className={cn(
              "flex items-start gap-3",
              isCollapsed ? "justify-center" : "justify-between",
            )}
          >
            {isCollapsed ? (
              ""
            ) : (
              <div>
                <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  MountPole
                </p>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCollapsed((currentValue) => !currentValue)}
              className="inline-flex rounded-full border-white/15 bg-white/8 text-white hover:bg-white/15 hover:text-white"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className={cn("space-y-6 py-4", isCollapsed ? "px-3" : "px-4")}>
          <div className="space-y-2">
            {!isCollapsed ? (
              <p className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Navigation
              </p>
            ) : null}
            <div className="space-y-2">
              <AdminSidebarItem
                href={leadsHref}
                icon={Inbox}
                title="Leads"
                description="Search, filter, and update inbound submissions from one inbox."
                isActive={currentView === "leads"}
                badge={
                  typeof leadCount === "number" ? String(leadCount) : undefined
                }
                collapsed={isCollapsed}
              />
              <AdminSidebarItem
                href={templatesHref}
                icon={Layers3}
                title="Template CRUD"
                description="Create, edit, and delete reusable templates for follow-up."
                isActive={currentView === "templates"}
                badge={
                  typeof templateCount === "number"
                    ? String(templateCount)
                    : undefined
                }
                collapsed={isCollapsed}
              />
            </div>
          </div>

          {isCollapsed ? (
            <div className="flex justify-center">
              <div
                title={sessionEmail}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75"
              >
                <MessageSquareQuote className="h-5 w-5" />
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <MessageSquareQuote className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">Signed in</p>
                    <p className="text-sm leading-6 text-white/70">
                      {sessionEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                  >
                    <Link href="/contact">Open contact page</Link>
                  </Button>
                  <AdminLogoutButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
