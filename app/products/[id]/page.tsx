"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Heart, Star, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/contexts/app-context"
import { allProducts } from "@/lib/data"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { addToCart, toggleFavorite, isFavorite } = useApp()

  const product = allProducts.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  const favorited = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="bg-white min-h-screen font-sans" dir="rtl">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CartSidebar />
      <main className="max-w-4xl mx-auto p-4">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="relative">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="w-full rounded-xl object-cover aspect-square"
            />
            <Button
              onClick={() => toggleFavorite(product.id)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/70 hover:bg-white rounded-full h-10 w-10"
            >
              <Heart className={`h-5 w-5 ${favorited ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
            </Button>
            {product.discount && (
              <Badge variant="destructive" className="absolute top-4 left-4 bg-red-600 text-white text-lg p-2">
                {" "}
                خصم {product.discount}{" "}
              </Badge>
            )}
          </div>
          <div className="py-4 text-right">
            <p className="text-sm text-gray-500">{product.category}</p>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            <div className="flex items-center justify-end gap-2 mt-2">
              <span className="text-sm text-gray-500">({product.reviewCount} مراجعة)</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-baseline gap-2 justify-end mt-4">
              <p className="text-3xl font-bold text-stone-800">{product.price} ر.س</p>
              {product.originalPrice && (
                <p className="text-lg text-gray-400 line-through">{product.originalPrice} ر.س</p>
              )}
            </div>
            <p className="mt-4 text-gray-700">{product.description}</p>
            <div className="mt-6">
              <h3 className="font-semibold">إيحاءات</h3>
              <div className="flex gap-2 mt-2">
                {product.tastingNotes.map((note) => (
                  <Badge key={note} variant="secondary">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-4 border rounded-lg p-2">
                <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  {" "}
                  <Minus className="h-4 w-4" />{" "}
                </Button>
                <span className="text-lg font-bold w-5 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity((q) => q + 1)}>
                  {" "}
                  <Plus className="h-4 w-4" />{" "}
                </Button>
              </div>
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-stone-800 hover:bg-stone-700 h-14 text-base"
              >
                إضافة إلى السلة
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
