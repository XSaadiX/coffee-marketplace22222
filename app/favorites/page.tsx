"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductCard } from "@/components/product-card"
import { useApp } from "@/contexts/app-context"
import { allProducts } from "@/lib/data"

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { favoriteIds } = useApp()
  const favoriteProducts = allProducts.filter((p) => favoriteIds.includes(p.id))

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CartSidebar />
      <main className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-right mb-6">المفضلة</h1>
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">قائمة المفضلة فارغة.</p>
            <p className="text-gray-400 mt-2">أضف بعض المنتجات لرايتها هنا.</p>
          </div>
        )}
      </main>
    </div>
  )
}
