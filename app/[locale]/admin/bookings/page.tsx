"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Calendar, ArrowUpDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const bookings = [
  { id: "B-001", customer: "John Smith", email: "john@example.com", flight: "05:00 AM", date: "2024-06-20", seats: 2, status: "confirmed", total: 158, operator: "Sindbad Balloons" },
  { id: "B-002", customer: "Emma Wilson", email: "emma@example.com", flight: "05:30 AM", date: "2024-06-20", seats: 2, status: "pending", total: 258, operator: "Hod Hod Soliman" },
  { id: "B-003", customer: "Ahmed Hassan", email: "ahmed@example.com", flight: "06:00 AM", date: "2024-06-20", seats: 1, status: "confirmed", total: 79, operator: "Magic Horizon" },
  { id: "B-004", customer: "Sarah Johnson", email: "sarah@example.com", flight: "05:00 AM", date: "2024-06-21", seats: 4, status: "confirmed", total: 516, operator: "Sky Cruise" },
  { id: "B-005", customer: "Karim Mahmoud", email: "karim@example.com", flight: "05:30 AM", date: "2024-06-21", seats: 1, status: "cancelled", total: 129, operator: "Sindbad Balloons" },
  { id: "B-006", customer: "Lisa Chen", email: "lisa@example.com", flight: "06:00 AM", date: "2024-06-21", seats: 2, status: "pending", total: 158, operator: "Nile Dream" },
  { id: "B-007", customer: "Mohamed Ali", email: "mohamed@example.com", flight: "05:00 AM", date: "2024-06-22", seats: 3, status: "confirmed", total: 387, operator: "Pharaoh's Flight" },
  { id: "B-008", customer: "Anna Schmidt", email: "anna@example.com", flight: "05:30 AM", date: "2024-06-22", seats: 2, status: "confirmed", total: 258, operator: "Hod Hod Soliman" },
]

export default function BookingsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Booking ${bookingId} marked as ${newStatus}`,
      variant: "success",
    })
  }

  const handleDownloadManifest = (bookingId: string) => {
    toast({
      title: "Download Started",
      description: `Passenger manifest for ${bookingId} is being downloaded`,
      variant: "success",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-playfair font-bold text-white">Bookings Management</h2>
        <Button className="bg-gradient-to-r from-desert-gold to-desert-gold-light">
          <Download className="w-4 h-4 mr-2" />
          Export All
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["all", "confirmed", "pending", "cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status 
                    ? "bg-desert-gold text-white" 
                    : "border-white/20 text-white/60 hover:bg-white/5"
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Customer</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Flight</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Seats</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-white font-mono">{booking.id}</td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm text-white font-medium">{booking.customer}</p>
                        <p className="text-xs text-white/40">{booking.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/80">{booking.flight}</td>
                    <td className="py-4 px-6 text-sm text-white/80">{booking.date}</td>
                    <td className="py-4 px-6 text-sm text-white/80">{booking.seats}</td>
                    <td className="py-4 px-6 text-sm text-desert-gold font-medium">${booking.total}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        booking.status === "confirmed" && "bg-balloon-green",
                        booking.status === "pending" && "bg-yellow-500",
                        booking.status === "cancelled" && "bg-balloon-red",
                        "text-white"
                      )}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === "pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-balloon-green hover:text-balloon-green h-8 w-8 p-0"
                              onClick={() => handleStatusChange(booking.id, "confirmed")}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-balloon-red hover:text-balloon-red h-8 w-8 p-0"
                              onClick={() => handleStatusChange(booking.id, "cancelled")}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-white/60 hover:text-white h-8 w-8 p-0"
                          onClick={() => handleDownloadManifest(booking.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
