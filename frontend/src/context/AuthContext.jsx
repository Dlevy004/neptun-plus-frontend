import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import * as accountService from '../services/accountService'
import { setAccessToken, refreshAccessToken, setSessionExpiredListener } from '../services/api'

const AuthContext = createContext(null)


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Ha a munkamenet menet közben lejár (a refresh sem sikerül), kijelentkeztetjük a felhasználót
  useEffect(() => {
    setSessionExpiredListener(() => setUser(null))
    return () => setSessionExpiredListener(null)
  }, [])

  // Oldalbetöltéskor megpróbáljuk visszaállítani a munkamenetet a refresh cookie-ból
  useEffect(() => {
    let ignore = false

    async function restoreSession() {
      try {
        const restored = await refreshAccessToken()
        if (ignore || !restored) return

        const profile = await accountService.getMe()
        if (!ignore) setUser(profile)
      } catch {
        // nincs érvényes munkamenet, a felhasználó a login oldalra kerül
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    restoreSession()
    return () => {
      ignore = true
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const { access } = await accountService.login(email, password)
    setAccessToken(access)

    const profile = await accountService.getMe()
    setUser(profile)
    return profile
  }, [])

  const register = useCallback((payload) => accountService.register(payload), [])

  const logout = useCallback(async () => {
    try {
      await accountService.logout()
    } catch {
      // ha a szerver nem érhető el, a kliens oldali kijelentkezés akkor is megtörténik
    }
    setAccessToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, login, register, logout }),
    [user, isLoading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('A useAuth csak AuthProvider-en belül használható')
  return ctx
}