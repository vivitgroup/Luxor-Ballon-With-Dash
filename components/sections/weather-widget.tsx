"use client"

import { motion } from "framer-motion"
import { Cloud, Sun, Wind, Thermometer, Eye, CloudRain } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function WeatherWidget() {
  const { isRTL } = useI18n()

  const weather = {
    condition: "Clear",
    temp: 24,
    wind: 8,
    visibility: 10,
    status: "good",
  }

  const getStatusColor = () => {
    switch (weather.status) {
      case "good": return "bg-balloon-green"
      case "caution": return "bg-yellow-500"
      case "cancelled": return "bg-balloon-red"
      default: return "bg-balloon-green"
    }
  }

  return (
    <section className="py-8 bg-gradient-to-r from-sky-blue/10 to-desert-gold/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="border-desert-gold/20">
            <CardContent className="p-6">
              <div className={cn("flex flex-wrap items-center justify-between gap-6", isRTL && "flex-row-reverse")}>
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", getStatusColor())}>
                    <Sun className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg text-dark-base">
                      {isRTL ? "حالة الطيران اليوم" : "Today's Flight Conditions"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? "الأقصر، مصر" : "Luxor, Egypt"}
                    </p>
                  </div>
                </div>

                <div className={cn("flex flex-wrap gap-6", isRTL && "flex-row-reverse")}>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-desert-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? "الحرارة" : "Temp"}</p>
                      <p className="font-semibold">{weather.temp}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-desert-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? "الرياح" : "Wind"}</p>
                      <p className="font-semibold">{weather.wind} km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-desert-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">{isRTL ? "الرؤية" : "Visibility"}</p>
                      <p className="font-semibold">{weather.visibility} km</p>
                    </div>
                  </div>
                </div>

                <div className={cn("px-4 py-2 rounded-full text-sm font-medium text-white", getStatusColor())}>
                  {weather.status === "good" && (isRTL ? "مناسب للطيران" : "Good for Flight")}
                  {weather.status === "caution" && (isRTL ? "حذر مطلوب" : "Caution Advised")}
                  {weather.status === "cancelled" && (isRTL ? "الرحلات ملغاة" : "Flights Cancelled")}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
