"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe, ChevronDown, Wind } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/i18n-provider"
import { Locale, locales, localeLabels } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", labelAr: "الرئيسية", href: "/" },
  { label: "Operators", labelAr: "الشركات", href: "/operators" },
  { label: "Flights", labelAr: "الرحلات", href: "/flights" },
  { label: "Blog", labelAr: "المدونة", href: "/blog" },
  { label: "About", labelAr: "من نحن", href: "/about" },
  { label: "Contact", labelAr: "تواصل", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { locale, isRTL, t } = useI18n()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    const currentPath = pathname.replace(`/${locale}`, "")
    window.location.href = `/${newLocale}${currentPath}`
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-dark-base/95 backdrop-blur-lg shadow-lg shadow-desert-gold/10"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-desert-gold to-balloon-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <div className={cn("flex flex-col", isRTL && "items-end")}>
              <span className="text-xl font-playfair font-bold text-white">
                Luxor Balloons
              </span>
              <span className="text-xs text-desert-gold-light tracking-wider">
                {isRTL ? "بالونات الأقصر" : "Once In A Lifetime"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={cn("hidden lg:flex items-center gap-1", isRTL && "flex-row-reverse")}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-desert-gold-light",
                  pathname.includes(item.href)
                    ? "text-desert-gold-light bg-white/10"
                    : "text-white/80 hover:bg-white/5"
                )}
              >
                {isRTL ? item.labelAr : item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{localeLabels[locale as Locale]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-40 bg-dark-base/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl overflow-hidden"
                  >
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => { switchLocale(l); setIsLangOpen(false) }}
                        className={cn(
                          "w-full px-4 py-3 text-sm text-left hover:bg-white/10 transition-colors",
                          locale === l ? "text-desert-gold-light" : "text-white/80"
                        )}
                      >
                        {localeLabels[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book Now Button */}
            <Link href={`/${locale}/booking`} className="hidden md:block">
              <Button size="sm" className="bg-gradient-to-r from-desert-gold to-balloon-red hover:from-desert-gold-dark hover:to-balloon-red-light">
                {isRTL ? "احجز الآن" : "Book Now"}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-base/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    pathname.includes(item.href)
                      ? "text-desert-gold-light bg-white/10"
                      : "text-white/80 hover:bg-white/5"
                  )}
                >
                  {isRTL ? item.labelAr : item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/booking`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4"
              >
                <Button className="w-full bg-gradient-to-r from-desert-gold to-balloon-red">
                  {isRTL ? "احجز الآن" : "Book Now"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
