"use client"

import { motion } from "framer-motion"
import { Target, Heart, Globe, Users } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const team = [
  { name: "Omar Hassan", nameAr: "عمر حسن", role: "Founder & CEO", roleAr: "المؤسس والرئيس التنفيذي", image: "OH" },
  { name: "Fatima Ali", nameAr: "فاطمة علي", role: "Operations Manager", roleAr: "مديرة العمليات", image: "FA" },
  { name: "Karim Mahmoud", nameAr: "كريم محمود", role: "Head Pilot", roleAr: "رئيس الطيارين", image: "KM" },
]

export default function AboutPage() {
  const { isRTL } = useI18n()

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-dark-base/70" />
        </div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4"
          >
            {isRTL ? "عن بالونات الأقصر" : "About Luxor Balloons"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            {isRTL ? "قصة شغف تطفو فوق السحب" : "A story of passion floating above the clouds"}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-playfair font-bold text-gradient-gold mb-6">
            {isRTL ? "قصتنا" : "Our Story"}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isRTL 
              ? "أسست بالونات الأقصر عام 2010 بهدف مشاركة جمال الأقصر الفريد من السماء. ما بدأ كبالون واحد تحول إلى شبكة من أفضل مشغلي البالون في مصر، حيث نقدم تجارب لا تُنسى للمسافرين من جميع أنحاء العالم."
              : "Luxor Balloons was founded in 2010 with a mission to share Luxor's unique beauty from the sky. What started as a single balloon has grown into a network of Egypt's finest balloon operators, offering unforgettable experiences to travelers from around the world."}
          </p>
        </motion.div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Target, title: "Our Mission", titleAr: "مهمتنا", desc: "To provide the safest, most memorable hot air balloon experiences over Egypt's ancient wonders.", descAr: "تقديم أكثر تجارب البالون أماناً ولا تُنسى فوق عجائب مصر القديمة." },
            { icon: Heart, title: "Our Values", titleAr: "قيمنا", desc: "Safety first, customer delight, environmental responsibility, and cultural respect.", descAr: "السلامة أولاً، إسعاد العملاء، المسؤولية البيئية، واحترام الثقافة." },
            { icon: Globe, title: "Our Vision", titleAr: "رؤيتنا", desc: "To be the world's most trusted platform for hot air balloon adventures.", descAr: "أن نكون المنصة الأكثر ثقة في العالم لمغامرات البالون الهوائية." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-desert-gold to-desert-gold-light flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-playfair font-semibold text-xl mb-3">{isRTL ? item.titleAr : item.title}</h3>
                  <p className="text-muted-foreground">{isRTL ? item.descAr : item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "فريقنا" : "Our Team"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-desert-gold to-balloon-red flex items-center justify-center mb-4 text-white text-2xl font-bold">
                {member.image}
              </div>
              <h3 className="font-playfair font-semibold text-lg">{isRTL ? member.nameAr : member.name}</h3>
              <p className="text-sm text-desert-gold">{isRTL ? member.roleAr : member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
