"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Users, Package, CreditCard, ChevronRight, ChevronLeft, Check, AlertCircle, Clock, MapPin } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { cn, formatPrice, validateMinPrice, getMinPriceError } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const steps = [
  { id: 1, label: "Date", labelAr: "التاريخ", icon: Calendar },
  { id: 2, label: "Passengers", labelAr: "المسافرون", icon: Users },
  { id: 3, label: "Package", labelAr: "الباقة", icon: Package },
  { id: 4, label: "Payment", labelAr: "الدفع", icon: CreditCard },
]

const packages = [
  { id: "standard", name: "Standard", nameAr: "قياسي", price: 79, description: "1 hour shared flight", descriptionAr: "رحلة مشتركة لمدة ساعة" },
  { id: "premium", name: "Premium", nameAr: "مميز", price: 129, description: "Champagne breakfast included", descriptionAr: "يشمل فطور شامبانيا" },
  { id: "private", name: "Private Charter", nameAr: "خاص", price: 299, description: "Entire balloon for your group", descriptionAr: "بالون كامل لمجموعتك" },
]

const timeSlots = [
  { time: "05:00", label: "5:00 AM", labelAr: "5:00 صباحاً" },
  { time: "05:30", label: "5:30 AM", labelAr: "5:30 صباحاً" },
  { time: "06:00", label: "6:00 AM", labelAr: "6:00 صباحاً" },
]

