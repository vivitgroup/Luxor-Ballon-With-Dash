import { HeroSection } from "@/components/sections/hero"
import { WeatherWidget } from "@/components/sections/weather-widget"
import { PackagesSection } from "@/components/sections/packages"
import { OperatorsSection } from "@/components/sections/operators"
import { ReviewsSection } from "@/components/sections/reviews"
import { GallerySection } from "@/components/sections/gallery"
import { TrustSection } from "@/components/sections/trust"
import { MapSection } from "@/components/sections/map-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WeatherWidget />
      <PackagesSection />
      <OperatorsSection />
      <ReviewsSection />
      <GallerySection />
      <TrustSection />
      <MapSection />
    </>
  )
}
