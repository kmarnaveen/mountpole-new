"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    label: "Source",
    parallaxOffset: -10,
    title: "Buy fast-moving electronics in bulk",
    description:
      "Build assortments around the categories your customers already ask for instead of chasing product one request at a time.",
    items: [
      "1,000+ SKUs across smartphones, tablets, audio, displays, and accessories",
      "Apple, Samsung, Google, Xiaomi, JBL, and more",
      "Asset liquidation opportunities when timing makes sense",
    ],
    cardClassName: "border-gray-200 bg-white",
    iconClassName: "bg-emerald-50 text-emerald-700",
    numberClassName: "text-gray-100",
    labelClassName: "text-gray-400",
    titleClassName: "text-gray-900",
    descriptionClassName: "text-gray-600",
    listClassName: "text-gray-700",
    dividerClassName: "border-black/5",
    bulletClassName: "bg-emerald-500",
  },
  {
    number: "02",
    label: "Verify",
    parallaxOffset: 14,
    title: "Choose stock your team can sell with confidence",
    description:
      "Work from inventory options that are easier to merchandise, support, and move without avoidable surprises after purchase.",
    items: [
      "Factory-sealed and verified inventory options",
      "Checked stock designed to reduce downstream issues",
      "Built for resale confidence and shelf-ready presentation",
    ],
    cardClassName: "border-gray-900 bg-gray-950",
    iconClassName: "bg-white/10 text-white",
    numberClassName: "text-white/10",
    labelClassName: "text-white/45",
    titleClassName: "text-white",
    descriptionClassName: "text-white/70",
    listClassName: "text-white/80",
    dividerClassName: "border-white/10",
    bulletClassName: "bg-white/70",
  },
  {
    number: "03",
    label: "Deliver",
    parallaxOffset: -12,
    title: "Keep fulfillment dependable across borders",
    description:
      "Move from quote to shipment with an operating model designed for repeat wholesale buying across North America.",
    items: [
      "Same-day order processing and rapid fulfillment",
      "Dedicated account management for bulk orders",
      "Tracked delivery across Canada and the United States",
    ],
    cardClassName: "border-amber-100 bg-amber-50",
    iconClassName: "bg-white text-amber-700",
    numberClassName: "text-amber-100",
    labelClassName: "text-amber-700/55",
    titleClassName: "text-gray-900",
    descriptionClassName: "text-gray-600",
    listClassName: "text-gray-700",
    dividerClassName: "border-black/5",
    bulletClassName: "bg-amber-500",
  },
];

const proofStats = [
  {
    value: "20+",
    label: "Years in wholesale electronics",
    detail: "Founded in 2004 and still focused on B2B distribution.",
  },
  {
    value: "50K+",
    label: "Satisfied customers served",
    detail: "Built through repeat business across North America.",
  },
  {
    value: "1,000+",
    label: "SKUs in the inventory mix",
    detail: "Covering fast-moving consumer electronics categories.",
  },
  {
    value: "Same day",
    label: "Order processing",
    detail: "Supported by rapid fulfillment and tracked shipping.",
  },
];

const buyerTypes = [
  "Retailers",
  "Resellers",
  "Distributors",
  "Liquidation buyers",
];

export default function ValueProps() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const proofGlowRef = useRef<HTMLDivElement | null>(null);
  const factsGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const resetParallax = () => {
      numberRefs.current.forEach((element) => {
        if (element) {
          element.style.transform = "translate3d(0, 0, 0)";
        }
      });

      if (proofGlowRef.current) {
        proofGlowRef.current.style.transform = "translate3d(0, 0, 0)";
      }

      if (factsGlowRef.current) {
        factsGlowRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const updateParallax = () => {
      frame = 0;

      const section = sectionRef.current;

      if (!section || mediaQuery.matches || window.innerWidth < 1024) {
        resetParallax();
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight,
        ),
      );

      numberRefs.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const offset = pillars[index]?.parallaxOffset ?? 0;
        element.style.transform = `translate3d(0, ${progress * offset}px, 0)`;
      });

      if (proofGlowRef.current) {
        proofGlowRef.current.style.transform = `translate3d(0, ${progress * 18}px, 0)`;
      }

      if (factsGlowRef.current) {
        factsGlowRef.current.style.transform = `translate3d(0, ${progress * -16}px, 0)`;
      }
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateParallax);
    };

    const handleMotionPreference = () => {
      requestUpdate();
    };

    updateParallax();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mediaQuery.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase">
              What we do
            </p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
              We help businesses source, verify, and move fast-selling
              electronics in bulk.
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base lg:col-span-5 lg:ml-auto">
            Premium devices, verified stock, and dependable wholesale
            fulfillment for retailers, resellers, distributors, and liquidation
            buyers across Canada and the United States.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            return (
              <article
                key={pillar.number}
                className={`group relative overflow-hidden rounded-4xl border p-6 shadow-sm sm:p-7 ${pillar.cardClassName}`}
              >
                <span
                  ref={(element) => {
                    numberRefs.current[index] = element;
                  }}
                  className={`pointer-events-none absolute right-5 top-3 text-7xl font-semibold tracking-tight ${pillar.numberClassName}`}
                >
                  {pillar.number}
                </span>

                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`text-xs font-semibold tracking-[0.22em] uppercase ${pillar.labelClassName}`}
                  >
                    {pillar.label}
                  </span>
                </div>

                <h3
                  className={`relative z-10 mt-12 max-w-xs text-2xl font-semibold tracking-tight leading-tight sm:text-3xl ${pillar.titleClassName}`}
                >
                  {pillar.title}
                </h3>

                <p
                  className={`relative z-10 mt-3 text-sm leading-relaxed sm:text-base ${pillar.descriptionClassName}`}
                >
                  {pillar.description}
                </p>

                <div
                  className={`relative z-10 mt-8 border-t pt-4 ${pillar.dividerClassName}`}
                >
                  <ul className="space-y-2.5">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-3 text-sm leading-relaxed ${pillar.listClassName}`}
                      >
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${pillar.bulletClassName}`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <article className="relative overflow-hidden rounded-4xl bg-gray-900 p-6 text-white sm:p-8 lg:col-span-5">
            <div
              ref={proofGlowRef}
              className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-3xl will-change-transform"
            />
            <div className="pointer-events-none absolute -bottom-12 left-8 h-28 w-28 rounded-full bg-white/6 blur-3xl" />

            <p className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
              Proof in the operating model
            </p>

            <h3 className="mt-4 max-w-md text-2xl font-semibold tracking-tight leading-tight sm:text-3xl">
              Built on repeat wholesale relationships, not one-off transactions.
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              MountPole has served wholesale buyers since 2004, supports North
              American demand with a broad inventory mix, and keeps bulk orders
              moving with dedicated account handling and rapid processing.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {buyerTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/85"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Request inventory
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/8"
              >
                Browse catalog
              </Link>
            </div>
          </article>

          <div className="relative overflow-hidden rounded-4xl border border-gray-200 bg-stone-50 p-5 sm:p-8 lg:col-span-7">
            <div
              ref={factsGlowRef}
              className="pointer-events-none absolute right-0 top-6 h-32 w-32 rounded-full bg-white opacity-80 blur-3xl will-change-transform"
            />

            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-12">
                <p className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase">
                  Operating facts
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {proofStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-white bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                    >
                      <p className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
