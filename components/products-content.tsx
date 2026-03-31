"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronRight, Search } from "lucide-react"
import { getAllCategories, getProductsByCategory } from "@/lib/brands"
import ProductCard from "@/components/product-card"

export default function ProductsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const categories = getAllCategories()

  const allProducts = useMemo(() => {
    return categories.flatMap((cat) => getProductsByCategory(cat))
  }, [categories])

  const filteredProducts = useMemo(() => {
    let results = allProducts

    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return results
  }, [allProducts, selectedCategory, searchQuery])

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 border-b border-border/40">
        <div className="flex items-center gap-2 text-xs">
          <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-foreground/40" />
          <span className="text-foreground">All Products</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 border-b border-border/40">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-light tracking-tight mb-1">All Products</h1>
            <p className="text-xs text-foreground/60">Browse our comprehensive range of wholesale electronics</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search products, SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border/40 rounded-lg text-sm font-light placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="space-y-4 sticky top-20">
            <div>
              <h3 className="text-xs font-medium tracking-wide mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left text-xs py-1.5 px-2 rounded transition-colors ${
                    selectedCategory === null
                      ? "bg-foreground/10 text-foreground font-light"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5 font-light"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left text-xs py-1.5 px-2 rounded transition-colors ${
                      selectedCategory === cat
                        ? "bg-foreground/10 text-foreground font-light"
                        : "text-foreground/60 hover:text-foreground hover:bg-foreground/5 font-light"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border/40">
              <p className="text-xs text-foreground/40 font-light">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-foreground/60 font-light mb-2">No products found</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
                className="text-xs text-foreground/40 hover:text-foreground transition-colors underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={`${product.brand}-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
