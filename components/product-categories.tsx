"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getAllCategories, getProductsByCategory } from "@/lib/brands";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const categoryImageOverrides: Record<string, string> = {
  Accessories:
    "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwff89d0c0/1.JBL_LIVE_PRO_2_Product%20Image_Hero_Black.png?sw=535&sh=535",
  Displays:
    "https://i0.wp.com/9to5toys.com/wp-content/uploads/sites/5/2026/03/Apple-2026-Studio-Display-deals.png?w=1500&quality=82&strip=all&ssl=1",
  Smartphones: "/products/Samsung/10-pro.png",
};

export default function ProductCategories() {
  const featured = getAllCategories();

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Our Collections
            </h2>
            <p className="text-xs text-gray-400 font-light mt-1">
              Showcase all of the different collections we have to offer.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Framer-style collection carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent>
            {featured.map((category) => {
              const products = getProductsByCategory(category);
              const heroProduct = products.find((p) => p.image);
              const imageOverride = categoryImageOverrides[category];
              const imageSrc = imageOverride ?? heroProduct?.image;
              const slug = category.toLowerCase().replace(/\s+/g, "-");

              return (
                <CarouselItem
                  key={category}
                  className="basis-4/5 sm:basis-1/2 xl:basis-1/3"
                >
                  <Link
                    href={`/categories/${slug}`}
                    className="group relative rounded-2xl bg-gray-50 overflow-hidden aspect-4/3 flex items-end hover:bg-gray-100 transition-colors duration-300"
                  >
                    {/* Floating product image */}
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
                    {/* Category name */}
                    <div className="absolute inset-x-0 top-4 px-5 pointer-events-none">
                      <h3
                        className="font-bold text-gray-900/80 leading-none overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)" }}
                      >
                        {category}
                      </h3>
                    </div>
                    {/* Bottom row */}
                    <div className="relative z-10 w-full flex items-center justify-between px-5 pb-5 pt-16 bg-linear-to-t from-gray-50/90 to-transparent">
                      <span className="text-xs text-gray-400 font-light">
                        {products.length} products
                      </span>
                      <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
