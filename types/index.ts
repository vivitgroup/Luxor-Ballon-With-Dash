export interface User {
  id: string
  email: string
  role: 'tourist' | 'operator' | 'admin'
  name: string
  phone?: string
  avatar?: string
  created_at: string
}

export interface Operator {
  id: string
  name: string
  logo_url?: string
  description?: string
  rating: number
  total_flights: number
  revenue: number
  is_active: boolean
  whatsapp?: string
  email?: string
  phone?: string
  address?: string
  created_at: string
}

export interface Balloon {
  id: string
  operator_id: string
  name: string
  capacity: number
  image_url?: string
  description?: string
  is_active: boolean
}

export interface Flight {
  id: string
  balloon_id: string
  operator_id: string
  departure_time: string
  price_per_seat: number
  seats_available: number
  seats_total: number
  status: 'scheduled' | 'boarding' | 'in_air' | 'completed' | 'cancelled'
  package_type: 'standard' | 'premium' | 'private'
  created_at: string
}

export interface Booking {
  id: string
  flight_id: string
  user_id: string
  seats: number
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  passenger_names: string[]
  pickup_location_id?: string
  special_requests?: string
  created_at: string
}

export interface Payment {
  id: string
  booking_id: string
  amount: number
  currency: string
  gateway: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  paid_at?: string
  created_at: string
}

export interface Review {
  id: string
  booking_id: string
  user_id: string
  operator_id: string
  rating: number
  comment: string
  created_at: string
}

export interface PickupLocation {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  hotel_name?: string
}

export interface WeatherEvent {
  id: string
  flight_id: string
  condition: string
  action_taken: string
  created_at: string
}

export interface Cancellation {
  id: string
  booking_id: string
  reason: string
  refund_amount: number
  created_at: string
}

export interface PackageTier {
  id: string
  name: string
  name_ar: string
  price: number
  description: string
  description_ar: string
  features: string[]
  features_ar: string[]
  is_private: boolean
}

export interface BlogPost {
  id: string
  title: string
  title_ar: string
  slug: string
  excerpt: string
  excerpt_ar: string
  content: string
  content_ar: string
  image_url?: string
  category: string
  published_at: string
  author: string
}

export interface NavItem {
  label: string
  label_ar: string
  href: string
  icon?: string
}

export interface DashboardStats {
  totalRevenue: number
  todayBookings: number
  activeOperators: number
  avgRating: number
  totalFlights: number
  totalPassengers: number
}

export interface RevenueData {
  date: string
  revenue: number
  bookings: number
}
