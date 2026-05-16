"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, Calendar, Building2, Plane,
  Users, Star, Settings, Menu, X, ChevronLeft, ChevronRight,
  LogOut, Bell, Calculator
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { label: "Dashboard", labelAr: "الرئيسية", href: "/admin", icon: LayoutDashboard },
  { label: "Bookings", labelAr: "الحجوزات", href: "/admin/bookings", icon: Calendar },
  { label: "Operators", labelAr: "الشركات", href: "/admin/operators", icon: Building2 },
  { label: "Flights", labelAr: "الرحلات", href: "/admin/flights", icon: Plane },
  { label: "Accounting", labelAr: "المحاسبة", href: "/admin/accounting", icon: Calculator },
  { label: "Users", labelAr: "المستخدمون", href: "/admin/users", icon: Users },
  { label: "Reviews", labelAr: "التقييمات", href: "/admin/reviews", icon: Star },
  { label: "Settings", labelAr: "الإعدادات", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [adminName, setAdminName] = useState("Admin")
  const [checked, setChecked] = useState(false)

  const isLoginPage = pathname.includes("/admin/login")

  useEffect(() => {
    if (isLoginPage) { setChecked(true); return }
    const loggedIn = localStorage.getItem("admin_logged_in")
    if (!loggedIn) {
      router.replace(pathname.replace("/admin", "/admin/login").replace(/\/admin\/.*/, "/admin/login").replace("/admin", "/admin/login"))
    } else {
      setAdminName(localStorage.getItem("admin_name") || "Admin")
      setChecked(true)
    }
  }, [pathname, isLoginPage, router])

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in")
    localStorage.removeItem("admin_name")
    router.push(pathname.includes("/ar/") ? "/ar/admin/login" : "/en/admin/login")
  }

  // Show login page without sidebar
  if (isLoginPage) return <>{children}</>

  // Wait for auth check
  if (!checked) return (
    <div className="min-h-screen bg-dark-base-light flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-desert-gold/30 border-t-desert-gold rounded-full animate-spin" />
    </div>
  )

  const currentPage = navItems.find(item => pathname === item.href || pathname.endsWith(item.href))

  const SidebarLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
      {navItems.map((item) => {
        const isActive = pathname.endsWith(item.href)
        return (
          <Link key={item.href} href={item.href} onClick={onNavigate}
            className={cn("flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
              isActive ? "bg-desert-gold/20 text-desert-gold-light border border-desert-gold/30" : "text-white/60 hover:bg-white/5 hover:text-white")}>
            <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-desert-gold")} />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{item.label}</div>
                <div className="text-[10px] text-white/30">{item.labelAr}</div>
              </div>
            )}
            {isActive && !isCollapsed && <div className="w-1.5 h-1.5 rounded-full bg-desert-gold shrink-0" />}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <div className="min-h-screen bg-dark-base-light flex">
      {/* Desktop Sidebar */}
      <motion.aside initial={false} animate={{ width: isCollapsed ? 80 : 280 }}
        className="hidden lg:flex flex-col bg-dark-base border-r border-white/10 fixed h-screen z-40 overflow-hidden">
        <div className="p-6 border-b border-white/10 shrink-0">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-desert-gold to-balloon-red flex items-center justify-center shrink-0">
              <span className="text-white font-bold">🎈</span>
            </div>
            {!isCollapsed && <div><h1 className="text-lg font-bold text-white">Luxor Balloons</h1><p className="text-xs text-desert-gold">Admin Dashboard</p></div>}
          </div>
        </div>
        <SidebarLinks />
        <div className="p-4 border-t border-white/10 shrink-0">
          <div className={cn("flex items-center gap-3 mb-3", isCollapsed && "justify-center")}>
            <Avatar className="w-9 h-9 shrink-0">
              <AvatarFallback className="text-white text-xs font-bold bg-gradient-to-br from-desert-gold to-balloon-red">
                {adminName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">{adminName}</p><p className="text-xs text-desert-gold">Admin</p></div>}
          </div>
          {!isCollapsed && (
            <Button variant="ghost" size="sm" onClick={handleLogout}
              className="w-full text-balloon-red/60 hover:text-balloon-red-light hover:bg-balloon-red/10 mb-2 gap-2">
              <LogOut className="w-4 h-4" /> Logout / خروج
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-white/40 hover:text-white hover:bg-white/5">
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4 mr-2" />Collapse</>}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              className="fixed left-0 top-0 h-screen w-[280px] bg-dark-base border-r border-white/10 z-50 lg:hidden flex flex-col">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-desert-gold to-balloon-red flex items-center justify-center">
                    <span className="text-white text-sm">🎈</span>
                  </div>
                  <div><p className="text-white font-bold text-sm">Luxor Balloons</p><p className="text-desert-gold text-xs">Admin</p></div>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <SidebarLinks onNavigate={() => setIsMobileOpen(false)} />
              <div className="p-4 border-t border-white/10">
                <Button variant="ghost" size="sm" onClick={handleLogout}
                  className="w-full text-balloon-red/60 hover:text-balloon-red-light hover:bg-balloon-red/10 gap-2">
                  <LogOut className="w-4 h-4" /> Logout / خروج
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={cn("flex-1 min-h-screen transition-all", isCollapsed ? "lg:ml-20" : "lg:ml-[280px]")}>
        <header className="sticky top-0 z-30 bg-dark-base/80 backdrop-blur-lg border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-white">{currentPage?.label || "Dashboard"}</h2>
                <p className="text-xs text-white/30">{currentPage?.labelAr}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-balloon-red text-[10px]">3</Badge>
              </button>
              <Button variant="ghost" size="sm" onClick={handleLogout}
                className="hidden sm:flex text-white/60 hover:text-white hover:bg-white/10 gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
