export type Product = {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  imageUrl: string
  discount?: string
  description: string
  tastingNotes: string[]
}

export type OrderStatus = "قيد التجهيز" | "قيد التوصيل" | "تم التوصيل" | "ملغي"

export type Order = {
  id: string
  date: string
  status: OrderStatus
  itemCount: number
  address: string
  items: (Product & { quantity: number })[]
  total: number
}

export type Notification = {
  id: number
  title: string
  description: string
  date: string
  read: boolean
}
