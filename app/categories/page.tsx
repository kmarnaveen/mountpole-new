import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAllCategories, getProductsByCategory } from "@/lib/brands";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wholesale Electronics Categories",
  description:
    "Browse wholesale product categories including smartphones, tablets, audio, displays, accessories, and more from MountPole.",
  path: "/categories",
  keywords: [
    "wholesale electronics categories",
    "smartphone wholesaler",
    "tablet distributor",
    "audio accessories wholesale",
  ],
});

export default function CategoriesPage() {
  const categories = getAllCategories();

  const categoryImageOverrides: Record<string, string> = {
    Accessories:
      "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwff89d0c0/1.JBL_LIVE_PRO_2_Product%20Image_Hero_Black.png?sw=535&sh=535",
    Displays:
      "https://i0.wp.com/9to5toys.com/wp-content/uploads/sites/5/2026/03/Apple-2026-Studio-Display-deals.png?w=1500&quality=82&strip=all&ssl=1",
    Smartphones: "/products/Samsung/10-pro.png",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-8 md:py-12">
          {/* Hero banner */}
          <section className="rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 mb-6 shadow-sm">
              Categories
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-2xl leading-tight">
              Explore our product categories.
            </h1>
            <p className="text-sm text-gray-400 font-light mt-4 max-w-md leading-relaxed">
              Browse wholesale electronics across {categories.length} categories
              — from smartphones to accessories.
            </p>
          </section>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
            {categories.map((category) => {
              const categoryProducts = getProductsByCategory(category);
              const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
              const heroProduct = categoryProducts.find((p) => p.image);
              const imageSrc =
                categoryImageOverrides[category] ?? heroProduct?.image;

              return (
                <Link
                  key={category}
                  href={`/categories/${categorySlug}`}
                  className="group relative rounded-2xl bg-gray-50 overflow-hidden aspect-4/3 flex items-end hover:bg-gray-100 transition-colors duration-300"
                >
                  {/* Large floating product image */}
                  {imageSrc && (
                    <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none">
                      <Image
                        src={imageSrc}
                        alt={category}
                        width={220}
                        height={220}
                        className="w-auto max-h-44 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Large category name overlay */}
                  <div className="absolute inset-x-0 top-4 px-5 pointer-events-none">
                    <h2
                      className="font-bold text-gray-900/80 leading-none overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)" }}
                    >
                      {category}
                    </h2>
                  </div>

                  {/* Bottom row */}
                  <div className="relative z-10 w-full flex items-center justify-between px-5 pb-5 pt-16 bg-linear-to-t from-gray-50/90 to-transparent">
                    <span className="text-xs text-gray-400 font-light">
                      {categoryProducts.length} products
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
