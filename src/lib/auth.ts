import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
}

interface UserWithPassword extends User {
  password: string
}

interface AuthState {
  user: User | null
  login: (email: string, password: string) => { success: boolean; message: string }
  signup: (name: string, email: string, password: string) => { success: boolean; message: string }
  logout: () => void
}

const seedUsers: UserWithPassword[] = [
  { id: '1', name: 'Admin User', email: 'admin@cosmetica.com', password: 'admin123', role: 'admin', createdAt: '2024-01-01' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123', role: 'user', createdAt: '2024-01-15' },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const found = seedUsers.find(u => u.email === email && u.password === password)
        if (!found) return { success: false, message: 'Invalid email or password' }
        const { password: _, ...user } = found
        set({ user })
        return { success: true, message: 'Welcome back!' }
      },
      signup: (name, email, password) => {
        const existing = seedUsers.find(u => u.email === email)
        if (existing) return { success: false, message: 'An account with this email already exists' }
        const newUser: User = { id: String(Date.now()), name, email, role: 'user', createdAt: new Date().toISOString() }
        seedUsers.push({ ...newUser, password })
        set({ user: newUser })
        return { success: true, message: 'Account created!' }
      },
      logout: () => set({ user: null }),
    }),
    { name: 'cosmetica-auth' }
  )
)
