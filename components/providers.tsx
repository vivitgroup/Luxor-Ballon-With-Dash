"use client"

import { ReactNode } from "react"
import { Locale } from "@/lib/i18n"
import { I18nProvider } from "@/components/i18n-provider"
import { Toaster } from "@/components/ui/toaster"

interface ProvidersProps {
  children: ReactNode
  locale: Locale
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <I18nProvider locale={locale}>
      {children}
      <Toaster />
    </I18nProvider>
  )
}
