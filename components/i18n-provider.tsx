"use client"

import { createContext, useContext, ReactNode } from "react"
import { Locale, isRTL } from "@/lib/i18n"

interface I18nContextType {
  locale: Locale
  isRTL: boolean
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

import en from "@/messages/en.json"
import ar from "@/messages/ar.json"

const messages = { en, ar }

export function I18nProvider({ 
  children, 
  locale 
}: { 
  children: ReactNode
  locale: Locale 
}) {
  const messageSet = messages[locale] || messages.en

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = messageSet
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <I18nContext.Provider value={{ locale, isRTL: isRTL(locale), t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
