import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About MountPole",
  description:
    "Learn how MountPole supports retailers, resellers, and distribution partners with 20+ years of wholesale electronics experience across North America.",
  path: "/about",
  keywords: [
    "about MountPole",
    "wholesale electronics distributor",
    "B2B electronics supplier",
    "Canada USA distribution",
  ],
});

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-3">
            About MountPole
          </h1>
          <p className="text-foreground/60 font-light text-sm">
            Pioneering wholesale electronics distribution across North America
            since 2004
          </p>
        </div>

        <div className="space-y-10">
          <section className="prose prose-invert max-w-none">
            <h2 className="text-xl font-light tracking-tight mb-3">
              Our Mission
            </h2>
            <p className="text-sm font-light text-foreground/70 leading-relaxed">
              At MountPole, we're committed to empowering retailers, resellers,
              and businesses across North America with access to premium
              wholesale electronics at competitive prices. Our mission is to be
              the most reliable, efficient, and customer-focused wholesale
              distributor in the industry.
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-xl font-light tracking-tight mb-3">
              Our Values
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-1">
                  Reliability
                </h3>
                <p className="text-xs font-light text-foreground/60">
                  Consistent delivery of quality products and exceptional
                  service, every single day.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-1">
                  Integrity
                </h3>
                <p className="text-xs font-light text-foreground/60">
                  Transparent pricing, honest communication, and ethical
                  business practices.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-1">
                  Innovation
                </h3>
                <p className="text-xs font-light text-foreground/60">
                  Continuously improving our supply chain and services to meet
                  evolving market needs.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-wide mb-1">
                  Partnership
                </h3>
                <p className="text-xs font-light text-foreground/60">
                  Building long-term relationships with our customers based on
                  mutual growth and success.
                </p>
              </div>
            </div>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-xl font-light tracking-tight mb-3">
              Our Story
            </h2>
            <p className="text-sm font-light text-foreground/70 leading-relaxed">
              Founded in 2004, MountPole emerged from a simple vision: to
              revolutionize wholesale electronics distribution by combining
              competitive pricing with exceptional customer service. Over two
              decades, we've grown to serve over 50,000 satisfied customers
              across Canada and the United States.
            </p>
            <p className="text-sm font-light text-foreground/70 leading-relaxed mt-3">
              Our expertise spans mobile phones, tablets, smart devices, and
              consumer electronics, with a specialized focus on asset
              liquidation services for businesses in transition. Today, we
              maintain one of the largest inventories of certified,
              factory-sealed devices in North America.
            </p>
          </section>

          <section className="prose prose-invert max-w-none">
            <h2 className="text-xl font-light tracking-tight mb-3">
              Why Choose MountPole
            </h2>
            <ul className="space-y-2 text-sm font-light text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>1000+ SKUs with competitive wholesale pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Same-day order processing and rapid fulfillment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Dedicated account management for bulk orders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>Industry-leading asset liquidation expertise</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>24/7 customer support across North America</span>
              </li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-border/40">
            <Button asChild className="rounded-full font-light tracking-wide">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
