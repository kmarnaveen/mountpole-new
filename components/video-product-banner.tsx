"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useVideoAccent } from "@/hooks/use-video-accent";

type VideoProductBannerProps = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  videoSrc?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function VideoProductBanner({
  badge = "Samsung Spotlight",
  title = "Move fast on",
  highlight = "flagship demand.",
  description = "Highlight premium Samsung inventory with a secondary campaign section built for retailers, resellers, and distribution partners.",
  videoSrc = "/products/Super_Steady_Video_Galaxy_S26_Ultra_Samsung_720P.mp4",
  primaryHref = "/brands/samsung",
  primaryLabel = "Explore Samsung",
  secondaryHref = "/contact",
  secondaryLabel = "Request Quote",
}: VideoProductBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { accent, contrastColor } = useVideoAccent(videoRef);

  return (
    <section className="relative px-3 sm:px-4 py-2">
      {/* Gradient shadow beneath the card */}
      <div
        className="absolute inset-x-3 sm:inset-x-4 md:inset-x-6 -bottom-4 h-24 sm:h-28 pointer-events-none blur-3xl transition-all duration-700 rounded-b-3xl"
        style={{
          background: `linear-gradient(to bottom, transparent, rgba(${accent},0.82))`,
        }}
      />
      <div
        className="relative w-full rounded-2xl overflow-hidden flex flex-col bg-black transition-shadow duration-700 md:h-132 lg:h-144 xl:h-152"
        style={{
          boxShadow: `0 0 0 1.5px rgba(${accent},0.58), 0 18px 72px 0 rgba(${accent},0.42)`,
        }}
      >
        {/* Video */}
        <div className="relative aspect-video border-b border-white/10 md:absolute md:inset-0 md:aspect-auto md:border-0">
          <video
            ref={videoRef}
            className="block w-full h-full object-contain object-center opacity-95 md:object-cover md:opacity-80"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-5 p-4 sm:p-6 md:absolute md:inset-0 md:justify-between md:p-8 lg:p-10">
          <div>
            <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-medium text-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-green-400" />
              {badge}
            </span>
          </div>

          <div className="w-full max-w-sm sm:max-w-xl space-y-3 sm:space-y-4 md:mt-auto md:rounded-2xl md:border md:border-white/10 md:bg-black/35 md:p-5 md:backdrop-blur-sm lg:p-6">
            <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              {title}{" "}
              <span
                className="transition-all duration-700"
                style={{ color: `rgb(${contrastColor})` }}
              >
                {highlight}
              </span>
            </h2>
            <p className="text-[11px] sm:text-sm text-white/65 font-light max-w-md leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-1">
              <Link
                href={primaryHref}
                className="inline-flex w-fit items-center gap-2 bg-white text-gray-900 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {primaryLabel}{" "}
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex w-fit items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-light border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
