"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <footer className="bg-background px-3 sm:px-5 lg:px-8 pb-4 sm:pb-6 pt-2">
      <div className="bg-[#111111] rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Top — logo + email */}
          <div className="px-5 sm:px-8 md:px-12 pt-8 sm:pt-10 md:pt-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-md flex items-center justify-center shrink-0">
                  <span className="text-black font-bold text-[10px] sm:text-xs tracking-tight">
                    MP
                  </span>
                </div>
                <span className="text-white font-light text-base sm:text-lg tracking-wide">
                  MountPole
                </span>
              </div>
              <p className="text-white/40 text-xs sm:text-sm font-light leading-relaxed max-w-65 sm:max-w-xs">
                Leading B2B distributor of premium electronics across North
                America.
              </p>
            </div>

            <a
              href="mailto:info@mountpole.com"
              className="flex items-center gap-2 text-white/45 hover:text-white/75 transition-colors text-xs sm:text-sm font-light sm:mt-1"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              info@mountpole.com
            </a>
          </div>

          {/* Links + Newsletter */}
          <div className="px-5 sm:px-8 md:px-12 pt-8 sm:pt-10 pb-6 sm:pb-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Products */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-white/90 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase">
                Products
              </h4>
              <nav className="space-y-2 sm:space-y-2.5">
                <Link
                  href="/products"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  All Products
                </Link>
                <Link
                  href="/categories"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/brands"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Brands
                </Link>
                <Link
                  href="/contact"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Special Orders
                </Link>
              </nav>
            </div>

            {/* Company */}
            <div className="space-y-2.5 sm:space-y-3">
              <h4 className="text-white/90 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase">
                Company
              </h4>
              <nav className="space-y-2 sm:space-y-2.5">
                <Link
                  href="/about"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block text-xs sm:text-sm text-white/45 hover:text-white/80 font-light transition-colors"
                >
                  Terms of Service
                </Link>
              </nav>
            </div>

            {/* Newsletter — full width on mobile, 2-col span on md+ */}
            <div className="col-span-2 space-y-2.5 sm:space-y-3">
              <h4 className="text-white/90 text-[10px] sm:text-[11px] font-medium tracking-widest uppercase">
                Stay up to date
              </h4>
              <p className="text-xs sm:text-sm text-white/45 font-light">
                Get the latest wholesale deals and exclusive pricing updates.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col xs:flex-row gap-2 mt-1"
              >
                {submitted ? (
                  <p className="text-xs sm:text-sm text-emerald-400 font-light py-2.5">
                    Thanks! We&apos;ll keep you posted.
                  </p>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full sm:flex-1 min-w-0 bg-white/[0.07] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 font-light"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-lg transition-colors shrink-0 cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* /max-w-7xl */}

        {/* Giant wordmark */}
        <div className="overflow-hidden leading-none select-none text-center">
          <span
            className="text-white font-bold block"
            style={{ fontSize: "clamp(48px, 17.5vw, 280px)", lineHeight: 0.88 }}
          >
            MountPole
          </span>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto">
          <div className="px-5 sm:px-8 md:px-12 py-4 sm:py-5 mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/8">
            <p className="text-white/30 text-[10px] sm:text-xs font-light">
              © 2026. All rights reserved. MountPole
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-white/30 text-[10px] sm:text-xs font-light">
                @mountpole
              </span>
              <a
                href="https://linkedin.com/company/mountpole"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/35 hover:text-white/70 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://instagram.com/mountpole"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/35 hover:text-white/70 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://twitter.com/mountpole"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-white/35 hover:text-white/70 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
        {/* /max-w-7xl bottom */}
      </div>
    </footer>
  );
}
