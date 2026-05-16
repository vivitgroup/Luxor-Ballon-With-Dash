"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, Wrench, CheckCircle } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const trustItems = [
  {
    icon: Award,
    title: "Licensed Operators",
    titleAr: "شركات مرخصة",
    description: "All operators are fully licensed by Egyptian Civil Aviation Authority",
    descriptionAr: "جميع الشركات مرخصة بالكامل من قبل الهيئة المصرية للطيران المدني",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    titleAr: "مؤمن بالكامل",
    description: "Comprehensive insurance coverage for all passengers and flights",
    descriptionAr: "تغطية تأمينية شاملة لجميع المسافرين والرحلات",
  },
  {
    icon: Users,
    title: "Expert Pilots",
    titleAr: "طيارون خبراء",
    description: "Pilots with 1000+ hours of flight experience over Luxor",
    descriptionAr: "طيارون بخبرة +1000 ساعة طيران فوق الأقصر",
  },
  {
    icon: Wrench,
    title: "Regular Maintenance",
    titleAr: "صيانة دورية",
    description: "All balloons undergo strict maintenance checks before every flight",
    descriptionAr: "جميع البالونات تخضع لفحوصات صيانة صارمة قبل كل رحلة",
  },
]

export function TrustSection() {
  const { isRTL } = useI18n()

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
            {isRTL ? "الثقة والأمان" : "Trust & Safety"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "سلامتك هي أولويتنا القصوى. نحن نلتزم بأعلى معايير السلامة"
              : "Your safety is our top priority. We adhere to the highest safety standards"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-desert-gold to-desert-gold-light flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-playfair font-semibold text-lg mb-2">
                    {isRTL ? item.titleAr : item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isRTL ? item.descriptionAr : item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Safety Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
        >
          {[
            { value: "15+", label: "Years Experience", labelAr: "سنوات خبرة" },
            { value: "50,000+", label: "Happy Passengers", labelAr: "مسافر سعيد" },
            { value: "0", label: "Safety Incidents", labelAr: "حوادث سلامة" },
            { value: "100%", label: "Safety Record", labelAr: "سجل سلامة" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-playfair font-bold text-desert-gold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{isRTL ? stat.labelAr : stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
