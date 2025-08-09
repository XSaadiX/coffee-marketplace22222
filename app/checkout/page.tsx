"use client"

import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
  const { cartItems, getCartTotal, addOrder, clearCart } = useApp()
  const router = useRouter()
  const { toast } = useToast()

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return

    addOrder({
      status: "قيد التجهيز",
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      address: "القصيم - عنيزة، المملكة العربية السعودية", // Mock address
      items: cartItems,
      total: getCartTotal(),
    })

    clearCart()

    toast({
      title: "تم استلام طلبك بنجاح!",
      description: "يمكنك متابعة حالة طلبك من صفحة متابعة الطلبات.",
    })

    router.push("/order-tracking")
  }

  return (
    <div className="max-w-2xl mx-auto p-4" dir="rtl">
      <h1 className="text-3xl font-bold text-right mb-6">إتمام الشراء</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-right mb-4">ملخص الطلب</h2>
        <div className="space-y-2 border-b pb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} x{item.quantity}
              </span>
              <span>{item.price * item.quantity} ر.س</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg pt-4">
          <span>المجموع الكلي</span>
          <span>{getCartTotal()} ر.س</span>
        </div>
        <Button onClick={handlePlaceOrder} size="lg" className="w-full mt-6 bg-stone-800 hover:bg-stone-700">
          تأكيد الطلب
        </Button>
      </div>
    </div>
  )
}
