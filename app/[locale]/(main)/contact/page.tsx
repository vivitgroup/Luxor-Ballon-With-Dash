"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, Globe } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { isRTL } = useI18n()
  const { toast } = useToast()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
      variant: "success",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: "Address",
      labelAr: "العنوان",
      value: "West Bank, Luxor, Egypt",
      color: "from-desert-gold to-desert-gold-light",
    },
    {
      icon: Phone,
      label: "Phone",
      labelAr: "الهاتف",
      value: "+20 123 456 7890",
      color: "from-balloon-red to-balloon-red-light",
    },
    {
      icon: Mail,
      label: "Email",
      labelAr: "البريد الإلكتروني",
      value: "info@luxorballoons.com",
      color: "from-balloon-green to-balloon-green-light",
    },
    {
      icon: Clock,
      label: "Working Hours",
      labelAr: "ساعات العمل",
      value: "Daily 4:00 AM - 10:00 AM",
      color: "from-sky-blue to-sky-blue-light",
    },
  ]

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
            {isRTL ? "تواصل معنا" : "Contact Us"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "نحن هنا لمساعدتك في حجز رحلتك"
              : "We're here to help you book your perfect flight"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className={cn("p-6", isRTL && "text-right")}>
                  <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0", item.color)}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{isRTL ? item.labelAr : item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+201234567890"}?text=${encodeURIComponent("Hello! I'm interested in booking a hot air balloon ride in Luxor.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="bg-green-500 hover:bg-green-600 transition-colors cursor-pointer">
                <CardContent className={cn("p-6", isRTL && "text-right")}>
                  <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{isRTL ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</p>
                      <p className="text-white/80 text-sm">{isRTL ? "رد سريع خلال دقائق" : "Quick response within minutes"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>

            {/* Map Placeholder */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[250px] bg-gradient-to-br from-sand-beige to-sky-blue/20 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-10 h-10 text-desert-gold mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? "خريطة موقعنا" : "Our Location"}
                    </p>
                    <p className="text-xs text-desert-gold mt-1">West Bank, Luxor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-playfair font-semibold mb-6">
                  {isRTL ? "أرسل رسالة" : "Send a Message"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isRTL ? "اسمك" : "Your Name"}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isRTL ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={isRTL ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isRTL ? "الرسالة" : "Message"}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here..."}
                      rows={5}
                      className="w-full rounded-xl border border-sand-beige-dark/30 bg-white/80 px-4 py-3 text-sm focus:ring-2 focus:ring-desert-gold focus:outline-none resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-desert-gold to-desert-gold-light">
                    <Send className="w-4 h-4 mr-2" />
                    {isRTL ? "إرسال الرسالة" : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
