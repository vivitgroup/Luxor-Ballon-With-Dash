"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, CreditCard, Download, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const payments = [
  { id: "P-001", bookingId: "B-001", customer: "John Smith", amount: 158, gateway: "Paymob", status: "paid", date: "2024-06-18", operator: "Sindbad Balloons" },
  { id: "P-002", bookingId: "B-002", customer: "Emma Wilson", amount: 258, gateway: "Paymob", status: "pending", date: "2024-06-19", operator: "Hod Hod Soliman" },
  { id: "P-003", bookingId: "B-003", customer: "Ahmed Hassan", amount: 79, gateway: "Paymob", status: "paid", date: "2024-06-19", operator: "Magic Horizon" },
  { id: "P-004", bookingId: "B-004", customer: "Sarah Johnson", amount: 516, gateway: "Paymob", status: "paid", date: "2024-06-20", operator: "Sky Cruise" },
  { id: "P-005", bookingId: "B-005", customer: "Karim Mahmoud", amount: 129, gateway: "Paymob", status: "refunded", date: "2024-06-20", operator: "Sindbad Balloons" },
]

const operatorRevenue = [
  { operator: "Sindbad Balloons", revenue: 12500, flights: 45, percentage: 35 },
  { operator: "Hod Hod Soliman", revenue: 9800, flights: 32, percentage: 27 },
  { operator: "Magic Horizon", revenue: 7200, flights: 28, percentage: 20 },
  { operator: "Sky Cruise", revenue: 4800, flights: 18, percentage: 13 },
  { operator: "Nile Dream", revenue: 1800, flights: 8, percentage: 5 },
]

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPayments = payments.filter(p => statusFilter === "all" || p.status === statusFilter)
  const totalRevenue = payments.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-playfair font-bold text-white">Payments & Revenue</h2>
        <Button className="bg-gradient-to-r from-desert-gold to-desert-gold-light">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Total Revenue</p>
                <p className="text-3xl font-playfair font-bold text-desert-gold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-desert-gold to-desert-gold-light flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="w-4 h-4 text-balloon-green" />
              <span className="text-sm text-balloon-green">+15.3%</span>
              <span className="text-xs text-white/40">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Pending Payments</p>
                <p className="text-3xl font-playfair font-bold text-yellow-500">$258</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-dark-base border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Refunds</p>
                <p className="text-3xl font-playfair font-bold text-balloon-red">$129</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-balloon-red to-balloon-red-light flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Operator */}
      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-playfair font-semibold text-white mb-6">Revenue by Operator</h3>
          <div className="space-y-4">
            {operatorRevenue.map((op, index) => (
              <motion.div
                key={op.operator}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{op.operator}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/60">{op.flights} flights</span>
                    <span className="text-sm font-medium text-desert-gold">${op.revenue.toLocaleString()}</span>
                    <span className="text-sm text-white/40">{op.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${op.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-desert-gold to-desert-gold-light rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-dark-base border-white/10">
        <CardContent className="p-0">
          <div className="p-4 border-b border-white/10 flex items-center gap-4">
            <h3 className="text-lg font-playfair font-semibold text-white">Recent Transactions</h3>
            <div className="flex gap-2">
              {["all", "paid", "pending", "refunded"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className={statusFilter === status ? "bg-desert-gold text-white" : "border-white/20 text-white/60 hover:bg-white/5"}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Booking</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Customer</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Gateway</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-white/60">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-white font-mono">{payment.id}</td>
                    <td className="py-4 px-6 text-sm text-white/80">{payment.bookingId}</td>
                    <td className="py-4 px-6 text-sm text-white">{payment.customer}</td>
                    <td className="py-4 px-6 text-sm text-desert-gold font-medium">${payment.amount}</td>
                    <td className="py-4 px-6 text-sm text-white/80">{payment.gateway}</td>
                    <td className="py-4 px-6">
                      <Badge className={cn(
                        payment.status === "paid" && "bg-balloon-green",
                        payment.status === "pending" && "bg-yellow-500",
                        payment.status === "refunded" && "bg-balloon-red",
                        "text-white"
                      )}>
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-sm text-white/60">{payment.date}</td>
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
