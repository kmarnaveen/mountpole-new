import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ProductCategories from "@/components/product-categories";
import VideoProductBanner from "@/components/video-product-banner";
import ValueProps from "@/components/value-props";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import LeadModal from "@/components/lead-modal";
import { buildMetadata } from "@/lib/seo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const metadata = buildMetadata({
  title: "Wholesale Electronics Distributor in Canada & USA",
  description:
    "MountPole supplies bulk smartphones, tablets, audio devices, displays, accessories, and liquidation inventory to retailers, resellers, and distributors across Canada and the United States.",
  path: "/",
  keywords: [
    "wholesale electronics distributor",
    "bulk smartphones",
    "wholesale tablets",
    "audio device wholesaler",
    "electronics liquidation",
    "B2B electronics supplier",
  ],
  image: "/products/iphone_17pro__0s6piftg70ym_large.jpg",
});

const FEATURED_PRODUCTS = [
  {
    label: "NEW",
    name: "iPhone 17 Pro",
    statement:
      "All-out premium inventory for retailers moving flagship demand.",
    meta: "Bulk pricing available",
    href: "/products/apple/a12",
    image:
      "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-compare-iphone-17-pro-202509?wid=400&hei=512&fmt=png-alpha&.v=M0dlUVBobHVpY1h1dmlaR3RZekpEMi9sbCsxVVJmYjNiS29STjQrZEV5NnNlL1VpWDFHcHBMQXVUWWdWdkZZNGJPbDJJWDFrVGJEYlIxTitTcHhVWldNTk4rSDJkMy8vL20va2hrM1NheXZ4VldteDRHenNWeThpV3EzUWVVd2o",
    cardClassName: "bg-stone-50",
  },
  {
    label: "FLAGSHIP",
    name: "Galaxy S25 Ultra",
    statement:
      "High-demand Android stock for stores that lead with top-tier devices.",
    meta: "Fast-moving Samsung inventory",
    href: "/products/samsung/s11",
    image:
      "/products/Samsung/in-galaxy-s25-s938-sm-s938bztbins-thumb-544702943.png",
    cardClassName: "bg-slate-50",
  },
  {
    label: "PREMIUM AUDIO",
    name: "AirPods Max",
    statement: "Premium audio that raises basket value and gifting appeal.",
    meta: "Wholesale audio availability",
    href: "/products/apple/a26",
    image: "/products/airpods_max_stardust__l9lr6719rmaa_large.png",
    cardClassName: "bg-zinc-50",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />

      <ProductCategories />

      {/* The latest */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-4xl pr-16 sm:pr-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              <span className="text-gray-900">The latest.</span>{" "}
              <span className="text-gray-400">
                Take a look at what&apos;s moving right now.
              </span>
            </h2>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Browse full catalog <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="relative">
            <CarouselContent>
              {FEATURED_PRODUCTS.map((product) => (
                <CarouselItem
                  key={product.name}
                  className="basis-4/5 sm:basis-md lg:basis-120"
                >
                  <Link href={product.href} className="group block h-full">
                    <article
                      className={`relative overflow-hidden rounded-4xl aspect-3/4 ${product.cardClassName} shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:-translate-y-1`}
                    >
                      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                        <div className="max-w-60 space-y-2">
                          <p className="text-[11px] font-semibold tracking-[0.22em] text-gray-500 uppercase">
                            {product.label}
                          </p>
                          <h3 className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight text-gray-900 leading-tight">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed">
                            {product.statement}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-4">
                          <p className="text-sm font-medium text-gray-700">
                            {product.meta}
                          </p>
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-white">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-white/55 via-white/10 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center px-6 pb-6 pointer-events-none">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={420}
                          height={420}
                          className="w-auto max-h-[56%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    </article>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:inline-flex -top-19 left-auto right-11 translate-y-0 border-0 bg-gray-100 text-gray-700 shadow-none hover:bg-gray-900 hover:text-white" />
            <CarouselNext className="hidden sm:inline-flex -top-19 right-0 translate-y-0 border-0 bg-gray-100 text-gray-700 shadow-none hover:bg-gray-900 hover:text-white" />
          </Carousel>
        </div>
      </section>

      <VideoProductBanner
        badge="Google Pixel Focus"
        title="Bring more attention to"
        highlight="the Pixel lineup."
        description="Feature the latest Google Pixel range with a motion-led section built for wholesale buyers, resellers, and retail partners."
        videoSrc="/products/Meet_the_New_Pixel_Lineup_Engineered_by_Google_For_All_You_Do_720P.mp4"
        primaryHref="/brands/google"
        primaryLabel="Explore Google"
        secondaryHref="/contact"
        secondaryLabel="Request Quote"
      />

      <Services />
      <VideoProductBanner />
      <ValueProps />
      <CTA />
      <Footer />
      <LeadModal />
    </main>
  );
}
