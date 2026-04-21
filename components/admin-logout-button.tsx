"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isSubmitting}
      onClick={handleLogout}
      className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
    >
      {isSubmitting ? "Signing out..." : "Sign out"}
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
