"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, Plane, ChevronRight } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn, formatPrice, getInitials, generateAvatarColor } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const operators = [
  {
    id: "1",
    name: "Sindbad Balloons",
    logo: null,
    rating: 4.9,
    totalFlights: 1200,
    priceFrom: 79,
    description: "Leading balloon operator with 15+ years experience",
  },
  {
    id: "2",
    name: "Hod Hod Soliman",
    logo: null,
    rating: 4.8,
    totalFlights: 950,
    priceFrom: 85,
    description: "Premium flights with expert pilots",
  },
  {
    id: "3",
    name: "Magic Horizon",
    logo: null,
    rating: 4.7,
    totalFlights: 800,
    priceFrom: 79,
    description: "Family-friendly balloon experiences",
  },
  {
    id: "4",
    name: "Sky Cruise",
    logo: null,
    rating: 4.6,
    totalFlights: 650,
    priceFrom: 89,
    description: "Luxury champagne flights at sunrise",
  },
]

export function OperatorsSection() {
  const { locale, isRTL } = useI18n()

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
            {isRTL ? "شركات البالون" : "Balloon Operators"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "اختر من أفضل شركات البالون في الأقصر"
              : "Choose from the best hot air balloon companies in Luxor"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {operators.map((op, index) => (
            <motion.div
              key={op.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:-translate-y-2 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className={cn("flex items-start gap-4 mb-4", isRTL && "flex-row-reverse")}>
                    <Avatar className="w-16 h-16 rounded-xl border-2 border-desert-gold/30">
                      <AvatarImage src={op.logo || undefined} alt={op.name} />
                      <AvatarFallback className={cn("text-lg font-bold", generateAvatarColor(op.name))}>
                        {getInitials(op.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-playfair font-semibold text-lg truncate">{op.name}</h3>
                      <div className={cn("flex items-center gap-1 mt-1", isRTL && "flex-row-reverse")}>
                        <Star className="w-4 h-4 text-desert-gold fill-desert-gold" />
                        <span className="text-sm font-medium">{op.rating}</span>
                        <span className="text-xs text-muted-foreground">({op.totalFlights} {isRTL ? "رحلة" : "flights"})</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{op.description}</p>
                  <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? "ابتداءً من" : "From"}</span>
                      <p className="text-xl font-playfair font-bold text-desert-gold">
                        {formatPrice(op.priceFrom)}
                      </p>
                    </div>
                    <Link href={`/${locale}/operators/${op.id}`}>
                      <Button size="sm" variant="outline" className="border-desert-gold text-desert-gold hover:bg-desert-gold hover:text-white group-hover:translate-x-1 transition-transform">
                        {isRTL ? "احجز" : "Book"}
                        <ChevronRight className={cn("w-4 h-4 ml-1", isRTL && "rotate-180 mr-1 ml-0")} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/operators`}>
            <Button variant="outline" size="lg" className="border-desert-gold text-desert-gold hover:bg-desert-gold hover:text-white">
              {isRTL ? "عرض جميع الشركات" : "View All Operators"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
