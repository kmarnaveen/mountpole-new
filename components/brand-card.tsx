"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Brand } from "@/lib/brands";

interface BrandCardProps {
  brand: Brand;
  variant?: "featured" | "compact";
}

export default function BrandCard({
  brand,
  variant = "compact",
}: BrandCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/brands/${brand.slug}`}
        className="group relative h-full min-h-96 overflow-hidden rounded-4xl border border-gray-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300"
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex justify-end">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-none text-gray-900">
              {brand.name}
            </h2>
            <p className="mt-3 max-w-none text-sm leading-relaxed text-gray-500 sm:text-[0.95rem]">
              {brand.description}
            </p>
          </div>

          {brand.logo && (
            <div className="mt-6 flex min-h-40 flex-1 items-center justify-center rounded-3xl bg-stone-50 px-8 py-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-auto max-h-16 max-w-44 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="mt-6 border-t border-black/5 pt-4">
            <span className="text-sm font-medium text-gray-700">
              {brand.productCount} wholesale products
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-stone-50 aspect-square p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white"
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 leading-none">
            {brand.name}
          </h3>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

        {brand.logo && (
          <div className="mt-4 flex flex-1 items-center justify-center rounded-3xl bg-white p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="w-auto max-h-10 max-w-24 object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="mt-4 border-t border-black/5 pt-3">
          <span className="text-xs text-gray-500 font-medium">
            {brand.productCount} products
          </span>
        </div>
      </div>
    </Link>
  );
}
