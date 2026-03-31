import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HTML Sitemap",
  description:
    "Human-readable HTML sitemap for navigating MountPole's public pages and content sections.",
  path: "/html-sitemap",
  noIndex: true,
});

const sitemapLinks = {
  Main: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Brands", href: "/brands" },
    { label: "Categories", href: "/categories" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "HTML Sitemap", href: "/html-sitemap" },
  ],
};

export default function HtmlSitemap() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-3">
            HTML Sitemap
          </h1>
          <p className="text-foreground/60 font-light text-sm">
            Complete overview of MountPole website structure and pages
          </p>
        </div>

        <div className="space-y-10">
          {Object.entries(sitemapLinks).map(([section, links]) => (
            <section key={section}>
              <h2 className="text-lg font-light tracking-tight mb-4 text-foreground">
                {section}
              </h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                    >
                      <span className="text-accent">→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="border-t border-border/40 pt-10">
            <h2 className="text-lg font-light tracking-tight mb-4 text-foreground">
              Featured Blog Posts
            </h2>
            <ul className="space-y-2">
              {[
                {
                  label: "Optimizing Wholesale Pricing Strategy in 2026",
                  href: "/blog/wholesale-pricing-strategy",
                },
                {
                  label: "Complete Guide to Asset Liquidation for Retailers",
                  href: "/blog/asset-liquidation-guide",
                },
                {
                  label:
                    "Building Resilient Supply Chains in Electronics Distribution",
                  href: "/blog/supply-chain-resilience",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span className="text-accent">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
