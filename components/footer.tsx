"use client"

import Link from "next/link"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  const { locale, isRTL } = useI18n()

  const links = [
    { label: "Home", labelAr: "الرئيسية", href: "/" },
    { label: "About", labelAr: "من نحن", href: "/about" },
    { label: "Operators", labelAr: "الشركات", href: "/operators" },
    { label: "Blog", labelAr: "المدونة", href: "/blog" },
    { label: "Contact", labelAr: "تواصل", href: "/contact" },
  ]

  const legal = [
    { label: "Privacy Policy", labelAr: "سياسة الخصوصية", href: "#" },
    { label: "Terms of Service", labelAr: "شروط الخدمة", href: "#" },
    { label: "Cancellation Policy", labelAr: "سياسة الإلغاء", href: "#" },
  ]

  return (
    <footer className="bg-dark-base text-white/80">
      <div className="container mx-auto px-4 py-16">
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12", isRTL && "text-right")}>
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-desert-gold to-balloon-red flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold text-white">Luxor Balloons</h3>
                <p className="text-xs text-desert-gold">{isRTL ? "بالونات الأقصر" : "Once In A Lifetime"}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {isRTL
                ? "جرب سحر الأقصر من السماء. رحلات بالون هوائية فاخرة فوق المعابد القديمة ونهر النيل."
                : "Experience the magic of Luxor from the sky. Luxury hot air balloon rides over ancient temples and the Nile River."}
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-desert-gold transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-playfair font-semibold text-white mb-6">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm hover:text-desert-gold-light transition-colors"
                  >
                    {isRTL ? link.labelAr : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-playfair font-semibold text-white mb-6">
              {isRTL ? "قانوني" : "Legal"}
            </h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-desert-gold-light transition-colors"
                  >
                    {isRTL ? link.labelAr : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-playfair font-semibold text-white mb-6">
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-desert-gold shrink-0 mt-0.5" />
                <span className="text-sm">West Bank, Luxor, Egypt</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-desert-gold shrink-0" />
                <span className="text-sm">+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-desert-gold shrink-0" />
                <span className="text-sm">info@luxorballoons.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            © 2024 Luxor Balloons. {isRTL ? "جميع الحقوق محفوظة" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              {isRTL ? "جميع الشركات مرخصة" : "All operators licensed"}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-desert-gold" />
              {isRTL ? "مؤمن بالكامل" : "Fully insured"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
