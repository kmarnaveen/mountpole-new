'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'

import { Product } from '@/lib/brands'

export default function ProductCard({ product }: { product: Product & { brand: string } }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/products/${product.brand}/${product.id}`}>
      <div className="group cursor-pointer h-full flex flex-col">
        <div className="relative bg-secondary rounded-lg overflow-hidden mb-4 aspect-square">
          {!imageError ? (
            <Image
              src={product.image || `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(product.name)}`}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center">
                <Package className="w-10 h-10 text-foreground/30 mx-auto mb-2" />
                <p className="text-xs text-foreground/40 font-light">Image unavailable</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex-1">
            <p className="text-xs text-foreground/50 font-light mb-2 uppercase tracking-wider">{product.category}</p>
            <h3 className="text-sm font-light line-clamp-2 group-hover:text-foreground/80 transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-foreground/50 font-light line-clamp-2 mt-2">{product.description}</p>
          </div>

          <div className="pt-3 border-t border-border/40 mt-auto">
            <div className="inline-flex items-center gap-2 text-xs font-light text-foreground/60 group-hover:text-foreground/80 transition-colors">
              View Details
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
