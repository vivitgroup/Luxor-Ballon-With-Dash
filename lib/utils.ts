import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function formatTime(time: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(time))
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function generateAvatarColor(name: string): string {
  const colors = [
    "bg-desert-gold",
    "bg-balloon-red",
    "bg-balloon-green",
    "bg-sky-blue",
    "bg-sand-beige-dark",
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export function validateMinPrice(price: number): boolean {
  return price >= 79
}

export function getMinPriceError(): string {
  return "Minimum price per seat is $79"
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export function getPackageColor(type: string): string {
  switch (type) {
    case "standard":
      return "bg-desert-gold"
    case "premium":
      return "bg-balloon-red"
    case "private":
      return "bg-balloon-green"
    default:
      return "bg-desert-gold"
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "confirmed":
    case "completed":
      return "bg-green-500"
    case "pending":
      return "bg-yellow-500"
    case "cancelled":
      return "bg-red-500"
    case "scheduled":
      return "bg-blue-500"
    case "boarding":
      return "bg-purple-500"
    case "in_air":
      return "bg-sky-400"
    default:
      return "bg-gray-500"
  }
}
