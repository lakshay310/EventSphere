import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('loggedInUser')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData))
    localStorage.setItem('loggedInUserId', String(userData.id))
    localStorage.setItem('isLoggedIn', 'true')
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('loggedInUserId')
    localStorage.setItem('isLoggedIn', 'false')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
