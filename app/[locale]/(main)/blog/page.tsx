"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const posts = [
  {
    id: "1",
    title: "Best Time to Visit Luxor for Hot Air Balloon Rides",
    titleAr: "أفضل وقت لزيارة الأقصر لرحلات البالون الهوائية",
    excerpt: "Discover the ideal seasons and weather conditions for the most spectacular balloon experiences over ancient Egypt.",
    excerptAr: "اكتشف المواسم المثالية وظروف الطقس لأكثر تجارب البالون إذهالاً فوق مصر القديمة.",
    image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop",
    category: "Travel Tips",
    categoryAr: "نصائح السفر",
    date: "2024-05-10",
    slug: "best-time-visit-luxor",
  },
  {
    id: "2",
    title: "What to Expect on Your First Hot Air Balloon Flight",
    titleAr: "ما يمكن توقعه في رحلتك الأولى بالبالون الهوائي",
    excerpt: "A complete guide for first-time flyers: from pre-flight preparations to landing celebrations.",
    excerptAr: "دليل كامل للطيارين المبتدئين: من التحضيرات قبل الرحلة إلى احتفالات الهبوط.",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=2574&auto=format&fit=crop",
    category: "Guide",
    categoryAr: "دليل",
    date: "2024-04-22",
    slug: "first-balloon-flight-guide",
  },
  {
    id: "3",
    title: "Top 5 Ancient Sites Visible from Luxor Balloons",
    titleAr: "أفضل 5 مواقع أثرية مرئية من بالونات الأقصر",
    excerpt: "From the Valley of the Kings to Karnak Temple, explore the breathtaking views you'll see from above.",
    excerptAr: "من وادي الملوك إلى معبد الكرنك، استكشف الإطلالات الخلابة التي ستشاهدها من الأعلى.",
    image: "https://images.unsplash.com/photo-1542259681-d4cd71a3c3a0?q=80&w=2574&auto=format&fit=crop",
    category: "History",
    categoryAr: "تاريخ",
    date: "2024-04-15",
    slug: "top-ancient-sites",
  },
  {
    id: "4",
    title: "Safety Standards for Hot Air Ballooning in Egypt",
    titleAr: "معايير السلامة للطيران بالبالون في مصر",
    excerpt: "Understanding the rigorous safety protocols that make Egyptian balloon tourism one of the safest in the world.",
    excerptAr: "فهم بروتوكولات السلامة الصارمة التي تجعل سياحة البالون في مصر من الأكثر أماناً في العالم.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop",
    category: "Safety",
    categoryAr: "سلامة",
    date: "2024-03-28",
    slug: "safety-standards",
  },
  {
    id: "5",
    title: "Photography Tips for Balloon Rides Over Luxor",
    titleAr: "نصائح التصوير لرحلات البالون فوق الأقصر",
    excerpt: "Capture stunning aerial photographs of temples, the Nile, and desert landscapes during your flight.",
    excerptAr: "التقط صوراً جوية مذهلة للمعابد والنيل والمناظر الصحراوية أثناء رحلتك.",
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=2574&auto=format&fit=crop",
    category: "Photography",
    categoryAr: "تصوير",
    date: "2024-03-10",
    slug: "photography-tips",
  },
  {
    id: "6",
    title: "Luxor Travel Guide: Beyond the Balloon Ride",
    titleAr: "دليل سفر الأقصر: ما وراء رحلة البالون",
    excerpt: "Complete travel guide to Luxor including temples, museums, local cuisine, and cultural experiences.",
    excerptAr: "دليل سفر شامل للأقصر يشمل المعابد والمتاحف والمأكولات المحلية والتجارب الثقافية.",
    image: "https://images.unsplash.com/photo-1539650116455-8efdb4f8539e?q=80&w=2574&auto=format&fit=crop",
    category: "Travel Guide",
    categoryAr: "دليل السفر",
    date: "2024-02-20",
    slug: "luxor-travel-guide",
  },
]

export default function BlogPage() {
  const { locale, isRTL } = useI18n()

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
            {isRTL ? "المدونة" : "Blog"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL 
              ? "نصائح سفر وأدلة وقصص من الأقصر"
              : "Travel tips, guides, and stories from Luxor"}
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <Card className="h-full hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={isRTL ? post.titleAr : post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-desert-gold text-white">
                        {isRTL ? post.categoryAr : post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground mb-3", isRTL && "flex-row-reverse")}>
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-playfair font-semibold text-lg mb-2 group-hover:text-desert-gold transition-colors">
                      {isRTL ? post.titleAr : post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {isRTL ? post.excerptAr : post.excerpt}
                    </p>
                    <div className={cn("flex items-center text-desert-gold text-sm font-medium", isRTL && "flex-row-reverse")}>
                      {isRTL ? "اقرأ المزيد" : "Read More"}
                      <ArrowRight className={cn("w-4 h-4 ml-1", isRTL && "rotate-180 mr-1 ml-0")} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