export default function BookingPage() {
  const { isRTL } = useI18n()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    passengers: 2,
    package: "standard",
    passengerNames: ["", ""],
    pickupLocation: "",
    specialRequests: "",
    totalPrice: 158,
  })
  const [priceError, setPriceError] = useState("")

  const selectedPackage = packages.find(p => p.id === bookingData.package)

  const updateBooking = (key: string, value: any) => {
    setBookingData(prev => {
      const newData = { ...prev, [key]: value }
      if (key === "passengers" || key === "package") {
        const pkg = packages.find(p => p.id === (key === "package" ? value : newData.package))
        newData.totalPrice = (pkg?.price || 79) * newData.passengers
      }
      return newData
    })
  }

  const handleNext = () => {
    if (currentStep === 3) {
      const pkg = packages.find(p => p.id === bookingData.package)
      if (pkg && !validateMinPrice(pkg.price)) {
        setPriceError(getMinPriceError())
        toast({
          title: "Error",
          description: getMinPriceError(),
          variant: "destructive",
        })
        return
      }
      setPriceError("")
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your flight is booked for ${bookingData.date} at ${bookingData.time}`,
      variant: "success",
    })
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gradient-gold mb-4">
            {isRTL ? "احجز رحلة البالون الخاصة بك" : "Book Your Balloon Ride"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isRTL ? "أكمل الخطوات الأربع لحجز رحلتك" : "Complete the four steps to book your flight"}
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
            {steps.map((step, index) => (
              <div key={step.id} className={cn("flex items-center", isRTL && "flex-row-reverse")}>
                <div className={cn("flex flex-col items-center", isRTL && "items-end")}>
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                      currentStep >= step.id
                        ? "bg-gradient-to-br from-desert-gold to-desert-gold-light text-white shadow-lg"
                        : "bg-sand-beige text-muted-foreground"
                    )}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium",
                    currentStep >= step.id ? "text-desert-gold" : "text-muted-foreground"
                  )}>
                    {isRTL ? step.labelAr : step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-full h-1 mx-2 rounded-full transition-all duration-300",
                    currentStep > step.id ? "bg-desert-gold" : "bg-sand-beige"
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-desert-gold/20">
              <CardContent className="p-8">
                {/* Step 1: Date & Time */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-playfair font-semibold mb-6">
                      {isRTL ? "اختر التاريخ والوقت" : "Select Date & Time"}
                    </h2>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isRTL ? "تاريخ الرحلة" : "Flight Date"}
                      </label>
                      <Input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => updateBooking("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        {isRTL ? "وقت الإطلاق" : "Launch Time"}
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => updateBooking("time", slot.time)}
                            className={cn(
                              "p-4 rounded-xl border-2 text-center transition-all duration-200",
                              bookingData.time === slot.time
                                ? "border-desert-gold bg-desert-gold/10 text-desert-gold"
                                : "border-sand-beige hover:border-desert-gold/50"
                            )}
                          >
                            <Clock className="w-5 h-5 mx-auto mb-2" />
                            <p className="font-semibold">{isRTL ? slot.labelAr : slot.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Passengers */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-playfair font-semibold mb-6">
                      {isRTL ? "عدد المسافرين" : "Number of Passengers"}
                    </h2>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isRTL ? "المسافرون" : "Passengers"}
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          onClick={() => updateBooking("passengers", Math.max(1, bookingData.passengers - 1))}
                          className="w-12 h-12 rounded-full"
                        >
                          -
                        </Button>
                        <span className="text-3xl font-playfair font-bold w-16 text-center">
                          {bookingData.passengers}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => updateBooking("passengers", Math.min(12, bookingData.passengers + 1))}
                          className="w-12 h-12 rounded-full"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium block">
                        {isRTL ? "أسماء المسافرين" : "Passenger Names"}
                      </label>
                      {Array.from({ length: bookingData.passengers }).map((_, i) => (
                        <Input
                          key={i}
                          placeholder={`${isRTL ? "مسافر" : "Passenger"} ${i + 1}`}
                          value={bookingData.passengerNames[i] || ""}
                          onChange={(e) => {
                            const names = [...bookingData.passengerNames]
                            names[i] = e.target.value
                            updateBooking("passengerNames", names)
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {isRTL ? "موقع الاستلام" : "Pickup Location"}
                      </label>
                      <select
                        value={bookingData.pickupLocation}
                        onChange={(e) => updateBooking("pickupLocation", e.target.value)}
                        className="w-full h-11 rounded-xl border border-sand-beige-dark/30 px-4 text-sm focus:ring-2 focus:ring-desert-gold focus:outline-none"
                      >
                        <option value="">{isRTL ? "اختر موقعاً" : "Select location"}</option>
                        <option value="west-bank">{isRTL ? "الضفة الغربية" : "West Bank"}</option>
                        <option value="east-bank">{isRTL ? "الضفة الشرقية" : "East Bank"}</option>
                        <option value="hotel-pickup">{isRTL ? "النقل من الفندق" : "Hotel Pickup"}</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Package */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-playfair font-semibold mb-6">
                      {isRTL ? "اختر باقتك" : "Choose Your Package"}
                    </h2>
                    {priceError && (
                      <div className="bg-balloon-red/10 border border-balloon-red/30 rounded-xl p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-balloon-red" />
                        <p className="text-sm text-balloon-red">{priceError}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => updateBooking("package", pkg.id)}
                          className={cn(
                            "p-6 rounded-xl border-2 text-left transition-all duration-200",
                            bookingData.package === pkg.id
                              ? "border-desert-gold bg-desert-gold/10"
                              : "border-sand-beige hover:border-desert-gold/50"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{isRTL ? pkg.nameAr : pkg.name}</h3>
                            <Badge className={cn(
                              pkg.id === "standard" ? "bg-desert-gold" :
                              pkg.id === "premium" ? "bg-balloon-red" : "bg-balloon-green",
                              "text-white"
                            )}>
                              {formatPrice(pkg.price)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {isRTL ? pkg.descriptionAr : pkg.description}
                          </p>
                        </button>
                      ))}
                    </div>
                    <div className="bg-sand-beige/30 rounded-xl p-4">
                      <div className={cn("flex items-center justify-between", isRTL && "flex-row-reverse")}>
                        <span className="text-sm text-muted-foreground">
                          {bookingData.passengers} {isRTL ? "مسافر ×" : "passengers ×"} {formatPrice(selectedPackage?.price || 79)}
                        </span>
                        <span className="text-2xl font-playfair font-bold text-desert-gold">
                          {formatPrice(bookingData.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-playfair font-semibold mb-6">
                      {isRTL ? "تأكيد الحجز والدفع" : "Confirm & Pay"}
                    </h2>
                    <div className="bg-sand-beige/30 rounded-xl p-6 space-y-4">
                      <h3 className="font-semibold">{isRTL ? "ملخص الحجز" : "Booking Summary"}</h3>
                      <div className="space-y-2 text-sm">
                        <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                          <span className="text-muted-foreground">{isRTL ? "التاريخ" : "Date"}</span>
                          <span className="font-medium">{bookingData.date}</span>
                        </div>
                        <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                          <span className="text-muted-foreground">{isRTL ? "الوقت" : "Time"}</span>
                          <span className="font-medium">{bookingData.time}</span>
                        </div>
                        <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                          <span className="text-muted-foreground">{isRTL ? "المسافرون" : "Passengers"}</span>
                          <span className="font-medium">{bookingData.passengers}</span>
                        </div>
                        <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                          <span className="text-muted-foreground">{isRTL ? "الباقة" : "Package"}</span>
                          <span className="font-medium">{isRTL ? selectedPackage?.nameAr : selectedPackage?.name}</span>
                        </div>
                        <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                          <span className="text-muted-foreground">{isRTL ? "موقع الاستلام" : "Pickup"}</span>
                          <span className="font-medium">{bookingData.pickupLocation || "Hotel Pickup"}</span>
                        </div>
                        <div className="border-t border-sand-beige-dark/30 pt-2">
                          <div className={cn("flex justify-between", isRTL && "flex-row-reverse")}>
                            <span className="font-semibold">{isRTL ? "الإجمالي" : "Total"}</span>
                            <span className="text-xl font-playfair font-bold text-desert-gold">
                              {formatPrice(bookingData.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-sm text-yellow-800">
                        {isRTL 
                          ? "سيتم توجيهك إلى بوابة الدفع (Paymob) لإكمال الحجز."
                          : "You will be redirected to Paymob payment gateway to complete your booking."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className={cn("flex items-center justify-between mt-8 pt-6 border-t border-sand-beige/30", isRTL && "flex-row-reverse")}>
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="border-desert-gold text-desert-gold hover:bg-desert-gold hover:text-white"
                  >
                    <ChevronLeft className={cn("w-4 h-4 mr-2", isRTL && "rotate-180 mr-0 ml-2")} />
                    {isRTL ? "رجوع" : "Back"}
                  </Button>
                  {currentStep < 4 ? (
                    <Button onClick={handleNext} className="bg-gradient-to-r from-desert-gold to-desert-gold-light">
                      {isRTL ? "التالي" : "Next"}
                      <ChevronRight className={cn("w-4 h-4 ml-2", isRTL && "rotate-180 mr-2 ml-0")} />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-gradient-to-r from-balloon-green to-balloon-green-light">
                      <CreditCard className="w-4 h-4 mr-2" />
                      {isRTL ? "تأكيد الحجز" : "Confirm Booking"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
