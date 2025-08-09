"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/app-context";
import { Badge } from "@/components/ui/badge";
import { NotificationsPopover } from "./notifications-popover";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const { setIsCartOpen, getCartCount, favoriteIds } = useApp();
  const cartCount = getCartCount();

  return (
    <>
      {/* Mobile Header */}
      <header className='p-4 flex justify-between items-center bg-white md:hidden sticky top-0 z-20 border-b'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsCartOpen(true)}
            className='relative'>
            <ShoppingBag className='h-6 w-6 text-gray-600' />
            {cartCount > 0 && (
              <Badge
                variant='destructive'
                className='absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs'>
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button asChild variant='ghost' size='icon' className='relative'>
            <Link href='/favorites'>
              <Heart className='h-6 w-6 text-gray-600' />
              {favoriteIds.length > 0 && (
                <Badge
                  variant='destructive'
                  className='absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs'>
                  {favoriteIds.length}
                </Badge>
              )}
            </Link>
          </Button>
          <NotificationsPopover />
        </div>
        <div className='flex items-center gap-3 text-right'>
          <div>
            <p className='text-sm font-semibold'>أهلاً محمود</p>
            <p className='text-xs text-gray-500'>انطلق في عالم القهوة.</p>
          </div>
          <Image
            src='/placeholder.svg?height=44&width=44'
            alt='User Avatar'
            width={44}
            height={44}
            className='rounded-full'
          />
        </div>
      </header>

      {/* Desktop Header */}
      <header className='hidden md:flex justify-between items-center p-4 border-b bg-white sticky top-0 z-20'>
        <div className='flex items-center gap-6'>
          <Link href='/' className='text-2xl font-bold text-[#634832]'>
            MUNEISH
          </Link>
          <nav className='flex gap-4'>
            <Link href='/' className='text-sm font-semibold text-[#634832]'>
              الرئيسية
            </Link>
            <Link
              href='/order-tracking'
              className='text-sm text-gray-500 hover:text-[#634832]'>
              متابعة الطلبات
            </Link>
            <Link
              href='/completed-orders'
              className='text-sm text-gray-500 hover:text-[#634832]'>
              طلبات مكتملة
            </Link>
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          <div className='relative w-64'>
            <Input
              type='search'
              placeholder='ابحث عن متعتك اليومية'
              className='bg-gray-100 border-none h-10 pr-10 text-right'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsCartOpen(true)}
            className='relative'>
            <ShoppingBag className='h-6 w-6 text-gray-600' />
            {cartCount > 0 && (
              <Badge
                variant='destructive'
                className='absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs'>
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button asChild variant='ghost' size='icon' className='relative'>
            <Link href='/favorites'>
              <Heart className='h-6 w-6 text-gray-600' />
              {favoriteIds.length > 0 && (
                <Badge
                  variant='destructive'
                  className='absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs'>
                  {favoriteIds.length}
                </Badge>
              )}
            </Link>
          </Button>
          <NotificationsPopover />
          <Image
            src='/placeholder.svg?height=40&width=40'
            alt='User Avatar'
            width={40}
            height={40}
            className='rounded-full'
          />
        </div>
      </header>
    </>
  );
}
