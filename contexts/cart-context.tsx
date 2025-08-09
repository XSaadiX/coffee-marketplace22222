"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  imageUrl: string
  discount?: string
}

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  getCartTotal: () => number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { toast } = useToast()

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id)
      if (itemExists) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    toast({
      title: "أضيف إلى السلة",
      description: `${product.name} تم إضافته إلى سلة التسوق الخاصة بك.`,
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotal, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
