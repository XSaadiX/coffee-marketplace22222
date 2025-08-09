"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, SlidersHorizontal, Home, ClipboardList, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { CartSidebar } from "@/components/cart-sidebar"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/data"

export default function CoffeeMarketplaceHome() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("الكل")
  const [currentSlide, setCurrentSlide] = useState(0)

  // Slider content data
  const slides = [
    {
      image: "/placeholder.svg?height=256&width=1280",
      title: "قهوة مختارة بعناية،",
      subtitle: "بطعم يوقظ الحواس ويخلي كل لحظة أطيب."
    },
    {
      image: "/placeholder.svg?height=256&width=1280",
      title: "تجربة قهوة استثنائية،",
      subtitle: "من أجود الحبوب حول العالم."
    },
    {
      image: "/placeholder.svg?height=256&width=1280",
      title: "نكهات متنوعة ومميزة،",
      subtitle: "لكل محبي القهوة المختصة."
    },
    {
      image: "/placeholder.svg?height=256&width=1280",
      title: "طازج ومحمص بإتقان،",
      subtitle: "يصل إليك في أفضل حالاته."
    },
    {
      image: "/placeholder.svg?height=256&width=1280",
      title: "اكتشف عالم القهوة،",
      subtitle: "مع مجموعة متنوعة من النكهات."
    }
  ]

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      (product) =>
        (activeCategory === "الكل" || product.category === activeCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery, activeCategory])

  const bestSellers = [...allProducts].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5)
  const newArrivals = [...allProducts].filter((p) => p.discount).slice(0, 5)

  const categories = ["الكل", "حبوب القهوة", "الانتاج المبتكر", "قهوة فلتر", "الكبسولات"]

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-24 md:pb-8">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CartSidebar />

      <div className="max-w-7xl mx-auto">
        <main className="p-4 space-y-6">
          <div className="flex items-center gap-3 md:hidden">
            <Button variant="outline" size="icon" className="h-12 w-12 flex-shrink-0 border-gray-300 bg-white">
              <SlidersHorizontal className="h-6 w-6 text-gray-700" />
            </Button>
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="ابحث عن متعتك اليومية"
                className="bg-gray-100 border-none h-12 pr-10 text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="relative w-full h-40 md:h-64 rounded-xl overflow-hidden">
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : 
                    index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-[#634832]/40" />
                  <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 text-white text-right">
                    <h2 className="text-lg md:text-3xl font-bold">{slide.title}</h2>
                    <p className="text-sm md:text-lg mt-2">{slide.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-lg px-5 flex-shrink-0 ${activeCategory === category ? "bg-[#634832] text-white" : "border-gray-300 text-gray-700 bg-white"}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">الأكثر مبيعاً</h2>
              <Link href="/products" className="text-sm text-[#634832] font-semibold">
                عرض الكل
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">وصل حديثاً</h2>
              <Link href="/products?category=new" className="text-sm text-gray-500">
                منتجات جديدة طازجة، تذوقها أولاً
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto md:hidden z-10">
        <nav className="flex justify-around items-center h-16">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#634832]">
            {" "}
            <Home className="h-6 w-6" /> <span className="text-xs font-bold">الرئيسية</span>{" "}
          </Link>
          <Link href="/order-tracking" className="flex flex-col items-center gap-1 text-gray-400">
            {" "}
            <ClipboardList className="h-6 w-6" /> <span className="text-xs">متابعة الطلبات</span>{" "}
          </Link>
          <Link href="/completed-orders" className="flex flex-col items-center gap-1 text-gray-400">
            {" "}
            <ClipboardCheck className="h-6 w-6" /> <span className="text-xs">طلبات مكتملة</span>{" "}
          </Link>
        </nav>
      </footer>
    </div>
  )
}
