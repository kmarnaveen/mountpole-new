import Link from "next/link";
import { ArrowUpRight, Clock3, Mail, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/seo";

const sourcingSignals = [
  {
    value: "1,000+",
    label:
      "SKUs across smartphones, tablets, audio, displays, and accessories.",
  },
  {
    value: "Same day",
    label: "Order processing backed by rapid wholesale fulfillment.",
  },
  {
    value: "Canada + USA",
    label: "Cross-border coverage for North American buyers.",
  },
];

const commonRequests = [
  "Pricing and availability",
  "Bulk order support",
  "Retailer programs",
  "Liquidation inventory",
];

const contactCards = [
  {
    title: "Sales",
    value: siteConfig.emails.sales,
    href: `mailto:${siteConfig.emails.sales}`,
    detail: "Product availability, pricing, and wholesale account inquiries.",
    icon: Mail,
  },
  {
    title: "Call or WhatsApp",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phoneHref}`,
    detail:
      "Speak directly with the team about current inventory and lead times.",
    icon: PhoneCall,
  },
  {
    title: "Business Hours",
    value: "Mon - Fri, 9AM - 6PM EST",
    detail:
      "Fast follow-up for bulk orders, retailer programs, and partnership requests.",
    icon: Clock3,
  },
];

export default function CTA() {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-4xl bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
          <div className="grid gap-4 lg:grid-cols-12">
            <article className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:col-span-7 lg:px-10 lg:py-12">
              <div className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute left-8 top-24 h-24 w-24 rounded-full bg-white/6 blur-3xl" />

              <p className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
                Ready to source?
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight leading-tight sm:text-4xl lg:text-5xl">
                Start sourcing premium electronics at wholesale prices.
                <span className="block text-white/45">
                  Built for repeat buyers, retailers, and distribution teams.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Work with MountPole to secure fast-moving inventory, verified
                stock, and dependable cross-border fulfillment for retail,
                resale, and distribution demand without slowing down your buying
                cycle.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {sourcingSignals.map((signal) => (
                  <div
                    key={signal.value}
                    className="rounded-3xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
                  >
                    <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {signal.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {signal.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
                >
                  Request pricing
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/8"
                >
                  Browse inventory
                </Link>
              </div>

              <p className="mt-5 text-sm text-white/45">
                Sales response within 24 hours. WhatsApp available. Mon - Fri,
                9AM - 6PM EST.
              </p>
            </article>

            <aside className="bg-white/6 px-6 py-6 sm:px-8 sm:py-8 lg:col-span-5 lg:border-l lg:border-white/10">
              <p className="text-xs font-semibold tracking-[0.22em] text-white/50 uppercase">
                Direct lines
              </p>

              <div className="mt-4 space-y-3">
                {contactCards.map((card) => {
                  const Icon = card.icon;

                  const content = (
                    <>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">
                          {card.title}
                        </p>
                        <p className="mt-2 text-sm font-medium text-white wrap-break-word">
                          {card.value}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-white/60">
                          {card.detail}
                        </p>
                      </div>
                      {card.href ? (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/80 transition-colors group-hover:bg-white group-hover:text-gray-900">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      ) : null}
                    </>
                  );

                  if (card.href) {
                    return (
                      <a
                        key={card.title}
                        href={card.href}
                        className="group flex gap-4 rounded-3xl border border-white/10 bg-black/10 p-4 transition-colors hover:bg-white/8"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div
                      key={card.title}
                      className="flex gap-4 rounded-3xl border border-white/10 bg-black/10 p-4"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">
                  Common requests
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {commonRequests.map((request) => (
                    <span
                      key={request}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/80"
                    >
                      {request}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Best for retailers, resellers, distributors, and buyers
                  sourcing premium electronics or liquidation inventory at
                  wholesale scale.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
