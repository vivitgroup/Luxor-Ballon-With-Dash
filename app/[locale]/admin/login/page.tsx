"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// ─── Credentials (change these to whatever you want) ──────────────────────
const ADMIN_USERS = [
  { username: "admin", password: "luxor2024", name: "Super Admin" },
  { username: "manager", password: "balloons123", name: "Manager" },
]

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) { setError("Please enter username and password / أدخل اليوزر والباسورد"); return }
    setLoading(true)
    setError("")
    await new Promise(r => setTimeout(r, 800)) // simulate auth

    const user = ADMIN_USERS.find(u => u.username === username && u.password === password)
    if (user) {
      // Store session in localStorage
      localStorage.setItem("admin_logged_in", "true")
      localStorage.setItem("admin_name", user.name)
      router.push("/en/admin")
    } else {
      setError("Invalid username or password / يوزر أو باسورد غلط")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-base-light flex items-center justify-center p-4"
      style={{ background: "radial-gradient(ellipse at top, #1F2A40 0%, #1A1A2E 60%)" }}>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-desert-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-balloon-red/5 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-desert-gold to-balloon-red flex items-center justify-center mx-auto mb-4 shadow-lg shadow-desert-gold/20">
            <span className="text-white font-bold text-2xl">🎈</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Luxor Balloons</h1>
          <p className="text-desert-gold text-sm mt-1">Admin Dashboard / لوحة التحكم</p>
        </div>

        {/* Card */}
        <div className="bg-dark-base border border-white/10 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-white font-semibold text-lg mb-1">Welcome back / أهلاً بك</h2>
          <p className="text-white/40 text-sm mb-6">Sign in to continue / سجّل دخولك للمتابعة</p>

          <div className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Username / اليوزرنيم</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError("") }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="admin"
                  className="pl-9 bg-dark-base-lighter border-white/10 text-white placeholder:text-white/20 focus:border-desert-gold/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Password / الباسورد</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <Input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError("") }}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="pl-9 pr-10 bg-dark-base-lighter border-white/10 text-white placeholder:text-white/20 focus:border-desert-gold/50"
                />
                <button onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-balloon-red/10 border border-balloon-red/30 rounded-xl px-3 py-2">
                <AlertCircle className="w-4 h-4 text-balloon-red-light shrink-0" />
                <p className="text-balloon-red-light text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Button */}
            <Button onClick={handleLogin} disabled={loading}
              className="w-full bg-desert-gold hover:bg-desert-gold-light text-dark-base font-bold h-11 mt-2">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-dark-base/30 border-t-dark-base rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : "Sign In / دخول"}
            </Button>
          </div>

          {/* Credentials hint */}
          <div className="mt-5 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
            <p className="text-white/20 text-xs text-center mb-2">Demo credentials / بيانات تجريبية</p>
            <div className="space-y-1">
              <p className="text-white/30 text-xs font-mono text-center">admin / luxor2024</p>
              <p className="text-white/30 text-xs font-mono text-center">manager / balloons123</p>
            </div>
          </div>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          © 2024 Luxor Balloons — Admin Portal
        </p>
      </motion.div>
    </div>
  )
}
