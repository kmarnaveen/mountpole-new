"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-light tracking-tight mb-6">
        Send us a Message
      </h2>
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Check className="w-12 h-12 text-green-500 mb-4" />
          <p className="text-base font-light">Message sent successfully!</p>
          <p className="text-xs font-light text-foreground/50 mt-2">
            We'll respond within 24 hours on business days.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}
          <div>
            <label className="block text-xs font-medium tracking-wide mb-2.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-secondary border border-border/50 rounded-lg text-xs font-light outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wide mb-2.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-secondary border border-border/50 rounded-lg text-xs font-light outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wide mb-2.5">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company"
              className="w-full px-4 py-3 bg-secondary border border-border/50 rounded-lg text-xs font-light outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wide mb-2.5">
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 bg-secondary border border-border/50 rounded-lg text-xs font-light outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wide mb-2.5">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your inquiry..."
              rows={5}
              className="w-full px-4 py-3 bg-secondary border border-border/50 rounded-lg text-xs font-light outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
              required
            ></textarea>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg font-light tracking-wide text-xs py-3"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>

          <p className="text-xs font-light text-foreground/50 text-center pt-2">
            We typically respond within 24 hours on business days.
          </p>
        </form>
      )}
    </div>
  );
}
