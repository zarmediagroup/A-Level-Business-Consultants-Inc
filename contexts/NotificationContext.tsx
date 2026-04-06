'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Notification } from '@/types/database'

interface NotificationContextValue {
  notifications: Notification[]
  unreadCount:   number
  refresh:       () => void
}

const NotificationContext = createContext<NotificationContextValue>({
  notifications: [],
  unreadCount:   0,
  refresh:       () => {},
})

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const refresh = useCallback(async () => {
    const res = await fetch('/api/notifications')
    if (res.ok) setNotifications(await res.json())
  }, [])

  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, 60_000)
    return () => clearInterval(interval)
  }, [refresh])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      refresh,
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}
