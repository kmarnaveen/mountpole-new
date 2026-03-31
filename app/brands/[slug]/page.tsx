import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import BrandHeader from "@/components/brand-header";
import { getBrand, getBrandProducts, brands } from "@/lib/brands";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrand(slug);

  if (!brand) {
    return {
      title: "Brand Not Found | MountPole",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    title: `Wholesale ${brand.name} Products`,
    description: `Browse ${brand.name} wholesale products for retailers, resellers, and distributors. ${brand.description}`,
    path: `/brands/${slug}`,
    keywords: [
      `${brand.name} wholesale`,
      `${brand.name} distributor`,
      `${brand.name} bulk products`,
      `${brand.category.toLowerCase()} wholesale`,
    ],
    image: brand.logo,
  });
}

export async function generateStaticParams() {
  return brands.map((brand) => ({
    slug: brand.slug,
  }));
}

export default async function BrandProductsPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);

  if (!brand) {
    notFound();
  }

  const products = getBrandProducts(slug);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <div className="py-5 md:py-6">
            <Link
              href="/brands"
              className="inline-flex items-center gap-1.5 text-xs font-light text-gray-400 hover:text-gray-700 transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              All Brands
            </Link>
          </div>

          {/* Brand hero */}
          <BrandHeader
            name={brand.name}
            description={brand.description}
            logo={brand.logo}
            productCount={products.length}
            category={brand.category}
          />

          {/* Products section header */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                All Products
              </h2>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                {products.length} items available for wholesale
              </p>
            </div>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg"
            >
              Request Bulk Quote
            </Link>
          </div>

          {/* Products grid */}
          <section className="pb-16">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={`${slug}-${product.id}`}
                    product={{ ...product, brand: slug }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 rounded-2xl bg-gray-50 border border-gray-100">
                <Package className="w-8 h-8 text-gray-300 mb-3" />
                <p className="text-sm font-light text-gray-400">
                  No products available for this brand yet
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
