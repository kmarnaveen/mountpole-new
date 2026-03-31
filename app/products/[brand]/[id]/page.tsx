import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CopySkuButton from "@/components/copy-sku-button";
import ProductGallery from "@/components/product-gallery";
import ProductActions from "@/components/product-actions";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { brands, products, getProduct, getBrandProducts } from "@/lib/brands";

type ProductDetailParams = Promise<{ brand: string; id: string }>;

export async function generateMetadata({
  params,
}: {
  params: ProductDetailParams;
}): Promise<Metadata> {
  const { brand: brandSlug, id } = await params;
  const product = getProduct(brandSlug, id);
  const brand = brands.find((item) => item.slug === brandSlug);

  if (!product || !brand) {
    return {
      title: "Product Not Found | MountPole",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildMetadata({
    title: `${product.name} Wholesale Supply`,
    description: `${product.description} SKU: ${product.sku}. Source ${brand.name} ${product.category.toLowerCase()} inventory through MountPole's wholesale catalog.`,
    path: `/products/${brandSlug}/${id}`,
    keywords: [
      product.name,
      brand.name,
      `wholesale ${product.category.toLowerCase()}`,
      `${product.category.toLowerCase()} distributor`,
      product.sku,
    ],
    image: product.image,
  });
}

export function generateStaticParams() {
  const params: Array<{ brand: string; id: string }> = [];
  Object.entries(products).forEach(([brand, brandProducts]) => {
    brandProducts.forEach((product) => {
      params.push({ brand, id: product.id });
    });
  });
  return params;
}

export default async function ProductDetailPage({
  params,
}: {
  params: ProductDetailParams;
}) {
  const { brand: brandSlug, id } = await params;
  const product = getProduct(brandSlug, id);
  const brand = brands.find((b) => b.slug === brandSlug);

  if (!product || !brand) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-10">
            <div className="max-w-xl rounded-4xl border border-gray-200 bg-stone-50 p-8">
              <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
                Product unavailable
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
                Product not found.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                The product you requested is no longer available in the current
                wholesale catalog.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Browse products
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryHref = `/categories/${product.category
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
  const productImages = Array.from(
    new Set(
      [product.image, ...(product.gallery ?? [])].filter(
        (image): image is string => Boolean(image),
      ),
    ),
  );
  const galleryImages =
    productImages.length > 0 ? productImages : ["/placeholder.svg"];
  const relatedProducts = getBrandProducts(brand.slug)
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  const productUrl = absoluteUrl(`/products/${brandSlug}/${id}`);
  const productImageUrls = galleryImages.map((image) => absoluteUrl(image));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImageUrls,
    sku: product.sku,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    url: productUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: absoluteUrl("/products"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: brand.name,
        item: absoluteUrl(`/brands/${brand.slug}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
          <section className="py-6 md:py-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400">
              <Link
                href="/products"
                className="transition-colors hover:text-gray-700"
              >
                Products
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link
                href={`/brands/${brand.slug}`}
                className="capitalize transition-colors hover:text-gray-700"
              >
                {brand.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span>{product.name}</span>
            </div>
          </section>

          <section className="pb-12 pt-2 md:pb-16">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <ProductGallery
                  images={galleryImages}
                  productName={product.name}
                />
              </div>

              <aside className="lg:col-span-5">
                <div className="space-y-4 lg:sticky lg:top-24">
                  <div className="rounded-4xl border border-gray-200 bg-white p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/brands/${brand.slug}`}
                        className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-stone-50 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-stone-100"
                      >
                        {brand.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            className="h-4 w-auto max-w-18 object-contain"
                          />
                        ) : null}
                        <span>{brand.name}</span>
                      </Link>
                      <Link
                        href={categoryHref}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
                      >
                        {product.category}
                      </Link>
                    </div>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
                      {product.name}
                    </h1>
                    <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
                      {product.description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-3xl border border-gray-200 bg-stone-50 p-4">
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                          Brand
                        </p>
                        <Link
                          href={`/brands/${brand.slug}`}
                          className="mt-3 inline-flex text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
                        >
                          {brand.name}
                        </Link>
                      </div>
                      <div className="rounded-3xl border border-gray-200 bg-stone-50 p-4">
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                          Category
                        </p>
                        <Link
                          href={categoryHref}
                          className="mt-3 inline-flex text-sm font-medium text-gray-900 transition-colors hover:text-gray-600"
                        >
                          {product.category}
                        </Link>
                      </div>
                      <div className="rounded-3xl border border-gray-200 bg-stone-50 p-4">
                        <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                          SKU
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-sm font-medium text-gray-900 font-mono">
                            {product.sku}
                          </span>
                          <CopySkuButton sku={product.sku} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-3xl border border-gray-200 bg-stone-50 p-4 sm:p-5">
                      <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
                        Wholesale support
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-500">
                        Talk to MountPole for current pricing, availability, and
                        lead-time guidance on this product and related catalog
                        inventory.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
                          Quote support
                        </span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
                          Same-day processing
                        </span>
                        <span className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700">
                          Canada + USA coverage
                        </span>
                      </div>
                    </div>
                  </div>

                  <ProductActions
                    productName={product.name}
                    productSku={product.sku}
                    brandName={brand.name}
                  />
                </div>
              </aside>
            </div>
          </section>

          <section className="border-t border-gray-100 py-10 md:py-12">
            <div className="grid gap-4 lg:grid-cols-12">
              <article className="rounded-4xl border border-gray-200 bg-stone-50 p-6 sm:p-8 lg:col-span-7">
                <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
                  Product details
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  Built for wholesale catalog planning.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                  Use this product page to review core identity details, align
                  brand and category placement, and move quickly into pricing
                  and availability discussions.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                      Product
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                      Brand portfolio
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {brand.productCount} products in the {brand.name} range
                    </p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                      Category path
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {brand.name} / {product.category}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                      Gallery assets
                    </p>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {galleryImages.length} product image
                      {galleryImages.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </article>

              <aside className="rounded-4xl bg-gray-900 p-6 text-white sm:p-8 lg:col-span-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/55 uppercase">
                  About the brand
                </p>

                <div className="mt-4 flex items-center gap-3">
                  {brand.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="h-5 w-auto max-w-24 object-contain brightness-0 invert"
                    />
                  ) : null}
                  <span className="text-sm font-medium text-white/80">
                    {brand.name}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {brand.name} wholesale range.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                  {brand.description}. Explore the wider portfolio to compare
                  related products and build out a stronger category mix.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xl font-semibold tracking-tight text-white">
                      {brand.productCount}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      products in the brand portfolio
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
                    <p className="text-xl font-semibold tracking-tight text-white">
                      {brand.featured ? "Featured" : "Catalog"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      positioning within MountPole&apos;s wholesale assortment
                    </p>
                  </div>
                </div>

                <Link
                  href={`/brands/${brand.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/8"
                >
                  View {brand.name} brand page
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </aside>
            </div>
          </section>

          {relatedProducts.length > 0 ? (
            <section className="pb-16">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
                    More from {brand.name}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                    Continue with the rest of the {brand.name} lineup.
                  </h2>
                </div>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                  View all {brand.name} products
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={`${brand.slug}-${relatedProduct.id}`}
                    href={`/products/${brand.slug}/${relatedProduct.id}`}
                    className="group overflow-hidden rounded-4xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300"
                  >
                    <div className="aspect-square bg-stone-50 p-6">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={500}
                        height={500}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">
                        {relatedProduct.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-gray-900">
                        {relatedProduct.name}
                      </h3>
                      <div className="mt-4 flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                        <span className="text-sm font-medium text-gray-700 font-mono">
                          {relatedProduct.sku}
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
