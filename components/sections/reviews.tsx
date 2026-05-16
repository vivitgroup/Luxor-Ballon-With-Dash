"use client"

import { motion } from "framer-motion"
import { Star, Quote, CheckCircle } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const reviews = [
  {
    id: "1",
    name: "Sarah Johnson",
    nameAr: "سارة جونسون",
    rating: 5,
    text: "Absolutely magical experience! Watching the sunrise over the Valley of the Kings from a balloon was unforgettable. The pilots were professional and safety was top priority.",
    textAr: "تجربة ساحرة بالفعل! مشاهدة الشروق فوق وادي الملوك من البالون كانت لا تُنسى. الطيارون محترفون والسلامة هي الأولوية القصوى.",
    date: "2024-03-15",
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Ahmed Hassan",
    nameAr: "أحمد حسن",
    rating: 5,
    text: "Best activity in Luxor! The champagne breakfast after landing was a lovely touch. Highly recommend the premium package for smaller groups.",
    textAr: "أفضل نشاط في الأقصر! فطور الشامبانيا بعد الهبوط كان لمسة جميلة. أنصح بشدة بالباقة المميزة للمجموعات الأصغر.",
    date: "2024-02-20",
    avatar: "AH",
  },
  {
    id: "3",
    name: "Emma Wilson",
    nameAr: "إيما ويلسون",
    rating: 4,
    text: "Great experience overall. The booking process was smooth and the team was very accommodating with our group of 8 people. Will definitely book again!",
    textAr: "تجربة رائعة بشكل عام. عملية الحجز كانت سلسة والفريق كان متعاوناً جداً مع مجموعتنا المكونة من 8 أشخاص. سأحجز بالتأكيد مرة أخرى!",
    date: "2024-01-10",
    avatar: "EW",
  },
]

export function ReviewsSection() {
  const { isRTL } = useI18n()

  return (
    <section className="py-24 bg-gradient-to-b from-white to-sand-beige-light/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "ما يقوله ضيوفنا" : "What Our Guests Say"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL ? "تقييمات حقيقية من مغامرين حقيقيين" : "Real reviews from real adventurers"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-desert-gold/30 mb-4" />
                  <div className={cn("flex items-center gap-1 mb-4", isRTL && "flex-row-reverse")}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < review.rating ? "text-desert-gold fill-desert-gold" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
                    {isRTL ? review.textAr : review.text}
                  </p>
                  <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-desert-gold to-balloon-red">
                      <AvatarFallback className="text-white text-sm font-bold">
                        {review.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{isRTL ? review.nameAr : review.name}</p>
                      <div className={cn("flex items-center gap-1", isRTL && "flex-row-reverse")}>
                        <CheckCircle className="w-3 h-3 text-balloon-green" />
                        <span className="text-xs text-muted-foreground">
                          {isRTL ? "حجز مؤكد" : "Verified Booking"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
