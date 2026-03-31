import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BrandCard from "@/components/brand-card";
import { brands } from "@/lib/brands";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wholesale Electronics Brands",
  description:
    "Explore MountPole's wholesale brand portfolio including Apple, Samsung, Google, Xiaomi, Motorola, JBL, Huawei, Honor, and more.",
  path: "/brands",
  keywords: [
    "wholesale electronics brands",
    "Apple distributor",
    "Samsung wholesaler",
    "bulk electronics brands",
  ],
});

export default function BrandsPage() {
  const featuredBrands = brands.filter((b) => b.featured);
  const otherBrands = brands.filter((b) => !b.featured);
  const totalProducts = brands.reduce(
    (total, brand) => total + brand.productCount,
    0,
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8 md:py-12">
          <section className="mb-12 overflow-hidden rounded-4xl border border-gray-200 bg-stone-50">
            <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-500">
                Brand Portfolio
              </span>

              <div className="mt-6 max-w-4xl">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900 leading-tight sm:text-5xl lg:text-6xl">
                  Premium technology brands.
                  <span className="block text-gray-400">
                    Selected for demand that already exists in the market.
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
                  Explore wholesale access to flagship smartphones, audio,
                  accessories, and consumer electronics from brands retailers,
                  resellers, and distributors already know how to move.
                </p>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                  <span>
                    <span className="font-semibold text-gray-900">
                      {brands.length}
                    </span>{" "}
                    brand partners
                  </span>
                  <span>
                    <span className="font-semibold text-gray-900">
                      {totalProducts}
                    </span>{" "}
                    products across the portfolio
                  </span>
                  <span>
                    <span className="font-semibold text-gray-900">
                      Canada + USA
                    </span>{" "}
                    coverage
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
                  Featured
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
                  Brands with the strongest wholesale pull.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Start with the names wholesale buyers ask for first.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {featuredBrands.map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/brands/${brand.slug}`}
                      className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-stone-50"
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
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-400">
                {featuredBrands.length} featured partners
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {featuredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} variant="featured" />
              ))}
            </div>
          </section>

          <section className="pb-16 border-t border-gray-100 pt-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-gray-400 uppercase">
                  Extended portfolio
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
                  More brands across the catalog.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  Broaden your assortment with additional brands across mobile,
                  audio, and consumer electronics.
                </p>
              </div>
              <span className="text-sm text-gray-400">
                {otherBrands.length} additional brands
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {otherBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} variant="compact" />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
