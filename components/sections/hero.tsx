"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Users, MapPin, ChevronRight, Star, Shield, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"

export function HeroSection() {
  const { locale, isRTL } = useI18n()
  const [searchDate, setSearchDate] = useState("")
  const [passengers, setPassengers] = useState("2")

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/60 via-dark-base/40 to-dark-base/80" />
      </div>

      {/* Floating Balloon Animation */}
      <motion.div
        animate={{ 
          y: [0, -30, 0], 
          x: [0, 15, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 right-[15%] w-24 h-32 opacity-30 hidden lg:block"
      >
        <svg viewBox="0 0 100 140" fill="none" className="w-full h-full">
          <ellipse cx="50" cy="50" rx="40" ry="50" fill="url(#balloonGrad)" />
          <rect x="45" y="100" width="10" height="30" fill="#8B4513" />
          <defs>
            <linearGradient id="balloonGrad" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#C0392B" />
              <stop offset="50%" stopColor="#F1C40F" />
              <stop offset="100%" stopColor="#27AE60" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className={cn("max-w-4xl mx-auto text-center", isRTL && "rtl")}>
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn("flex flex-wrap justify-center gap-4 mb-8", isRTL && "flex-row-reverse")}
          >
            {[
              { icon: Plane, label: isRTL ? "+500 رحلة" : "500+ Flights", color: "bg-desert-gold" },
              { icon: Star, label: isRTL ? "تقييم 4.9" : "4.9 Rating", color: "bg-balloon-red" },
              { icon: Shield, label: isRTL ? "100% آمن" : "100% Safe", color: "bg-balloon-green" },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <badge.icon className={cn("w-4 h-4", badge.color.replace("bg-", "text-"))} />
                <span className="text-sm font-medium text-white">{badge.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 leading-tight"
          >
            {isRTL ? (
              <>
                حلق فوق{" "}
                <span className="text-gradient-gold">عجائب مصر</span>{" "}
                القديمة
              </>
            ) : (
              <>
                Soar Above{" "}
                <span className="text-gradient-gold">Egypt's Ancient</span>{" "}
                Wonders
              </>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 mb-4 font-light"
          >
            {isRTL ? "جرب سحر الأقصر من السماء" : "Experience the magic of Luxor from the sky"}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-base text-desert-gold-light mb-12"
          >
            {isRTL ? "رحلات بالون هوائية فاخرة عند الشروق" : "Luxury hot air balloon rides at sunrise"}
          </motion.p>

          {/* Search/Booking Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 md:p-6 border border-white/20 shadow-2xl max-w-3xl mx-auto"
          >
            <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4", isRTL && "rtl")}>
              <div className="space-y-2">
                <label className="text-xs text-white/70 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {isRTL ? "تاريخ الرحلة" : "Flight Date"}
                </label>
                <Input
                  type="date"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 [&::-webkit-calendar-picker-indicator]:invert"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/70 font-medium flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {isRTL ? "المسافرون" : "Passengers"}
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full h-11 rounded-xl bg-white/20 border border-white/30 text-white px-4 text-sm focus:ring-2 focus:ring-desert-gold focus:outline-none"
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <option key={n} value={n} className="text-dark-base">{n} {isRTL ? "مسافرين" : "Passengers"}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/70 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {isRTL ? "موقع الانطلاق" : "Launch Site"}
                </label>
                <select className="w-full h-11 rounded-xl bg-white/20 border border-white/30 text-white px-4 text-sm focus:ring-2 focus:ring-desert-gold focus:outline-none">
                  <option className="text-dark-base">{isRTL ? "جميع المواقع" : "All Locations"}</option>
                  <option className="text-dark-base">West Bank</option>
                  <option className="text-dark-base">East Bank</option>
                </select>
              </div>
              <div className="flex items-end">
                <Link href={`/${locale}/flights?date=${searchDate}&passengers=${passengers}`} className="w-full">
                  <Button className="w-full h-11 bg-gradient-to-r from-desert-gold to-balloon-red hover:from-desert-gold-dark hover:to-balloon-red-light text-white font-semibold">
                    {isRTL ? "ابحث عن رحلات" : "Find Flights"}
                    <ChevronRight className={cn("w-4 h-4 ml-1", isRTL && "rotate-180 mr-1 ml-0")} />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={cn("flex flex-wrap justify-center gap-4 mt-8", isRTL && "flex-row-reverse")}
          >
            <Link href={`/${locale}/booking`}>
              <Button size="lg" className="bg-white text-dark-base hover:bg-white/90 font-semibold px-8">
                {isRTL ? "احجز رحلتك" : "Book Your Flight"}
              </Button>
            </Link>
            <Link href={`/${locale}/operators`}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                {isRTL ? "استكشف الشركات" : "Explore Operators"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  )
}
