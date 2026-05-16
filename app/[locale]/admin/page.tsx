"use client"

import { motion } from "framer-motion"
import {
  DollarSign, Calendar, Building2, Star, TrendingUp,
  Users, Plane, AlertCircle, ArrowUpRight, ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,230",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-desert-gold to-desert-gold-light",
  },
  {
    title: "Today's Bookings",
    value: "24",
    change: "+8.2%",
    trend: "up",
    icon: Calendar,
    color: "from-balloon-green to-balloon-green-light",
  },
  {
    title: "Active Operators",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Building2,
    color: "from-sky-blue to-sky-blue-light",
  },
  {
    title: "Avg Rating",
    value: "4.8",
    change: "+0.3",
    trend: "up",
    icon: Star,
    color: "from-balloon-red to-balloon-red-light",
  },
]

const recentBookings = [
  { id: "B-001", customer: "John Smith", flight: "05:00 AM", date: "2024-06-20", status: "confirmed", total: "$158" },
  { id: "B-002", customer: "Emma Wilson", flight: "05:30 AM", date: "2024-06-20", status: "pending", total: "$258" },
  { id: "B-003", customer: "Ahmed Hassan", flight: "06:00 AM", date: "2024-06-20", status: "confirmed", total: "$79" },
  { id: "B-004", customer: "Sarah Johnson", flight: "05:00 AM", date: "2024-06-21", status: "confirmed", total: "$516" },
  { id: "B-005", customer: "Karim Mahmoud", flight: "05:30 AM", date: "2024-06-21", status: "cancelled", total: "$129" },
]

const revenueData = [
  { day: "Mon", revenue: 3200, bookings: 12 },
  { day: "Tue", revenue: 4500, bookings: 18 },
  { day: "Wed", revenue: 3800, bookings: 15 },
  { day: "Thu", revenue: 5200, bookings: 22 },
  { day: "Fri", revenue: 6100, bookings: 26 },
  { day: "Sat", revenue: 7800, bookings: 32 },
  { day: "Sun", revenue: 6900, bookings: 28 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-dark-base border-white/10 hover:border-desert-gold/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/60 mb-1">{stat.title}</p>
                    <p className="text-2xl font-playfair font-bold text-white">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-balloon-green" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-balloon-red" />
                      )}
                      <span className={cn("text-sm", stat.trend === "up" ? "text-balloon-green" : "text-balloon-red")}>
                        {stat.change}
                      </span>
                      <span className="text-xs text-white/40">vs last week</span>
                    </div>
                  </div>
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center", stat.color)}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-dark-base border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white font-playfair text-lg">Revenue Overview (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-end gap-3">
                {revenueData.map((data, i) => {
                  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
                  const height = (data.revenue / maxRevenue) * 200
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex justify-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: height }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                          className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-desert-gold to-desert-gold-light"
                        />
                        <div className="absolute -top-6 text-xs text-white/60">${(data.revenue / 1000).toFixed(1)}k</div>
                      </div>
                      <span className="text-xs text-white/40">{data.day}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weather Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-dark-base border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white font-playfair text-lg">Tomorrow's Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Clear Sky</p>
                      <p className="text-sm text-white/60">Perfect for flights</p>
                    </div>
                  </div>
                  <Badge className="bg-balloon-green text-white">GO</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-white">24°C</p>
                    <p className="text-xs text-white/60">Temperature</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-white">8 km/h</p>
                    <p className="text-xs text-white/60">Wind Speed</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5">
                    <p className="text-2xl font-bold text-white">10 km</p>
                    <p className="text-xs text-white/60">Visibility</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Bookings Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-dark-base border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white font-playfair text-lg">Recent Bookings</CardTitle>
            <Button variant="outline" size="sm" className="border-desert-gold text-desert-gold hover:bg-desert-gold hover:text-white">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Booking ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Flight</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 text-sm text-white font-mono">{booking.id}</td>
                      <td className="py-3 px-4 text-sm text-white">{booking.customer}</td>
                      <td className="py-3 px-4 text-sm text-white/80">{booking.flight}</td>
                      <td className="py-3 px-4 text-sm text-white/80">{booking.date}</td>
                      <td className="py-3 px-4">
                        <Badge className={cn(
                          booking.status === "confirmed" && "bg-balloon-green",
                          booking.status === "pending" && "bg-yellow-500",
                          booking.status === "cancelled" && "bg-balloon-red",
                          "text-white text-xs"
                        )}>
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-desert-gold font-medium">{booking.total}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: "Add New Operator", icon: Building2, color: "from-desert-gold to-desert-gold-light" },
          { label: "Create Flight", icon: Plane, color: "from-balloon-green to-balloon-green-light" },
          { label: "View Reports", icon: TrendingUp, color: "from-sky-blue to-sky-blue-light" },
        ].map((action, i) => (
          <Button
            key={i}
            variant="outline"
            className="h-20 border-white/10 bg-dark-base hover:bg-white/5 hover:border-desert-gold/50 text-white"
          >
            <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mr-3", action.color)}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">{action.label}</span>
          </Button>
        ))}
      </motion.div>
    </div>
  )
}
