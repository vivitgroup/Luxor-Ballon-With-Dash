"use client"

import { motion } from "framer-motion"
import { Check, Star, Crown, Users } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn, formatPrice } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const packages = [
  {
    id: "standard",
    name: "Standard",
    nameAr: "قياسي",
    price: 79,
    description: "1 hour shared balloon flight with 8-12 people",
    descriptionAr: "رحلة بالون مشتركة لمدة ساعة مع 8-12 شخص",
    features: ["1 hour flight", "Shared basket (8-12 people)", "Hotel pickup", "Flight certificate"],
    featuresAr: ["رحلة لمدة ساعة", "سلة مشتركة (8-12 شخص)", "النقل من الفندق", "شهادة الطيران"],
    icon: Users,
    color: "from-desert-gold to-desert-gold-light",
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    nameAr: "مميز",
    price: 129,
    description: "1 hour flight with better views and champagne breakfast",
    descriptionAr: "رحلة لمدة ساعة مع إطلالات أفضل وفطور شامبانيا",
    features: ["1 hour flight", "Smaller basket (4-6 people)", "Champagne breakfast", "Priority boarding", "HD photos"],
    featuresAr: ["رحلة لمدة ساعة", "سلة أصغر (4-6 أشخاص)", "فطور شامبانيا", "أولوية الصعود", "صور عالية الدقة"],
    icon: Star,
    color: "from-balloon-red to-balloon-red-light",
    popular: true,
  },
  {
    id: "private",
    name: "Private Charter",
    nameAr: "خاص",
    price: 299,
    description: "Entire balloon for your group, any size",
    descriptionAr: "بالون كامل لمجموعتك، أي عدد",
    features: ["Private entire balloon", "Custom flight path", "Champagne celebration", "Personal photographer", "VIP transport"],
    featuresAr: ["بالون خاص بالكامل", "مسار طيران مخصص", "احتفال شامبانيا", "مصور شخصي", "نقل VIP"],
    icon: Crown,
    color: "from-balloon-green to-balloon-green-light",
    popular: false,
  },
]

export function PackagesSection() {
  const { locale, isRTL } = useI18n()

  return (
    <section className="py-24 bg-gradient-to-b from-white to-sand-beige-light/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "اختر باقتك" : "Choose Your Package"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "من الرحلات المشتركة إلى البالون الخاص، لدينا الخيار المثالي لك"
              : "From shared flights to private charters, we have the perfect option for you"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className={cn(
                "relative h-full transition-all duration-300 hover:-translate-y-2",
                pkg.popular && "border-desert-gold shadow-xl shadow-desert-gold/20 scale-105 z-10"
              )}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-desert-gold to-balloon-red text-white text-sm font-medium rounded-full">
                    {isRTL ? "الأكثر شعبية" : "Most Popular"}
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <div className={cn(
                    "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4",
                    pkg.color
                  )}>
                    <pkg.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-playfair">
                    {isRTL ? pkg.nameAr : pkg.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isRTL ? pkg.descriptionAr : pkg.description}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-5xl font-playfair font-bold text-gradient-gold">
                      {formatPrice(pkg.price)}
                    </span>
                    <span className="text-muted-foreground"> / {isRTL ? "شخص" : "person"}</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-left">
                    {(isRTL ? pkg.featuresAr : pkg.features).map((feature, i) => (
                      <li key={i} className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                        <Check className="w-5 h-5 text-balloon-green shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/booking?package=${pkg.id}`} className="w-full">
                    <Button className={cn(
                      "w-full bg-gradient-to-r text-white font-semibold",
                      pkg.color
                    )}>
                      {isRTL ? "احجز الآن" : "Book Now"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
