"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useApp, type Product } from "@/contexts/app-context"

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleFavorite, isFavorite } = useApp()
  const favorited = isFavorite(product.id)

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-xl border-none shadow-sm bg-white">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              width={180}
              height={180}
              className="w-full aspect-square object-cover"
            />
          </Link>
          <Button
            onClick={() => toggleFavorite(product.id)}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full h-8 w-8"
          >
            <Heart className={`h-4 w-4 ${favorited ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
          </Button>
          {product.discount && (
            <Badge variant="destructive" className="absolute top-2 left-2 bg-red-600 text-white">
              {" "}
              خصم {product.discount}{" "}
            </Badge>
          )}
        </div>
        <div className="p-3 text-right">
          <p className="text-xs text-gray-500">{product.category}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-sm mt-1 hover:text-stone-700">{product.name}</h3>
          </Link>
          <div className="flex items-center justify-end mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <Button
              onClick={() => addToCart(product)}
              variant="ghost"
              size="icon"
              className="bg-stone-800 hover:bg-stone-700 text-white rounded-lg h-8 w-8"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <div className="flex items-baseline gap-2">
              <p className="text-md font-bold text-stone-800">{product.price} ر.س</p>
              {product.originalPrice && (
                <p className="text-xs text-gray-400 line-through">{product.originalPrice} ر.س</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
