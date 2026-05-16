"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn } from "@/lib/utils"

const images = [
  {
    src: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop",
    alt: "Hot air balloons over Luxor at sunrise",
    altAr: "بالونات هوائية فوق الأقصر عند الشروق",
  },
  {
    src: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=2574&auto=format&fit=crop",
    alt: "Valley of the Kings from above",
    altAr: "وادي الملوك من الأعلى",
  },
  {
    src: "https://images.unsplash.com/photo-1539650116455-8efdb4f8539e?q=80&w=2574&auto=format&fit=crop",
    alt: "Nile River at dawn",
    altAr: "نهر النيل عند الفجر",
  },
  {
    src: "https://images.unsplash.com/photo-1542259681-d4cd71a3c3a0?q=80&w=2574&auto=format&fit=crop",
    alt: "Luxor Temple aerial view",
    altAr: "معبد الأقصر من الأعلى",
  },
  {
    src: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=2574&auto=format&fit=crop",
    alt: "Desert landscape with balloons",
    altAr: "منظر صحراوي مع بالونات",
  },
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop",
    alt: "Sunrise over Egyptian desert",
    altAr: "الشروق فوق الصحراء المصرية",
  },
]

export function GallerySection() {
  const { isRTL } = useI18n()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-sand-beige-light/20 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "معرض الصور" : "Photo Gallery"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {isRTL ? "لحظات ملتقطة فوق النيل" : "Moments captured above the Nile"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-2xl cursor-pointer group",
                index === 0 || index === 3 ? "md:col-span-2 md:row-span-2" : ""
              )}
              onClick={() => setSelectedImage(index)}
            >
              <div className={cn(
                "relative overflow-hidden",
                index === 0 || index === 3 ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"
              )}>
                <img
                  src={image.src}
                  alt={isRTL ? image.altAr : image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">
                    {isRTL ? image.altAr : image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-base/95 backdrop-blur-lg flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <button
              className="absolute left-6 p-2 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-6 p-2 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[selectedImage].src}
              alt={isRTL ? images[selectedImage].altAr : images[selectedImage].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
