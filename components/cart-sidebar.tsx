"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, Trash2, X, Star } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"

export function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, updateCartItemQuantity, removeFromCart, getCartTotal } = useApp()

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col bg-gray-50" dir="rtl">
        <SheetHeader className="flex flex-row justify-between items-center p-4 border-b bg-white">
          <SheetTitle className="text-right text-base font-semibold">سلة المشتريات</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="p-3 flex items-center gap-3 bg-white rounded-lg shadow-sm">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover w-20 h-20"
                />
                <div className="flex-1 text-right space-y-1">
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <div className="flex items-center justify-end gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="font-bold text-sm">{item.price} ر.س</p>
                </div>
                <div className="flex flex-col items-center justify-between h-20">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 bg-transparent"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      {" "}
                      <Plus className="h-3 w-3" />{" "}
                    </Button>
                    <span className="w-4 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 bg-transparent"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      {" "}
                      <Minus className="h-3 w-3" />{" "}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4 ml-1" /> حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-lg font-semibold">سلتك فارغة</p>
            <p className="text-gray-500 mt-2">أضف بعض القهوة اللذيذة لتبدأ.</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <SheetFooter className="mt-auto border-t p-4 bg-white">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>المجموع الكلي</span>
                <span>{getCartTotal()} ر.س</span>
              </div>
              <Button asChild size="lg" className="w-full bg-stone-800 hover:bg-stone-700 text-base font-bold h-12">
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  تأكيد الطلب والدفع
                </Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
