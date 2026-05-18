export type UserRole = "client" | "master" | "admin"

export interface AuthUser {
  id: number
  name: string
  email: string
  role: UserRole
}

const STORAGE_KEY = "repair-service-user"

export function loginUser(user: AuthUser) {
  const normalizedUser: AuthUser = {
    ...user,
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(normalizedUser)
  )
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null
  }

  const storedUser = localStorage.getItem(STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return !!getCurrentUser()
}

export function hasRole(role: UserRole) {
  const user = getCurrentUser()

  if (!user) {
    return false
  }

  return user.role === role
}
