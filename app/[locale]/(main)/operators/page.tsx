"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, Star, Plane, ChevronRight, SlidersHorizontal } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn, formatPrice, getInitials, generateAvatarColor } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    description: "Leading balloon operator with 15+ years experience. Known for safety and professionalism.",
    descriptionAr: "شركة بالون رائدة بخبرة 15+ سنة. معروفة بالسلامة والاحترافية.",
    isActive: true,
    features: ["WiFi on board", "Professional photos", "Champagne service"],
    featuresAr: ["واي فاي على متن", "صور احترافية", "خدمة شامبانيا"],
  },
  {
    id: "2",
    name: "Hod Hod Soliman",
    logo: null,
    rating: 4.8,
    totalFlights: 950,
    priceFrom: 85,
    description: "Premium flights with expert pilots. Smaller baskets for intimate experiences.",
    descriptionAr: "رحلات مميزة مع طيارين خبراء. سلال أصغر لتجارب حميمة.",
    isActive: true,
    features: ["Small groups", "Expert pilots", "Luxury transport"],
    featuresAr: ["مجموعات صغيرة", "طيارون خبراء", "نقل فاخر"],
  },
  {
    id: "3",
    name: "Magic Horizon",
    logo: null,
    rating: 4.7,
    totalFlights: 800,
    priceFrom: 79,
    description: "Family-friendly balloon experiences with special packages for children.",
    descriptionAr: "تجارب بالون عائلية مع باقات خاصة للأطفال.",
    isActive: true,
    features: ["Family packages", "Kids friendly", "Flexible booking"],
    featuresAr: ["باقات عائلية", "مناسب للأطفال", "حجز مرن"],
  },
  {
    id: "4",
    name: "Sky Cruise",
    logo: null,
    rating: 4.6,
    totalFlights: 650,
    priceFrom: 89,
    description: "Luxury champagne flights at sunrise. Perfect for special occasions.",
    descriptionAr: "رحلات فاخرة مع شامبانيا عند الشروق. مثالية للمناسبات الخاصة.",
    isActive: true,
    features: ["Champagne breakfast", "Special occasions", "VIP service"],
    featuresAr: ["فطور شامبانيا", "مناسبات خاصة", "خدمة VIP"],
  },
  {
    id: "5",
    name: "Nile Dream",
    logo: null,
    rating: 4.5,
    totalFlights: 500,
    priceFrom: 79,
    description: "Affordable quality flights with stunning Nile views.",
    descriptionAr: "رحلات بجودة بأسعار معقولة مع إطلالات رائعة على النيل.",
    isActive: true,
    features: ["Nile views", "Affordable", "Group discounts"],
    featuresAr: ["إطلالات النيل", "أسعار معقولة", "خصومات جماعية"],
  },
  {
    id: "6",
    name: "Pharaoh's Flight",
    logo: null,
    rating: 4.4,
    totalFlights: 400,
    priceFrom: 79,
    description: "Authentic Egyptian experience with traditional hospitality.",
    descriptionAr: "تجربة مصرية أصيلة مع ضيافة تقليدية.",
    isActive: true,
    features: ["Traditional tea", "Cultural guide", "Local experience"],
    featuresAr: ["شاي تقليدي", "مرشد ثقافي", "تجربة محلية"],
  },
]

export default function OperatorsPage() {
  const { locale, isRTL } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [filterActive, setFilterActive] = useState(true)

  const filteredOperators = operators
    .filter(op => 
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filterActive || op.isActive)
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "flights") return b.totalFlights - a.totalFlights
      if (sortBy === "price") return a.priceFrom - b.priceFrom
      return 0
    })

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
            {isRTL ? "شركات البالون" : "Balloon Operators"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "اختر من أفضل شركات البالون في الأقصر"
              : "Choose from the best hot air balloon companies in Luxor"}
          </p>
        </motion.div>

        {/* Filters */}
        <div className={cn("flex flex-wrap gap-4 mb-8", isRTL && "flex-row-reverse")}>
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? "ابحث عن شركة..." : "Search operators..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("rating")}
              className={sortBy === "rating" ? "" : "border-desert-gold text-desert-gold"}
            >
              <Star className="w-4 h-4 mr-1" />
              {isRTL ? "التقييم" : "Rating"}
            </Button>
            <Button
              variant={sortBy === "flights" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("flights")}
              className={sortBy === "flights" ? "" : "border-desert-gold text-desert-gold"}
            >
              <Plane className="w-4 h-4 mr-1" />
              {isRTL ? "الرحلات" : "Flights"}
            </Button>
            <Button
              variant={sortBy === "price" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("price")}
              className={sortBy === "price" ? "" : "border-desert-gold text-desert-gold"}
            >
              <SlidersHorizontal className="w-4 h-4 mr-1" />
              {isRTL ? "السعر" : "Price"}
            </Button>
          </div>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOperators.map((op, index) => (
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
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-lg">{op.name}</h3>
                      <div className={cn("flex items-center gap-2 mt-1", isRTL && "flex-row-reverse")}>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-desert-gold fill-desert-gold" />
                          <span className="text-sm font-medium">{op.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({op.totalFlights} {isRTL ? "رحلة" : "flights"})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {isRTL ? op.descriptionAr : op.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(isRTL ? op.featuresAr : op.features).map((feature, i) => (
                      <Badge key={i} variant="secondary" className="bg-sand-beige/50 text-dark-base text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className={cn("flex items-center justify-between pt-4 border-t border-sand-beige/30", isRTL && "flex-row-reverse")}>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? "ابتداءً من" : "From"}</span>
                      <p className="text-xl font-playfair font-bold text-desert-gold">
                        {formatPrice(op.priceFrom)}
                      </p>
                    </div>
                    <Link href={`/${locale}/booking?operator=${op.id}`}>
                      <Button size="sm" className="bg-gradient-to-r from-desert-gold to-desert-gold-light">
                        {isRTL ? "احجز الآن" : "Book Now"}
                        <ChevronRight className={cn("w-4 h-4 ml-1", isRTL && "rotate-180 mr-1 ml-0")} />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
