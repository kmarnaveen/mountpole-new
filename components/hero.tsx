"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useVideoAccent } from "@/hooks/use-video-accent";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { accent, contrastColor } = useVideoAccent(videoRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      if (video.currentTime >= 124) {
        video.currentTime = 0;
        video.play();
      }
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <section className="relative px-3 sm:px-4 pt-3 pb-0">
      {/* Gradient shadow beneath the card */}
      <div
        className="absolute inset-x-3 sm:inset-x-4 md:inset-x-6 -bottom-4 h-28 sm:h-32 pointer-events-none blur-3xl transition-all duration-700 rounded-b-3xl"
        style={{
          background: `linear-gradient(to bottom, transparent, rgba(${accent},0.85))`,
        }}
      />
      <div
        className="relative w-full rounded-2xl overflow-hidden flex flex-col bg-black transition-shadow duration-700 md:h-152 lg:h-168 xl:h-176"
        style={{
          boxShadow: `0 0 0 1.5px rgba(${accent},0.6), 0 20px 80px 0 rgba(${accent},0.5)`,
        }}
      >
        {/* Video */}
        <div className="relative aspect-video border-b border-white/10 md:absolute md:inset-0 md:aspect-auto md:border-0">
          <video
            ref={videoRef}
            className="block w-full h-full object-contain object-center opacity-95 md:object-cover md:opacity-80"
            src="/products/New_things_on_the_way_from_Apple_720P.mp4"
            autoPlay
            muted
            playsInline
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6 p-4 sm:p-6 md:absolute md:inset-0 md:justify-between md:p-10 lg:p-14">
          {/* Top badge */}
          <div>
            <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-medium text-white/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-green-400" />
              B2B Wholesale Distribution — CA &amp; US
            </span>
          </div>

          {/* Main content */}
          <div className="w-full max-w-sm sm:max-w-xl space-y-3 sm:space-y-5 md:mt-auto md:rounded-2xl md:border md:border-white/10 md:bg-black/35 md:p-5 md:backdrop-blur-sm lg:p-6">
            <h1 className="text-[1.95rem] sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              The premium way to source{" "}
              <span
                className="transition-all duration-700"
                style={{ color: `rgb(${contrastColor})` }}
              >
                wholesale electronics.
              </span>
            </h1>
            <p className="text-[11px] sm:text-sm text-white/65 font-light max-w-md leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
              Trusted B2B distributor serving retailers, resellers, and
              businesses across North America with competitive pricing and
              reliable supply.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 pt-1">
              <Link
                href="/products"
                className="inline-flex w-fit items-center gap-2 bg-white text-gray-900 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Products
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 bg-white/10 text-white rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-light border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Get Wholesale Price
              </Link>
            </div>

            {/* Stats */}
          </div>
        </div>
      </div>
    </section>
  );
}
