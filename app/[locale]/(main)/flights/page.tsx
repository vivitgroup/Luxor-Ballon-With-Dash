"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Filter, ChevronRight, Plane, AlertCircle } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn, formatPrice, formatTime, getStatusColor } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const flights = [
  {
    id: "1",
    operator: "Sindbad Balloons",
    date: "2024-06-20",
    time: "05:00",
    price: 79,
    seatsAvailable: 8,
    seatsTotal: 12,
    package: "standard",
    status: "scheduled",
  },
  {
    id: "2",
    operator: "Hod Hod Soliman",
    date: "2024-06-20",
    time: "05:30",
    price: 129,
    seatsAvailable: 4,
    seatsTotal: 6,
    package: "premium",
    status: "scheduled",
  },
  {
    id: "3",
    operator: "Magic Horizon",
    date: "2024-06-20",
    time: "06:00",
    price: 79,
    seatsAvailable: 10,
    seatsTotal: 12,
    package: "standard",
    status: "scheduled",
  },
  {
    id: "4",
    operator: "Sky Cruise",
    date: "2024-06-21",
    time: "05:00",
    price: 299,
    seatsAvailable: 6,
    seatsTotal: 6,
    package: "private",
    status: "scheduled",
  },
  {
    id: "5",
    operator: "Sindbad Balloons",
    date: "2024-06-21",
    time: "05:30",
    price: 85,
    seatsAvailable: 6,
    seatsTotal: 12,
    package: "standard",
    status: "scheduled",
  },
  {
    id: "6",
    operator: "Nile Dream",
    date: "2024-06-21",
    time: "06:00",
    price: 79,
    seatsAvailable: 12,
    seatsTotal: 16,
    package: "standard",
    status: "scheduled",
  },
]

export default function FlightsPage() {
  const { locale, isRTL } = useI18n()
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedPackage, setSelectedPackage] = useState("all")
  const [passengers, setPassengers] = useState("2")

  const filteredFlights = flights.filter(flight => {
    if (selectedDate && flight.date !== selectedDate) return false
    if (selectedPackage !== "all" && flight.package !== selectedPackage) return false
    if (parseInt(passengers) > flight.seatsAvailable) return false
    return true
  })

  const packageColors = {
    standard: "bg-desert-gold",
    premium: "bg-balloon-red",
    private: "bg-balloon-green",
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "الرحلات المتاحة" : "Available Flights"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "ابحث عن رحلة البالون المثالية لك"
              : "Find your perfect hot air balloon flight"}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-sand-beige/50 shadow-lg mb-8"
        >
          <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4", isRTL && "rtl")}>
            <div>
              <label className="text-sm font-medium mb-2 block">{isRTL ? "التاريخ" : "Date"}</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{isRTL ? "الباقة" : "Package"}</label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full h-11 rounded-xl border border-sand-beige-dark/30 px-4 text-sm focus:ring-2 focus:ring-desert-gold focus:outline-none"
              >
                <option value="all">{isRTL ? "جميع الباقات" : "All Packages"}</option>
                <option value="standard">{isRTL ? "قياسي" : "Standard"}</option>
                <option value="premium">{isRTL ? "مميز" : "Premium"}</option>
                <option value="private">{isRTL ? "خاص" : "Private"}</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{isRTL ? "المسافرون" : "Passengers"}</label>
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="w-full h-11 rounded-xl border border-sand-beige-dark/30 px-4 text-sm focus:ring-2 focus:ring-desert-gold focus:outline-none"
              >
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} {isRTL ? "مسافرين" : "Passengers"}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full border-desert-gold text-desert-gold hover:bg-desert-gold hover:text-white"
                onClick={() => { setSelectedDate(""); setSelectedPackage("all"); setPassengers("2") }}
              >
                <Filter className="w-4 h-4 mr-2" />
                {isRTL ? "إعادة ضبط" : "Reset Filters"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Sunrise Slots Banner */}
        <div className="bg-gradient-to-r from-desert-gold/20 to-balloon-red/20 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-desert-gold" />
          <p className="text-sm font-medium">
            {isRTL 
              ? "أوقات رحلات الشروق: 5:00 صباحاً، 5:30 صباحاً، 6:00 صباحاً"
              : "Sunrise flight slots: 5:00 AM, 5:30 AM, 6:00 AM"}
          </p>
        </div>

        {/* Flights List */}
        <div className="space-y-4">
          {filteredFlights.length === 0 ? (
            <div className="text-center py-16">
              <Plane className="w-16 h-16 text-sand-beige-dark mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                {isRTL ? "لا توجد رحلات متاحة بهذه المعايير" : "No flights available for these criteria"}
              </p>
            </div>
          ) : (
            filteredFlights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className={cn("p-6", isRTL && "rtl")}>
                    <div className={cn("flex flex-wrap items-center gap-6", isRTL && "flex-row-reverse")}>
                      {/* Time & Date */}
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-desert-gold to-desert-gold-light flex items-center justify-center">
                          <Clock className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="font-playfair font-semibold text-lg">{flight.time}</p>
                          <p className="text-sm text-muted-foreground">{flight.date}</p>
                        </div>
                      </div>

                      {/* Operator & Package */}
                      <div className="flex-1 min-w-[200px]">
                        <h3 className="font-semibold">{flight.operator}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={cn("text-white text-xs", packageColors[flight.package as keyof typeof packageColors])}>
                            {flight.package.charAt(0).toUpperCase() + flight.package.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Users className="w-3 h-3 mr-1" />
                            {flight.seatsAvailable} / {flight.seatsTotal} {isRTL ? "متاح" : "available"}
                          </Badge>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-center min-w-[120px]">
                        <p className="text-2xl font-playfair font-bold text-desert-gold">
                          {formatPrice(flight.price)}
                        </p>
                        <p className="text-xs text-muted-foreground">{isRTL ? "للشخص" : "per person"}</p>
                      </div>

                      {/* CTA */}
                      <Link href={`/${locale}/booking?flight=${flight.id}`}>
                        <Button className="bg-gradient-to-r from-desert-gold to-desert-gold-light hover:from-desert-gold-dark hover:to-desert-gold">
                          {isRTL ? "احجز" : "Book"}
                          <ChevronRight className={cn("w-4 h-4 ml-1", isRTL && "rotate-180 mr-1 ml-0")} />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
