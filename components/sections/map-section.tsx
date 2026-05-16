"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const launchSites = [
  {
    name: "West Bank Launch Site",
    nameAr: "موقع الإطلاق - الضفة الغربية",
    coords: "25.6872° N, 32.6396° E",
    description: "Primary launch site near the Valley of the Kings",
    descriptionAr: "موقع الإطلاق الرئيسي بالقرب من وادي الملوك",
  },
  {
    name: "Nile Riverside Launch",
    nameAr: "موقع الإطلاق - ضفاف النيل",
    coords: "25.6875° N, 32.6450° E",
    description: "Alternative site with stunning Nile views",
    descriptionAr: "موقع بديل مع إطلالات رائعة على النيل",
  },
]

export function MapSection() {
  const { isRTL } = useI18n()

  return (
    <section className="py-24 bg-gradient-to-b from-sand-beige-light/30 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "مواقع الإطلاق" : "Launch Sites"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "اكتشف مواقع إطلاق البالون في الأقصر"
              : "Discover our hot air balloon launch locations in Luxor"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[400px] bg-gradient-to-br from-sand-beige to-sky-blue/20 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C8860A" strokeWidth="0.5"/>
                      </pattern>
                      <rect width="400" height="400" fill="url(#grid)" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <Navigation className="w-12 h-12 text-desert-gold mx-auto mb-4" />
                    <p className="text-lg font-medium text-dark-base">
                      {isRTL ? "خريطة مواقع الإطلاق" : "Launch Sites Map"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {isRTL ? "سيتم دمج خرائط Google قريباً" : "Google Maps integration coming soon"}
                    </p>
                    <p className="text-xs text-desert-gold mt-2">
                      API Key: {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? "Configured" : "Not configured"}
                    </p>
                  </div>
                  {/* Map Pins */}
                  <div className="absolute top-1/3 left-1/3">
                    <div className="w-4 h-4 bg-balloon-red rounded-full animate-pulse shadow-lg" />
                  </div>
                  <div className="absolute top-1/2 right-1/3">
                    <div className="w-4 h-4 bg-desert-gold rounded-full animate-pulse shadow-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Launch Sites Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {launchSites.map((site, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className={cn("p-6", isRTL && "text-right")}>
                  <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-desert-gold to-desert-gold-light flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-playfair font-semibold text-lg">{isRTL ? site.nameAr : site.name}</h3>
                      <p className="text-sm text-desert-gold font-mono mt-1">{site.coords}</p>
                      <p className="text-sm text-muted-foreground mt-2">{isRTL ? site.descriptionAr : site.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="bg-gradient-to-r from-desert-gold/10 to-balloon-red/10 rounded-2xl p-6">
              <h4 className="font-playfair font-semibold text-lg mb-2">
                {isRTL ? "نصائح الوصول" : "Getting There"}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <div className="w-2 h-2 rounded-full bg-desert-gold" />
                  {isRTL ? "النقل المجاني من جميع الفنادق في الأقصر" : "Free pickup from all Luxor hotels"}
                </li>
                <li className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <div className="w-2 h-2 rounded-full bg-desert-gold" />
                  {isRTL ? "الوصول 30 دقيقة قبل موعد الإطلاق" : "Arrive 30 minutes before launch time"}
                </li>
                <li className={cn("flex items-center gap-2", isRTL && "flex-row-reverse")}>
                  <div className="w-2 h-2 rounded-full bg-desert-gold" />
                  {isRTL ? "تتوفر مواقف سيارات مجانية" : "Free parking available"}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
