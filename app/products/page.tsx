import { Suspense } from "react";
import ProductsContent from "@/components/products-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wholesale Electronics Catalog",
  description:
    "Browse MountPole's wholesale catalog of smartphones, tablets, audio devices, displays, and accessories from leading global brands.",
  path: "/products",
  keywords: [
    "wholesale electronics catalog",
    "bulk mobile phones",
    "wholesale consumer electronics",
    "electronics distributor catalog",
  ],
});

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}
