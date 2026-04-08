'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js'
import { getSupabaseBrowser } from '@/lib/supabase-browser'
import type { Profile } from '@/types/database'

interface AuthContextValue {
  user:    User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user:    null,
  profile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseBrowser()
  const [user,    setUser]    = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchProfile(uid: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).single()
    setProfile(data ?? null)
  }

  useEffect(() => {
    let mounted = true

    async function init() {
      const { data: { user: u } } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(u)
      if (u) await fetchProfile(u.id)
      setLoading(false)
    }
    init()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) await fetchProfile(u.id)
      else setProfile(null)
    })

    return () => { mounted = false; subscription.unsubscribe() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isAdmin: profile?.role === 'admin',
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
