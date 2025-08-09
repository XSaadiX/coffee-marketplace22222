"use client"

import { useState } from "react"
import { MapPin, Clock, Package, Star } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function CompletedOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { orders } = useApp()
  const completedOrders = orders.filter((o) => o.status === "تم التوصيل")

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CartSidebar />
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-right mb-6">الطلبات المكتملة</h1>
        <div className="space-y-4">
          {completedOrders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  تم التوصيل
                </Badge>
                <div className="text-left">
                  <p className="flex items-center justify-end gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" /> {order.address}
                  </p>
                  <p className="flex items-center justify-end gap-2 text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 text-gray-400" /> {order.date}
                  </p>
                  <p className="flex items-center justify-end gap-2 text-sm text-gray-500 mt-1">
                    <Package className="w-4 h-4 text-gray-400" /> عدد المنتجات في الطلب: {order.itemCount}
                  </p>
                </div>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between items-center">
                <Button variant="outline">عرض التفاصيل</Button>
                <Button className="bg-stone-800 hover:bg-stone-700">
                  <Star className="w-4 h-4 ml-2" /> تقييم المنتج
                </Button>
              </div>
            </div>
          ))}
          {completedOrders.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">لا توجد طلبات مكتملة بعد.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
