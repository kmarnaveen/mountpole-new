import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wholesale Electronics Blog",
  description:
    "Read MountPole insights on wholesale pricing, liquidation, supply chain resilience, bulk ordering, and electronics market trends.",
  path: "/blog",
  keywords: [
    "wholesale electronics blog",
    "B2B electronics insights",
    "bulk ordering tips",
    "electronics liquidation guide",
  ],
});

const blogPosts = [
  {
    slug: "wholesale-pricing-strategy",
    title: "Optimizing Wholesale Pricing Strategy in 2026",
    excerpt:
      "Learn how to develop competitive pricing strategies that maximize margins while staying competitive in the wholesale electronics market.",
    date: "January 15, 2026",
    category: "Business Strategy",
  },
  {
    slug: "asset-liquidation-guide",
    title: "Complete Guide to Asset Liquidation for Retailers",
    excerpt:
      "Discover how to effectively liquidate excess inventory and transition assets. Expert tips for maximizing returns on unwanted stock.",
    date: "January 10, 2026",
    category: "Asset Management",
  },
  {
    slug: "supply-chain-resilience",
    title: "Building Resilient Supply Chains in Electronics Distribution",
    excerpt:
      "Explore strategies for maintaining supply chain stability and managing disruptions in wholesale electronics distribution.",
    date: "January 5, 2026",
    category: "Supply Chain",
  },
  {
    slug: "mobile-device-trends-2026",
    title: "Mobile Device Market Trends to Watch in 2026",
    excerpt:
      "Stay ahead of the curve with insights into emerging trends in mobile device distribution and consumer electronics.",
    date: "December 28, 2025",
    category: "Market Trends",
  },
  {
    slug: "bulk-ordering-best-practices",
    title: "Best Practices for Bulk Ordering in Wholesale Electronics",
    excerpt:
      "Master the art of bulk ordering to optimize inventory management and reduce per-unit costs.",
    date: "December 20, 2025",
    category: "Wholesale Tips",
  },
  {
    slug: "certified-devices-importance",
    title: "Why Certified Devices Matter in Wholesale Distribution",
    excerpt:
      "Understand the importance of certified, factory-sealed devices and how they impact your business reputation.",
    date: "December 15, 2025",
    category: "Product Quality",
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-3">
            Blog
          </h1>
          <p className="text-foreground/60 font-light text-sm">
            Industry insights and wholesale distribution expertise
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block pb-6 border-b border-border/40 hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-light text-foreground/50">
                      {post.date}
                    </span>
                    <span className="text-xs font-light text-foreground/40">
                      •
                    </span>
                    <span className="text-xs font-medium tracking-wide text-foreground/70">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-light tracking-tight group-hover:text-foreground/80 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm font-light text-foreground/60">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/60 transition-colors flex-shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
