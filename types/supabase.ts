export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          flight_id: string
          status: string
          seats: number
          total_price: number
          payment_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          flight_id: string
          status?: string
          seats: number
          total_price: number
          payment_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: string
          payment_status?: string
          updated_at?: string
        }
      }
      flights: {
        Row: {
          id: string
          operator_id: string
          date: string
          time: string
          price: number
          seats_total: number
          seats_available: number
          status: string
          package: string
          created_at: string
        }
        Insert: {
          id?: string
          operator_id: string
          date: string
          time: string
          price: number
          seats_total: number
          seats_available: number
          status?: string
          package?: string
          created_at?: string
        }
        Update: {
          date?: string
          time?: string
          price?: number
          seats_available?: number
          status?: string
        }
      }
      operators: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          rating: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          rating?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          name?: string
          email?: string | null
          phone?: string | null
          rating?: number | null
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
