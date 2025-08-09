"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/contexts/app-context"

export function NotificationsPopover() {
  const { notifications, getUnreadNotificationsCount, markNotificationAsRead } = useApp()
  const unreadCount = getUnreadNotificationsCount()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6 text-gray-600" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" dir="rtl">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">الإشعارات</h4>
            <p className="text-sm text-muted-foreground">لديك {unreadCount} إشعار غير مقروء.</p>
          </div>
          <div className="grid gap-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="grid grid-cols-[25px_1fr] items-start pb-4 last:pb-0 last:border-b-0 border-b"
                onClick={() => markNotificationAsRead(notification.id)}
              >
                {!notification.read && <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />}
                <div className={`space-y-1 ${notification.read ? "opacity-60" : ""}`}>
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
