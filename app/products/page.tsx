"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/data"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  const pageTitle = category === "new" ? "وصل حديثاً" : category ? category : "كل المنتجات"

  const filteredProducts = useMemo(() => {
    let products = allProducts
    if (category === "new") {
      products = products.filter((p) => p.discount)
    } else if (category) {
      products = products.filter((p) => p.category === category)
    }
    return products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, category])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CartSidebar />
      <main className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-right mb-6">{pageTitle}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">لم يتم العثور على منتجات.</p>
          </div>
        )}
      </main>
    </div>
  )
}
