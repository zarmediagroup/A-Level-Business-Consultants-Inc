'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import { useAuth } from '@/contexts/AuthContext'
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
  const { user } = useAuth()

  const refresh = useCallback(async () => {
    const res = await fetch('/api/notifications')
    if (res.ok) setNotifications(await res.json())
  }, [])

  useEffect(() => {
    if (!user) return

    refresh()

    const supabase = getSupabaseBrowser()
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        () => refresh()
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user, refresh])

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
