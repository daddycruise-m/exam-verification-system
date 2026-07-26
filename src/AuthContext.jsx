import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const initialUsers = {
  student: {
    email: 'samuelnwaora317@gmail.com',
    password: 'student123',
    displayName: 'Student User',
  },
  admin: {
    id: 'admin',
    password: 'admin123',
    displayName: 'Admin User',
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(initialUsers)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedAuth = localStorage.getItem('navAuth')
    const storedUsers = localStorage.getItem('navUsers')
    if (storedAuth) {
      try {
        setUser(JSON.parse(storedAuth))
      } catch {
        localStorage.removeItem('navAuth')
      }
    }
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers))
      } catch {
        localStorage.removeItem('navUsers')
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('navUsers', JSON.stringify(users))
  }, [users])

  const login = ({ mode, identifier, password }) => {
    setError(null)
    if (mode === 'student') {
      const student = users.student
      if (identifier.toLowerCase() === student.email.toLowerCase() && password === student.password) {
        const authUser = {
          role: 'student',
          displayName: student.displayName,
          email: student.email,
        }
        localStorage.setItem('navAuth', JSON.stringify(authUser))
        setUser(authUser)
        return { success: true }
      }
      setError('Invalid student email or password.')
      return { success: false }
    }

    if (mode === 'admin') {
      const admin = users.admin
      if (identifier === admin.id && password === admin.password) {
        const authUser = {
          role: 'admin',
          displayName: admin.displayName,
          adminId: admin.id,
        }
        localStorage.setItem('navAuth', JSON.stringify(authUser))
        setUser(authUser)
        return { success: true }
      }
      setError('Invalid admin ID or password.')
      return { success: false }
    }

    setError('Unknown login mode.')
    return { success: false }
  }

  const signup = ({ email, password, fullName }) => {
    setError(null)
    if (!email || !password || !fullName) {
      setError('Please complete all fields.')
      return { success: false }
    }
    if (users.student.email.toLowerCase() === email.toLowerCase()) {
      setError('This student email is already registered.')
      return { success: false }
    }
    setUsers({
      ...users,
      student: {
        email,
        password,
        displayName: fullName,
      },
    })
    setError(null)
    return { success: true }
  }

  const resetPassword = ({ identifier, password }) => {
    setError(null)
    if (!identifier || !password) {
      setError('Please enter an email or admin ID and a new password.')
      return { success: false }
    }

    if (identifier.toLowerCase() === users.student.email.toLowerCase()) {
      setUsers({ ...users, student: { ...users.student, password } })
      setError(null)
      return { success: true }
    }

    if (identifier === users.admin.id) {
      setUsers({ ...users, admin: { ...users.admin, password } })
      setError(null)
      return { success: true }
    }

    setError('No matching student email or admin ID found.')
    return { success: false }
  }

  const logout = () => {
    localStorage.removeItem('navAuth')
    setUser(null)
    setError(null)
  }

  const value = useMemo(
    () => ({ user, users, login, logout, signup, resetPassword, error, setError }),
    [user, users, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
