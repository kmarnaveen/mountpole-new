"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Mail, Phone, MapPin } from "lucide-react";
import { submitContactSubmission } from "@/lib/contact-submissions";

export default function LeadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContactSubmission({
        ...formData,
        message: formData.message || "Requested a quote via the lead modal.",
        source: "lead-modal",
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Lead Modal Trigger Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-40 font-light tracking-wide"
      >
        Get Quote
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border/30 px-6 py-6 flex items-center justify-between">
              <h2 className="text-xl font-light tracking-tight">
                Get Your Quote
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <p className="text-xs text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg">
                      {error}
                    </p>
                  )}
                  <div>
                    <label className="block text-sm font-light text-foreground/70 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg font-light text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground/70 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg font-light text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground/70 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg font-light text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground/70 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg font-light text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-foreground/70 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-secondary border border-border/30 rounded-lg font-light text-sm focus:outline-none focus:ring-1 focus:ring-foreground/20 transition-all resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="sm"
                    className="w-full rounded-lg font-light tracking-wide"
                  >
                    {loading ? "Sending..." : "Submit"}
                  </Button>

                  <div className="pt-4 border-t border-border/30 space-y-3 mt-6">
                    <p className="text-xs font-light text-foreground/50 uppercase tracking-wide">
                      Quick Contact
                    </p>
                    <div className="space-y-2">
                      <a
                        href="tel:+14376613501"
                        className="flex items-center gap-2 text-sm font-light text-foreground/70 hover:text-foreground transition-colors group"
                      >
                        <Phone className="w-4 h-4 text-foreground/50 group-hover:text-foreground transition-colors" />
                        +1 (437) 661-3501
                      </a>
                      <a
                        href="mailto:sales@mountpole.com"
                        className="flex items-center gap-2 text-sm font-light text-foreground/70 hover:text-foreground transition-colors group"
                      >
                        <Mail className="w-4 h-4 text-foreground/50 group-hover:text-foreground transition-colors" />
                        sales@mountpole.com
                      </a>
                      <div className="flex items-start gap-2 text-sm font-light text-foreground/70">
                        <MapPin className="w-4 h-4 text-foreground/50 mt-0.5 shrink-0" />
                        <div>
                          <p>Doral, Florida, USA</p>
                          <p>Mississauga, Ontario, Canada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-light tracking-tight">
                    Thank You!
                  </h3>
                  <p className="text-sm font-light text-foreground/60">
                    We'll be in touch within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
