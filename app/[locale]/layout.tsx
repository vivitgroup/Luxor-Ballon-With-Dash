import { notFound } from "next/navigation"
import { locales, getDirection } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { Providers } from "@/components/providers"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const dir = getDirection(locale as Locale)

  return (
    <div lang={locale} dir={dir}>
      <Providers locale={locale as Locale}>
        {children}
      </Providers>
    </div>
  )
}
