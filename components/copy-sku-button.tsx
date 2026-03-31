"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopySkuButton({ sku }: { sku: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sku);
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement("textarea");
      el.value = sku;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
        copied
          ? "border-green-200 bg-green-50 text-green-600"
          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-stone-50"
      }`}
      title={copied ? "Copied!" : "Copy SKU to clipboard"}
      aria-label={copied ? "Copied!" : "Copy SKU to clipboard"}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
