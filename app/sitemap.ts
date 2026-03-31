import type { MetadataRoute } from "next";
import { brands, getAllCategories, products } from "@/lib/brands";
import { absoluteUrl } from "@/lib/seo";

const blogSlugs = [
  "wholesale-pricing-strategy",
  "asset-liquidation-guide",
  "supply-chain-resilience",
  "mobile-device-trends-2026",
  "bulk-ordering-best-practices",
  "certified-devices-importance",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/brands"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/categories"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: absoluteUrl(`/brands/${brand.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map(
    (category) => ({
      url: absoluteUrl(
        `/categories/${category.toLowerCase().replace(/\s+/g, "-")}`,
      ),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const productPages: MetadataRoute.Sitemap = Object.entries(products).flatMap(
    ([brand, brandProducts]) =>
      brandProducts.map((product) => ({
        url: absoluteUrl(`/products/${brand}/${product.id}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      })),
  );

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...brandPages,
    ...categoryPages,
    ...productPages,
    ...blogPages,
  ];
}
