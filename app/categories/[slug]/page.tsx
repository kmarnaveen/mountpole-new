import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { buildMetadata } from "@/lib/seo";
import { getAllCategories, getProductsByCategory } from "@/lib/brands";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const actualCategory = getAllCategories().find(
    (category) => category.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!actualCategory) {
    return {
      title: "Category Not Found | MountPole",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const products = getProductsByCategory(actualCategory);

  return buildMetadata({
    title: `Wholesale ${actualCategory}`,
    description: `Browse ${products.length} wholesale ${actualCategory.toLowerCase()} products from MountPole, including inventory from top global brands.`,
    path: `/categories/${slug}`,
    keywords: [
      `${actualCategory.toLowerCase()} wholesale`,
      `bulk ${actualCategory.toLowerCase()}`,
      `${actualCategory.toLowerCase()} distributor`,
    ],
    image: products[0]?.image,
  });
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allCategories = getAllCategories();
  const actualCategory = allCategories.find(
    (c) => c.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!actualCategory) {
    notFound();
  }

  const products = getProductsByCategory(actualCategory);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <div className="py-5 md:py-6">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-light text-gray-400 hover:text-gray-700 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              All Categories
            </Link>
          </div>

          {/* Hero */}
          <section className="rounded-2xl border border-gray-100 bg-gray-50 px-6 sm:px-10 py-10 sm:py-12 mb-8">
            <p className="text-[11px] font-medium tracking-widest text-gray-400 uppercase mb-3">
              Category
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              {actualCategory}
            </h1>
            <div className="flex items-center gap-6 mt-5">
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.length}
                </p>
                <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase mt-0.5">
                  Products
                </p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-2xl font-semibold text-gray-900">B2B</p>
                <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase mt-0.5">
                  Wholesale
                </p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </section>

          {/* Products section header */}
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-900 tracking-tight">
              All Products
            </h2>
            <span className="text-xs text-gray-400 font-light">
              {products.length} items
            </span>
          </div>

          {/* Products grid */}
          <section className="pb-16">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={`${product.brand}-${product.id}`}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-gray-50 border border-gray-100">
                <Package className="w-8 h-8 text-gray-300 mb-3" />
                <p className="text-sm font-light text-gray-400">
                  No products in this category yet
                </p>
                <Link
                  href="/contact"
                  className="mt-4 text-xs font-medium text-gray-900 underline underline-offset-4"
                >
                  Contact us to enquire
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
