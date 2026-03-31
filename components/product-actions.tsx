"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { X, Check } from "lucide-react";

interface ProductActionsProps {
  productName: string;
  productSku: string;
  brandName: string;
}

export default function ProductActions({
  productName,
  productSku,
  brandName,
}: ProductActionsProps) {
  const defaultMessage = `I'm interested in ${productName} by ${brandName} (SKU: ${productSku}). Please send me a wholesale quote.`;
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [inquiryAdded, setInquiryAdded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: defaultMessage,
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
        body: JSON.stringify({
          ...formData,
          product: productName,
          sku: productSku,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send");
      }
      setSubmitted(true);
      setTimeout(() => {
        setQuoteOpen(false);
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: defaultMessage,
        });
      }, 2500);
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

  const handleAddToInquiry = () => {
    setInquiryAdded(true);
    setTimeout(() => setInquiryAdded(false), 2500);
  };

  return (
    <>
      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5">
        <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
          Wholesale actions
        </p>

        <div className="mt-4 space-y-3">
          <Button
            onClick={() => setQuoteOpen(true)}
            className="h-11 w-full rounded-full bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
            size="sm"
          >
            Request quote
          </Button>
          <Button
            onClick={handleAddToInquiry}
            variant="outline"
            className={`h-11 w-full rounded-full border text-sm font-medium transition-all ${
              inquiryAdded
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200 bg-white text-gray-700 hover:bg-stone-50"
            }`}
            size="sm"
          >
            {inquiryAdded ? (
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5" />
                Added to inquiry
              </span>
            ) : (
              "Add to inquiry"
            )}
          </Button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-gray-500">
          Request current pricing, availability, and lead-time guidance for this
          SKU.
        </p>
      </div>

      {quoteOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setQuoteOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-4xl border border-gray-200 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between border-b border-gray-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">
                  Request Quote
                </h2>
                <p className="mt-0.5 line-clamp-1 max-w-xs text-xs text-gray-500">
                  {brandName} · {productName}
                </p>
              </div>
              <button
                onClick={() => setQuoteOpen(false)}
                className="mt-0.5 text-gray-400 transition-colors hover:text-gray-700"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <Check className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">
                    Quote request sent!
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    We'll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
                      {error}
                    </p>
                  )}
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-stone-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-gray-200 bg-stone-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-stone-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-stone-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full resize-none rounded-2xl border border-gray-200 bg-stone-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-gray-900 text-sm font-medium text-white hover:bg-gray-800"
                    size="sm"
                  >
                    {loading ? "Sending..." : "Send Quote Request"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
