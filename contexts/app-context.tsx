"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Product, Order, Notification } from "@/lib/types"
import { mockOrders, mockNotifications } from "@/lib/data"

interface CartItem extends Product {
  quantity: number
}

interface AppContextType {
  // Cart
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateCartItemQuantity: (productId: number, quantity: number) => void
  getCartTotal: () => number
  getCartCount: () => number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  clearCart: () => void

  // Favorites
  favoriteIds: number[]
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean

  // Orders
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "date">) => void

  // Notifications
  notifications: Notification[]
  markNotificationAsRead: (notificationId: number) => void
  getUnreadNotificationsCount: () => number
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast()

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id)
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prevItems, { ...product, quantity }]
    })
    toast({
      title: "أضيف إلى السلة",
      description: `${product.name} تم إضافته إلى سلة التسوق.`,
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const getCartTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const getCartCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const clearCart = () => setCartItems([])

  // Favorites State
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 4])

  const toggleFavorite = (productId: number) => {
    setFavoriteIds((prevIds) => {
      if (prevIds.includes(productId)) {
        toast({ title: "تمت الإزالة من المفضلة" })
        return prevIds.filter((id) => id !== productId)
      } else {
        toast({ title: "تمت الإضافة إلى المفضلة" })
        return [...prevIds, productId]
      }
    })
  }
  const isFavorite = (productId: number) => favoriteIds.includes(productId)

  // Orders State
  const [orders, setOrders] = useState<Order[]>(mockOrders)

  const addOrder = (orderData: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ID-CAF${Date.now()}`,
      date: new Date().toLocaleString("ar-SA"),
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }
  const getUnreadNotificationsCount = () => notifications.filter((n) => !n.read).length

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        getCartTotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen,
        clearCart,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        orders,
        addOrder,
        notifications,
        markNotificationAsRead,
        getUnreadNotificationsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export type OrderStatus = "قيد التجهيز" | "قيد التوصيل" | "تم التوصيل" | "ملغي"
